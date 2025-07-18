# 🚀 科幻风格个人作品集网站

一个现代化的科幻风格个人作品集网站，使用 Next.js + TypeScript + Tailwind CSS 构建。

## ✨ 功能特色

- 🎨 **科幻UI设计** - 深空背景配霓虹色彩主题
- 📱 **响应式设计** - 完美适配桌面和移动设备
- ⚡ **高性能** - Next.js优化的快速加载
- 🔄 **平滑动画** - 页面切换和交互动画
- 🎯 **多页面架构** - 首页、关于、经历、项目、联系

## 🛠 技术栈

- **前端框架**: Next.js 14
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS
- **图标库**: Lucide React
- **部署平台**: Vercel

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/ANTI-Tony/my-cyberpunk-portfolio.git
cd cyberpunk-portfolio
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 4. 构建生产版本
```bash
npm run build
npm start
```

## 📝 自定义配置

### 个人信息配置

在 `src/app/page.tsx` 中找到 `personalInfo` 对象，替换为你的真实信息：

```typescript
const personalInfo = {
  name: "你的姓名",                    // 替换为你的真实姓名
  title: "你的职位",                   // 如：前端工程师、全栈开发者
  subtitle: "你的标语",                // 个人标语
  email: "your@email.com",             // 你的邮箱
  github: "https://github.com/你的用户名",
  linkedin: "https://linkedin.com/in/你的用户名",
  location: "你的所在地",              // 如：中国，深圳
  description: "你的个人介绍"
};
```

### 更新工作经历

在 `ExperiencePage` 组件中修改 `experiences` 数组：

```typescript
const experiences = [
  {
    type: 'work', // 'work' 或 'education'
    title: '你的职位',
    company: '公司名称',
    period: '时间段',
    description: '工作描述',
    skills: ['技能1', '技能2'],
    achievements: ['成就1', '成就2']
  }
];
```

### 更新项目展示

在 `ProjectsPage` 组件中修改 `projects` 数组：

```typescript
const projects = [
  {
    title: '项目名称',
    description: '项目描述',
    image: '项目图片URL',
    tech: ['技术栈'],
    github: 'GitHub链接',
    demo: '演示链接',
    status: 'completed', // 'completed', 'in-progress', 'concept'
    year: '年份'
  }
];
```

### 替换头像

1. 将你的头像图片放到 `public/images/` 文件夹
2. 在代码中更新图片路径：

```typescript
// 找到这行并替换
src="/images/tony.jpg"
```

## 🌐 部署到Vercel

### 方法一：自动部署（推荐）

1. 将代码推送到GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的GitHub仓库
4. 点击部署，自动完成！

### 方法二：命令行部署

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录并部署
vercel --prod
```

## 📂 项目结构

```
my-cyberpunk-portfolio/
├── src/
│   └── app/
│       ├── globals.css          # 全局样式
│       ├── layout.tsx           # 布局组件
│       ├── page.tsx             # 主页面组件
│       └── favicon.ico
├── public/
│   └── images/                  # 图片资源
├── package.json                 # 依赖配置
├── next.config.js              # Next.js配置
├── tailwind.config.js          # Tailwind配置
├── postcss.config.js           # PostCSS配置
├── tsconfig.json               # TypeScript配置
└── README.md                   # 说明文档
```

## 🎨 设计特色

- **色彩主题**: 青色(#00bcd4) + 紫色(#9c27b0) + 深空黑
- **字体**: Fira Code (代码字体) + Inter (正文字体)
- **动画**: 脉冲、发光、渐变动画效果
- **布局**: 玻璃拟态卡片设计

## 📱 页面介绍

1. **首页** - 个人介绍和技能展示
2. **关于** - 详细个人信息和技能矩阵
3. **经历** - 工作和教育经历时间线
4. **项目** - 作品集展示
5. **联系** - 联系方式和合作信息

## 🔧 常见问题

### Q: 如何更改主题颜色？
A: 在 `tailwind.config.js` 中修改颜色变量，或在CSS中更新颜色值。

### Q: 如何添加新页面？
A: 在 `navigateTo` 函数和 `renderPage` 函数中添加新的页面逻辑。

### Q: 图片加载慢怎么办？
A: 使用图片压缩工具优化图片，或使用Next.js的Image组件。

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📞 联系作者

如果你在使用过程中遇到问题，欢迎联系：
- 邮箱: your@email.com
- GitHub: https://github.com/yourusername