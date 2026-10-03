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

// Runs before first paint so the stored (or system) theme applies without a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fcfbf8' },
    { media: '(prefers-color-scheme: dark)', color: '#131210' },
  ],
};

export function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={htmlLang[lang]} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
