export const ADMIN_SESSION_COOKIE = 'almorshid_admin_session';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'morshid-admin@almali.com';
export const ADMIN_SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const encoder = new TextEncoder();

function getAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_AUTH_SECRET must be set and at least 32 characters long.');
  }

  return secret;
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }

  return diff === 0;
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function signPayload(payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(getAuthSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));

  return bytesToHex(signature);
}

export async function createAdminSessionToken() {
  const expiresAt = Date.now() + ADMIN_SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${ADMIN_EMAIL}.${expiresAt}`;
  const signature = await signPayload(payload);

  return `${expiresAt}.${signature}`;
}

export async function verifyAdminSessionToken(token?: string) {
  if (!token) {
    return false;
  }

  const [expiresAt, signature] = token.split('.');
  const expiresAtMs = Number(expiresAt);

  if (!expiresAt || !signature || !Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) {
    return false;
  }

  const expectedSignature = await signPayload(`${ADMIN_EMAIL}.${expiresAt}`);

  return timingSafeEqual(signature, expectedSignature);
}

export function isValidAdminCredentials(email: string, password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error('ADMIN_PASSWORD must be set.');
  }

  return (
    timingSafeEqual(email.trim().toLowerCase(), ADMIN_EMAIL.toLowerCase()) &&
    timingSafeEqual(password, adminPassword)
  );
}
