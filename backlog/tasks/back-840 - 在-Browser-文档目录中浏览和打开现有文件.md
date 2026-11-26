---
id: BACK-840
title: 在 Browser 文档目录中浏览和打开现有文件
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-26T01:53:00Z'
updated_date: '2026-11-26T06:32:00Z'
labels: []
dependencies: []
references:
  - https://github.com/MrLesk/Backlog.md/issues/1261
  - src/web/components/SideNavigation.tsx
  - src/web/lib/docs-tree.ts
  - src/web/components/DocumentationDetail.tsx
  - src/web/components/MermaidMarkdown.tsx
  - src/server/index.ts
modified_files:
  - README.md
  - README.zh-CN.md
  - src/i18n/messages/en.ts
  - src/i18n/messages/zh-CN.ts
  - src/server/documentation-files.ts
  - src/server/index.ts
  - src/test/server-document-files.test.ts
  - src/test/web-side-navigation-loading.test.tsx
  - src/types/index.ts
  - src/web/components/DocumentationDetail.tsx
  - src/web/components/DocumentationFiles.tsx
  - src/web/components/Layout.tsx
  - src/web/components/MermaidMarkdown.tsx
  - src/web/components/SideNavigation.tsx
  - src/web/lib/api.ts
  - src/web/lib/docs-tree.test.ts
  - src/web/lib/docs-tree.ts
  - src/test/web-app-open-detail-refresh.test.tsx
type: feature
ordinal: 414000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
部署说明、截图和交接材料常放在同一文档目录。现在 Browser 的 Documentation 只显示 Markdown 文档，找同目录的其他材料还要切到文件管理器。对应 Hermes default 看板 t_4cf6b3e0；在本会话本地交付，不提交、不推送、不发 PR 或改上游 Issue。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Documentation 在原目录结构下同时列出 Markdown 文档和图片、PDF、Word 等已有文件，无需 Markdown 引用。
- [x] #2 目录中的图片可以打开大图；Markdown 的同目录图片可内嵌显示并点击放大。
- [x] #3 本机模式用系统默认应用打开文档目录内的非图片原件，不下载副本；远程模式不能触发启动服务器上的应用。
- [x] #4 保留 Markdown 的格式和管理流程；不增加上传、文件管理或 PDF/Office 在线预览。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
- [x] #4 用隔离项目中的 Markdown、图片、PDF、Word 文件从真实 Browser 验证。
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 保留现有 Markdown 文档 ID、API、编辑和归档流程；在 Browser 的 Documentation 树合并从当前文档目录读取的普通文件条目，支持只含附件的子目录。

2. 文件列表与访问都限定在当前文档目录，跳过隐藏项和符号链接。目录图片和 Markdown 同目录图片共用可用键盘关闭的大图视图；不改动其它页面的 Markdown 渲染行为。

3. 方案待 Boris 确认：首版附件浏览与原件打开仅面向本机模式，远程监听保留原有 Markdown 流程。支持的普通文档类型才可交给系统默认应用；不执行脚本/程序/快捷方式，不下载副本，不提供 PDF/Office 在线预览。原件打开操作需明确点击，由服务端按现有主机/来源边界验证；不把 SSH 转发当成本机安全保证。

4. 先写专项回归测试；用隔离样例验证文件树、目录图片放大、Markdown 内嵌图放大、本机打开原件与远程禁用，再运行类型、Biome 和相关回归。按仓库规则完成评审，仅保留本地改动。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Boris 已在项目会话确认：首版只做本机模式，远程监听不列出新增文件、不提供图片或原件打开接口；不自动派单、不提交或发布。

已完成真实 Chromium 环境验收：Markdown、未引用图片、内嵌图放大及链接保留；PDF/DOCX 原件请求由 macOS 成功受理。远程监听测试确认 Markdown 可读、附件列表为空、图片 404、原件请求 403。末轮加固：macOS 通过 Foundation 只读判定 Finder 替身，替身或判定失败都不调用系统打开；该失败路由用模拟分类做回归，真实只读探测在普通 PDF 返回 false。126 项定向及回归测试、类型、Biome、构建和 diff --check 通过；等待 Finder 替身修复的定向独立复核。

独立定向复核确认 Finder 替身阻塞项已解决，未发现本次修复引入的回归。

发版 CI 复现两个打开草稿的 DOM 测试失败：原夹具对新增文档文件请求返回 {}。已为夹具补齐空数组响应，不改产品运行逻辑。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
本机 Browser 文档树支持浏览现有文件、放大图片和调用默认应用打开受支持的原件；远程监听维持既有 Markdown 行为。macOS Finder 替身及判定失败时均拒绝打开。126 项专项与回归、类型检查、Biome、构建和 Chromium/macOS 本地验收通过，独立复核无剩余阻塞；未提交、推送或发布。
<!-- SECTION:FINAL_SUMMARY:END -->
