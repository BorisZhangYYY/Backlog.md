---
id: BACK-809
title: 统一 Web UI 下拉框主题
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-19T10:13:00Z'
updated_date: '2026-11-20T03:04:00Z'
labels: []
dependencies: []
references:
  - src/web/components/Board.tsx
  - src/web/components/TaskDetailsModal.tsx
  - src/web/components/Modal.tsx
  - src/web/components/TaskList.tsx
  - src/web/components/Settings.tsx
  - src/web/components/MilestonesPage.tsx
  - src/web/components/LanguageSwitcher.tsx
modified_files:
  - src/test/web-locale-context.test.tsx
  - package.json
  - bun.lock
  - bun.nix
  - src/web/components/ThemedSelect.tsx
  - src/web/contexts/ModalPopupContext.ts
  - src/web/components/LanguageSwitcher.tsx
  - src/test/react-dom-preload.ts
  - src/web/components/Modal.tsx
  - src/web/components/Board.tsx
  - src/web/components/TaskList.tsx
  - src/web/components/Settings.tsx
  - src/web/components/MilestonesPage.tsx
  - src/web/components/TaskDetailsModal.tsx
  - src/test/web-select-helpers.ts
  - src/test/web-task-types.test.tsx
  - src/test/web-board-filters.test.tsx
  - src/test/web-task-project.test.tsx
  - src/test/web-task-readiness-badge.test.tsx
  - src/test/web-app-open-detail-refresh.test.tsx
  - src/test/web-task-details-modal-final-summary.test.tsx
  - src/test/web-board-batch-move.test.tsx
  - src/test/web-draft-editing.test.tsx
  - src/test/web-milestones-page-search.test.tsx
  - src/test/web-task-details-modal-keyboard-shortcuts.test.tsx
  - src/test/web-task-detail-deeplink.test.tsx
  - src/test/web-task-list-labels-menu.test.tsx
type: enhancement
ordinal: 411000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
浏览器和操作系统原生弹出的单选列表与 Web UI 的浅色、深色主题不一致，尤其在 macOS 上明显。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 看板、任务列表、任务详情、设置、里程碑重分配和语言切换的单选下拉使用统一的项目样式，展开列表跟随浅色和深色主题。
- [x] #2 保留原有选项、值、禁用、筛选、保存和确认逻辑；现有多选菜单不改动。
- [x] #3 用真实浏览器验证键盘选中、Escape 关闭、弹窗内显示和窄屏可用性。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 先用语言切换写一个真实的下拉展开回归测试。
2. 共用一个主题化的单选组件，以 Base UI 提供键盘、焦点、定位和触屏交互；保持选项文案与业务值分离，不改变表单或写入逻辑。
3. 逐个替换原生单选框并沿用各处既有行为测试，验证浅色/深色、窄屏和弹窗内 Escape。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Chrome 使用独立的无 Git 样例项目验证：浅色/深色、方向键与 Enter、Escape 优先关闭列表、Tab 不离开弹窗、375 × 700 窄屏长选项换行、设置与语言刷新后保留、看板批量选择及里程碑确认各自独立。bun.nix 与固定版本生成器输出完全一致。

清除 BACKLOG_CWD 后独立复跑 Web/DOM：383 通过、0 失败。额外全仓并行阶段有 TUI、CLI 和 Git 失败，未通过；未修改的 387fbaa8 基线抽样（5 个测试文件）为 107 通过、33 失败，确认存在基线重叠，不将其余失败归类为已证实的基线问题。

窄屏对齐修复：弹层宽度由 min(anchor,available)/max(24rem) 改为锁定为触发字段宽度（w-[min(var(--anchor-width),var(--available-width))]）。修复前弹层宽 365px、左边缘 5px，字段宽 267px、左边缘 54px，弹层整体左移并压住相邻字段；修复后两者左边缘与宽度一致（54px / 267px），长选项在弹层内换行。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Web UI 的 16 处原生单选下拉统一为 ThemedSelect，保留业务值、筛选、保存、禁用和确认行为；多选菜单及 CLI 不变。类型检查、Biome、构建及 383 项 Web/DOM 回归测试通过。额外全仓测试未全绿，其中部分 TUI/Git 失败已在未修改的 HEAD 复现；本工项按约定的限定测试验收，未提交或推送。
<!-- SECTION:FINAL_SUMMARY:END -->
