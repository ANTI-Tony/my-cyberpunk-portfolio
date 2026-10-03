import type { ReactNode } from 'react';
import { Shell, siteMetadata, siteViewport } from '../shell';

export const metadata = siteMetadata('zh');
export const viewport = siteViewport;

export default function RootLayout({ children }: { children: ReactNode }) {
  return <Shell lang="zh">{children}</Shell>;
}
