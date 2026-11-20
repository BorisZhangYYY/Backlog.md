---
id: BACK-810
title: 窄屏下侧边栏默认收起
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-20T03:23:00Z'
updated_date: '2026-11-20T03:25:00Z'
labels: []
dependencies: []
references:
  - src/web/components/SideNavigation.tsx
modified_files:
  - src/web/components/SideNavigation.tsx
  - src/test/web-task-detail-deeplink.test.tsx
type: bug
ordinal: 412000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
在 375px 宽的视口下，展开的侧边栏固定占 320px，页面内容区只剩 55px：看板筛选字段被排到视口外（实测 left=320px、宽 140px），下拉弹层只能被挤回视口内，无法与字段左边缘对齐。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 视口宽度小于 768px 时侧边栏默认收起（64px），页面内容区拿到可用宽度，看板筛选控件全部落在视口内。
- [x] #2 视口变窄时自动收起，变宽时恢复用户存下的展开偏好；窄视口下的自动收起不写入 localStorage。
- [x] #3 窄视口下仍可手动展开和收起侧边栏。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
根因不是筛选条换行：375px 下展开的侧边栏固定占 319px，内容区只剩 55px，看板标题栏与筛选控件被排到视口外（实测筛选字段 left=320px、宽 140px）。SideNavigation 按 max-width: 767px 断点处理：初始状态在窄视口直接收起，媒体查询变窄时自动收起，变宽时读回本地存下的偏好；窄视口下不写入 sideNavCollapsed，用户仍可在窄视口手动展开。

Chrome 实测同一 fixture：修复前 nav 319px、内容区 55px，筛选字段超出视口；修复后 nav 63px、内容区 311px，页面无横向溢出（body.scrollWidth = 375），优先级筛选弹层 left=80px、宽 140px，与字段完全对齐。视口 1200 → 700 → 1200 往返后侧边栏恢复展开，localStorage 偏好保持 false。

新增渲染测试覆盖窄视口默认收起、手动展开和偏好不被改写；类型检查、Biome、构建通过，Web/DOM 专项 384 项通过、0 失败。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
窄视口（<768px）下侧边栏默认收起为 64px 图标栏，内容区拿到可用宽度，看板筛选控件全部落在视口内且下拉弹层与字段左边缘对齐；变宽后恢复用户存下的展开偏好，窄视口下的自动收起不写入本地偏好，仍可手动展开。
<!-- SECTION:FINAL_SUMMARY:END -->
