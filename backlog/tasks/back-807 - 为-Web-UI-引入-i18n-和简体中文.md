---
id: BACK-807
title: 为 Web UI 引入 i18n 和简体中文
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-19T05:44:00Z'
updated_date: '2026-11-19T06:44:00Z'
labels:
  - i18n
  - web
dependencies: []
references:
  - src/web/main.tsx
  - src/web/components/Layout.tsx
  - src/web/components/BoardPage.tsx
modified_files:
  - src/i18n/index.ts
  - src/i18n/locale.ts
  - src/i18n/messages/en.ts
  - src/i18n/messages/zh-CN.ts
  - src/test/i18n-translate.test.ts
  - src/test/web-locale-context.test.tsx
  - src/web/App.tsx
  - src/web/components/AcceptanceCriteriaEditor.tsx
  - src/web/components/AcceptanceCriteriaProgress.tsx
  - src/web/components/Board.tsx
  - src/web/components/BoardLoadingSkeleton.tsx
  - src/web/components/CleanupModal.tsx
  - src/web/components/DecisionDetail.tsx
  - src/web/components/DocumentationDetail.tsx
  - src/web/components/DraftsList.tsx
  - src/web/components/DuplicateIdRepairModal.tsx
  - src/web/components/DuplicateIdWarning.tsx
  - src/web/components/ErrorBoundary.tsx
  - src/web/components/LabelFilterDropdown.tsx
  - src/web/components/LanguageSwitcher.tsx
  - src/web/components/MilestonesPage.tsx
  - src/web/components/Modal.tsx
  - src/web/components/Navigation.tsx
  - src/web/components/RecordArchive.tsx
  - src/web/components/Settings.tsx
  - src/web/components/SideNavigation.tsx
  - src/web/components/Statistics.tsx
  - src/web/components/SuccessToast.tsx
  - src/web/components/TaskCard.tsx
  - src/web/components/TaskColumn.tsx
  - src/web/components/TaskDetailsModal.tsx
  - src/web/components/TaskList.tsx
  - src/web/components/ThemeToggle.tsx
  - src/web/contexts/LocaleContext.tsx
type: feature
ordinal: 409000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
为 fork 的中文使用者提供可切换的简体中文 Web 界面，避免为维护中文而持续就地改写上游英文文案。范围是 Backlog 自己控制的浏览器界面及必要的语言基础；终端界面独立跟进，项目数据、API/JSON、MCP 和文档翻译不在本任务范围。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Web UI 可以在英文和简体中文之间切换，刷新后保留选择。
- [x] #2 主要页面与核心任务流程中的产品文案有简体中文翻译，包括导航、看板、任务列表与创建和编辑、设置及相关操作提示。
- [x] #3 两种语言使用相同的任务 ID、状态值及其他业务数据；已有任务、自定义字段值和用户编写的内容不被改写。
- [x] #4 验证实际浏览器的语言切换和任务流程，并确保默认英文行为不回归。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 引入轻量、带类型检查的 en / zh-CN 文案字典，不新增运行时依赖；默认保持英文。
2. 在 Web 现有导航中提供显式语言切换，按浏览器保存偏好并同步页面 lang 属性，不写项目配置。
3. 先完成看板到任务创建、查看、编辑与状态流转，再覆盖其他主要页面；区分展示标签和实际状态值，保留自定义值、已有 Markdown 和 API/JSON。
4. 验证英文回归、中英文切换和持久化；使用隔离项目在真实浏览器完成核心任务流程，检查磁盘和机器可读输出未受语言影响。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
界面文案改为经 src/i18n 的 en / zh-CN 目录读取：英文目录是键的唯一来源，中文目录类型为 Record<MessageKey, string>，漏译即类型错误。Web 层 LocaleContext 默认英文，无 Provider 时组件仍可单独渲染，浏览器偏好存 localStorage（backlog-locale）并同步 document.documentElement.lang；语言选择器放在顶部导航，与主题切换并列。状态、优先级、类型、标签、项目、里程碑继续显示项目配置里的原值，未翻译，磁盘与 JSON 不受影响。
<!-- SECTION:NOTES:END -->
