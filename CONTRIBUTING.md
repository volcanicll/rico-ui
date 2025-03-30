# 贡献指南

感谢您考虑为 Rico UI 做出贡献！以下是一些指导原则，以帮助您开始。

## 开发流程

1. Fork 仓库并克隆到本地
2. 创建新分支: `git checkout -b feature/your-feature-name`
3. 安装依赖: `pnpm install`
4. 进行开发
5. 确保代码通过检查: `pnpm lint`
6. 确保所有包能够构建: `pnpm build`
7. 提交您的变更: `git commit -m 'feat: add some feature'`
8. 推送到您的fork: `git push origin feature/your-feature-name`
9. 提交Pull Request

## 提交规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范来格式化提交信息。提交信息应遵循以下格式:

```
<类型>[可选作用域]: <描述>

[可选正文]

[可选脚注]
```

类型可以是:

- `feat`: 新功能
- `fix`: 修复Bug
- `docs`: 文档修改
- `style`: 代码风格修改（不影响代码运行的变动）
- `refactor`: 代码重构（既不是新增功能，也不是修复bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
- `ci`: CI配置文件和脚本的改变
- `revert`: 回退之前的提交

## 代码风格

- 所有代码必须通过ESLint和TypeScript检查
- 组件文档应包含详细的Props说明和使用示例
- 确保组件支持主题定制和响应式布局

## 发布流程

我们使用 [Changesets](https://github.com/changesets/changesets) 来管理版本和发布流程。

添加变更集:

```bash
pnpm changeset
```

这将指导您创建一个描述您的更改的changeset文件。当PR被合并到主分支后，CI会自动创建一个新的发布PR，包含版本更新并推送到npm。

## 测试

- 所有新组件应有对应的单元测试
- 所有新组件应有对应的Storybook故事
- 测试应覆盖组件的主要功能和边缘情况

再次感谢您的贡献！ 