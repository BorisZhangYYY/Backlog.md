---
id: BACK-808
title: 为 CLI 人机界面适配简体中文
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-19T05:45:00Z'
updated_date: '2026-11-19T06:45:00Z'
labels:
  - i18n
  - cli
dependencies:
  - BACK-807
references:
  - src/cli.ts
  - src/ui/unified-view.ts
modified_files:
  - src/cli.ts
  - src/commands/help-schema.ts
  - src/i18n/cli-zh-CN.ts
  - src/i18n/cli.ts
  - src/test/cli-language.test.ts
  - src/test/i18n-cli.test.ts
  - src/ui/board.ts
  - src/ui/components/help-popup.ts
  - src/ui/footer-content.ts
  - src/ui/task-viewer-with-search.ts
  - src/ui/unified-view.ts
type: feature
ordinal: 410000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
让 fork 的中文使用者能够阅读终端交互界面及常用命令的使用帮助。不翻译命令名、参数、机器可读输出、MCP 或项目数据。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 启用简体中文后，终端看板、任务列表和任务详情的导航与操作提示显示为中文。
- [x] #2 常用命令帮助可读为简体中文，命令名、选项及示例中的可执行参数保持不变。
- [x] #3 默认英文行为与脚本使用的 JSON、退出码和任务数据保持兼容。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
语言由环境变量 BACKLOG_LANG 选择（en / zh-CN），默认英文，未知值回退英文；选择器不用命令行参数，因为命令帮助本身也需要可读的语言。英文原文作为翻译键：上游新增的说明在翻译前仍显示英文，不会丢文本或露出键名。commander 的帮助在 LocalizedHelp 子类里翻译标题、命令/选项说明，formatHelp 只替换行首的节标题，因此命令名、参数和示例保持原样可复制。终端看板的底栏提示、快捷键帮助弹窗、加载与空状态提示也走同一目录。任务数据、状态值、JSON 输出与退出码不变。
<!-- SECTION:NOTES:END -->
