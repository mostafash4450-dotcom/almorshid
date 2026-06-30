import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://almorshid-almali.com'),
  title: {
    default: 'المرشد المالي - مرجعك الموثوق في تقييم شركات التداول والفوركس',
    template: '%s | المرشد المالي',
  },
  description: 'المرشد المالي: المرجع العربي الموثوق لتقييم شركات التداول، التحذير من شركات الفوركس النصابة، ومراجعة مكاتب المحاماة المتخصصة في استرداد الأموال.',
  keywords: ['فوركس', 'تداول', 'استرداد الأموال', 'شركات نصب', 'مكاتب محاماة', 'المرشد المالي'],
  authors: [{ name: 'المرشد المالي' }],
  creator: 'المرشد المالي',
  publisher: 'المرشد المالي',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://almorshid-almali.com',
    siteName: 'المرشد المالي',
    title: 'المرشد المالي - مرجعك الموثوق في تقييم شركات التداول',
    description: 'المرجع العربي الموثوق لتقييم شركات التداول والتحذير من شركات الفوركس النصابة',
    images: [{ url: '/image-removebg-preview.png', width: 1200, height: 630, alt: 'المرشد المالي' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المرشد المالي - مرجعك الموثوق في تقييم شركات التداول',
    description: 'المرجع العربي الموثوق لتقييم شركات التداول والتحذير من شركات الفوركس النصابة',
    images: ['/image-removebg-preview.png'],
  },
  icons: {
    icon: [
      { url: '/image-removebg-preview.png', type: 'image/png', sizes: '512x512' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/image-removebg-preview.png', type: 'image/png', sizes: '512x512' }],
    shortcut: '/image-removebg-preview.png',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
