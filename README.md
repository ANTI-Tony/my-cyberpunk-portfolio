# Jingbo Wen (Tony) — 个人主页

学术风格的个人主页，基于 Next.js（App Router）与 TypeScript，部署在 Vercel。

- English：<https://jtw-sable.vercel.app>
- 中文：<https://jtw-sable.vercel.app/zh>

## 修改内容

所有文字（简介、论文、经历、项目、技能、教育、写作）都在 [`src/content/profile.ts`](src/content/profile.ts) 里，中英文并排。改完推送到 `main`，Vercel 会自动部署。

- 需要加粗的地方用 `**双星号**` 包起来。
- 论文作者顺序与 arXiv 上保持一致。

## 本地开发

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 生产构建
```

## 目录结构

```
src/
├── app/
│   ├── (en)/            # 英文版，对应 /
│   ├── (zh)/zh/         # 中文版，对应 /zh
│   ├── shell.tsx        # 两个语言共用的 <html> 外壳、字体与 metadata
│   └── globals.css      # 全部样式与深浅色主题变量
├── components/          # 页面与交互组件
└── content/profile.ts   # 站点内容
```
