---
id: BACK-841
title: 按资源类型区分 Browser 文档图标
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-27T02:12:00Z'
updated_date: '2026-11-27T02:14:00Z'
labels: []
dependencies:
  - BACK-840
references:
  - src/web/components/SideNavigation.tsx
modified_files:
  - bun.lock
  - package.json
  - src/web/components/SideNavigation.tsx
  - src/test/web-docs-file-icons.test.tsx
type: enhancement
ordinal: 415000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Browser 文档树中的 Markdown 和附件使用相同图标，浏览混合目录时不易区分资源类型。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 文档树用七种可区分的 Lucide 图标显示 Markdown、图片、PDF、文字文档、表格、演示文稿和其他文件，支持浅色和深色主题。
- [x] #2 扩展名大小写不影响类型图标；不改变目录排序、Markdown 导航、图片预览或原件打开规则。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
- [x] #4 在本机 Chromium 用隔离样例验证浅色、深色和文档树交互。
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
移入已验证的图标补丁：复用文件识别结果，仅改变文档树行的图标，并保留专项回归测试。
<!-- SECTION:PLAN:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Browser 文档树按资源类型显示七种 Lucide 图标，PDF 扩展名大小写等价；保持原有排序、导航、图片预览和原件打开行为。21 项专项与回归、类型检查、Biome 和同源码构建通过；Chrome 实测浅色/深色及目录和图片交互。未重跑全量回归。
<!-- SECTION:FINAL_SUMMARY:END -->
