# Rico UI

Rico UI 是一个高质量的 React 组件库，专为现代 Web 应用程序设计，支持响应式布局和移动端适配。

## 特性

- 🚀 **高性能**：基于现代前端技术栈构建
- 📱 **响应式**：完全适配移动端和桌面端
- 🎨 **可定制**：灵活的主题配置系统
- 🔍 **无障碍**：遵循 WCAG 2.1 标准
- 📦 **按需加载**：支持按需导入组件
- 🌐 **国际化**：内置国际化解决方案

## 快速开始

### 安装

```bash
# npm
npm install @rico-ui/react

# yarn
yarn add @rico-ui/react

# pnpm
pnpm add @rico-ui/react
```

### 使用

```jsx
import { Button, Card } from '@rico-ui/react';
import { ThemeProvider } from '@rico-ui/react';

function App() {
  return (
    <ThemeProvider>
      <Card padding="large">
        <h1>Hello Rico UI!</h1>
        <Button variant="primary">开始使用</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## 开发

本项目使用 pnpm Workspaces 和 Turborepo 进行包管理和构建优化。

### 项目结构

```
.
├── .github/               # GitHub Actions配置
├── .husky/                # Git hooks
├── apps/
│   ├── docs/              # 文档站点
│   └── storybook/         # Storybook实例
├── packages/
│   ├── components/        # 组件库核心代码
│   ├── eslint-config/     # 共享ESLint配置
│   ├── prettier-config/   # 共享Prettier配置 
│   └── tsconfig/          # 共享TS配置
├── package.json           # 工作区根配置
├── turbo.json             # Turborepo配置
└── pnpm-workspace.yaml    # 工作区定义
```

### 命令

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建所有包
pnpm build

# 代码检查
pnpm lint

# 清理构建缓存
pnpm clean
```

## 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解更多信息。

## 许可证

MIT 