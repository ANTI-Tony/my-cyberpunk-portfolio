import type { Metadata, Viewport } from 'next';
import { Inter, Newsreader } from 'next/font/google';
import type { ReactNode } from 'react';
import { site, ui, type Lang } from '@/content/profile';
import './globals.css';

// Shared by the two root layouts, (en) and (zh), so each language gets its own
// statically rendered document with the correct <html lang>.

const serif = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
});

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const htmlLang: Record<Lang, string> = { en: 'en', zh: 'zh-CN' };
const paths: Record<Lang, string> = { en: '/', zh: '/zh' };

export function siteMetadata(lang: Lang): Metadata {
  const { title, description } = ui[lang];
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: paths[lang],
      languages: { en: paths.en, 'zh-CN': paths.zh },
    },
    openGraph: {
      type: 'profile',
      url: paths[lang],
      siteName: site.name,
      title,
      description,
      locale: lang === 'en' ? 'en_US' : 'zh_CN',
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export const siteViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#03050b',
  colorScheme: 'dark',
};

export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
