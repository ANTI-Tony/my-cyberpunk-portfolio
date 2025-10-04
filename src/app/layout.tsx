import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jingbo Tony Wen - Full Stack Developer',
  description: '科幻风格的个人作品集网站 - 展示我的项目、技能和经历',
  keywords: '全栈开发, React, Next.js, TypeScript, 作品集, 科幻风格',
  authors: [{ name: 'Jingbo Tony Wen' }],
  openGraph: {
    title: 'Jingbo Tony Wen - Full Stack Developer',
    description: '科幻风格的个人作品集网站',
    type: 'website',
    locale: 'zh_CN',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}