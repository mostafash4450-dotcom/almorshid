import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'المرشد المالي',
    short_name: 'المرشد',
    description: 'مرجع عربي لتقييم شركات التداول والتحذير من شركات الفوركس النصابة.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1B2A4A',
    dir: 'rtl',
    lang: 'ar',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/image-removebg-preview.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/image-removebg-preview.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
