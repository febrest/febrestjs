# Findings & Decisions
<!--
  WHAT: Your knowledge base for the task. Stores everything you discover and decide.
  WHY: Context windows are limited. This file is your "external memory" - persistent and unlimited.
  WHEN: Update after ANY discovery, especially after 2 view/browser/search operations (2-Action Rule).
-->

## Requirements
<!--
  WHAT: What the user asked for, broken down into specific requirements.
  WHY: Keeps requirements visible so you don't forget what you're building.
  WHEN: Fill this in during Phase 1 (Requirements & Discovery).
  EXAMPLE:
    - Command-line interface
    - Add tasks
    - List all tasks
    - Delete tasks
    - Python implementation
-->
<!-- Captured from user request -->
- 将包管理工具迁移到 pnpm
- 采用 workspace 的形式组织代码，将 src 下面的代码移动到 packages/core 下面
- examples 作为另外一个 workspace，存放当前的示例代码
- 文件名重构，改成中划线连接 (kebab-case)
- 格式化工具改成 biome
- 完善 README

## Research Findings
<!--
  WHAT: Key discoveries from web searches, documentation reading, or exploration.
  WHY: Multimodal content (images, browser results) doesn't persist. Write it down immediately.
  WHEN: After EVERY 2 view/browser/search operations, update this section (2-Action Rule).
  EXAMPLE:
    - Python's argparse module supports subcommands for clean CLI design
    - JSON module handles file persistence easily
    - Standard pattern: python script.py <command> [args]
-->
<!-- Key discoveries during exploration -->
- Febrestjs 是一个前端状态管理/应用框架库，版本 0.21.1
- 当前使用 npm 作为包管理工具，TypeScript 开发
- 使用 Jest 进行测试，Rollup 进行打包
- 项目结构清晰，分为多个功能模块：action、observer、broadcast、error、hook、state、utils、invoker、provider 等
- 包含两个示例应用：lottery（抽奖）和 todomvc（待办事项）
- TypeScript 类型定义完整，存放在 types/ 目录
- 使用 Prettier 作为代码格式化工具

## Project Structure Analysis

### Current Structure
```
febrestjs/
├── src/                    # 源代码
│   ├── action/            # 动作系统
│   ├── observer/          # 观察者模式
│   ├── broadcast/         # 广播系统
│   ├── error/             # 错误处理
│   ├── hook/              # 钩子系统
│   ├── state/             # 状态管理
│   ├── utils/             # 工具函数
│   ├── invoker/           # 调用器
│   ├── provider/          # 依赖注入
│   └── main/              # 主入口
├── examples/              # 示例应用
│   ├── lottery/          # 抽奖应用
│   └── todomvc/          # TodoMVC 示例
├── __tests__/            # 测试文件
├── types/                # TypeScript 类型定义
└── scripts/              # 构建脚本
```

### Target Structure (After Refactor)
```
febrestjs/
├── packages/
│   └── core/            # 核心库
│       ├── src/
│       │   ├── action/
│       │   ├── observer/
│       │   ├── broadcast/
│       │   ├── error/
│       │   ├── hook/
│       │   ├── state/
│       │   ├── utils/
│       │   ├── invoker/
│       │   ├── provider/
│       │   └── main/
│       ├── __tests__/
│       ├── types/
│       ├── package.json
│       └── tsconfig.json
├── examples/            # 示例应用 (workspace)
│   ├── lottery/
│   └── todomvc/
├── scripts/             # 根级脚本
├── package.json         # 根级 package.json (workspace 配置)
└── biome.json          # Biome 配置
```

## Technical Decisions
<!--
  WHAT: Architecture and implementation choices you've made, with reasoning.
  WHY: You'll forget why you chose a technology or approach. This table preserves that knowledge.
  WHEN: Update whenever you make a significant technical choice.
  EXAMPLE:
    | Use JSON for storage | Simple, human-readable, built-in Python support |
    | argparse with subcommands | Clean CLI: python todo.py add "task" |
-->
<!-- Decisions made with rationale -->
| Decision | Rationale |
|----------|-----------|
| 使用 pnpm 作为包管理工具 | 比 npm 更快、更高效的包管理，支持 workspace |
| 采用 monorepo 结构 | 清晰分离核心库和示例，便于维护和开发 |
| packages/core 存放核心代码 | 符合现代前端库的架构模式 |
| examples 作为独立 workspace | 示例代码与核心库分离，避免相互影响 |
| 文件名使用 kebab-case | 统一的命名规范，提高代码可读性和可维护性 |
| 使用 Biome 作为格式化工具 | 现代、快速的代码格式化工具，替代 Prettier |

## Dependencies Analysis

### Current Dependencies (package.json)
```json
{
  "devDependencies": {
    "@babel/core": "^7.7.4",
    "@babel/plugin-external-helpers": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "@babel/preset-typescript": "^7.7.4",
    "@types/jest": "^24.0.23",
    "babel-jest": "^24.9.0",
    "jest": "^24.9.0",
    "rollup": "^1.27.5",
    "rollup-plugin-alias": "^2.2.0",
    "rollup-plugin-babel": "^4.3.3",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-prettier": "^0.6.0",
    "rollup-plugin-typescript2": "^0.25.2",
    "rollup-plugin-uglify": "^6.0.3",
    "ts-jest": "^24.2.0",
    "typescript": "^3.7.2"
  },
  "dependencies": {}
}
```

## Issues Encountered
<!-- 
  WHAT: Problems you ran into and how you solved them.
  WHY: Similar to errors in task_plan.md, but focused on broader issues (not just code errors).
  WHEN: Document when you encounter blockers or unexpected challenges.
  EXAMPLE:
    | Empty file causes JSONDecodeError | Added explicit empty file check before json.load() |
-->
<!-- Errors and how they were resolved -->
| Issue | Resolution |
|-------|------------|
|       |            |

## Resources
<!-- 
  WHAT: URLs, file paths, API references, documentation links you've found useful.
  WHY: Easy reference for later. Don't lose important links in context.
  WHEN: Add as you discover useful resources.
  EXAMPLE:
    - Python argparse docs: https://docs.python.org/3/library/argparse.html
    - Project structure: src/main.py, src/utils.py
-->
<!-- URLs, file paths, API references -->
-

## Visual/Browser Findings
<!-- 
  WHAT: Information you learned from viewing images, PDFs, or browser results.
  WHY: CRITICAL - Visual/multimodal content doesn't persist in context. Must be captured as text.
  WHEN: IMMEDIATELY after viewing images or browser results. Don't wait!
  EXAMPLE:
    - Screenshot shows login form has email and password fields
    - Browser shows API returns JSON with "status" and "data" keys
-->
<!-- CRITICAL: Update after every 2 view/browser operations -->
<!-- Multimodal content must be captured as text immediately -->
-

---
<!-- 
  REMINDER: The 2-Action Rule
  After every 2 view/browser/search operations, you MUST update this file.
  This prevents visual information from being lost when context resets.
-->
*Update this file after every 2 view/browser/search operations*
*This prevents visual information from being lost*
