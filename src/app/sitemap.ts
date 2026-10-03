import type { MetadataRoute } from 'next';
import { site } from '@/content/profile';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: site.url, 'zh-CN': `${site.url}/zh` };
  return [
    { url: site.url, alternates: { languages } },
    { url: `${site.url}/zh`, alternates: { languages } },
  ];
}
