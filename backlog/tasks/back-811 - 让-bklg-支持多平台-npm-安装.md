---
id: BACK-811
title: 让 bklg 支持多平台 npm 安装
status: Done
assignee:
  - '@hermes'
created_date: '2026-11-20T11:16:00Z'
updated_date: '2026-11-21T02:59:00Z'
labels: []
dependencies: []
references:
  - .github/workflows/release.yml
  - scripts/cli.cjs
  - scripts/resolveBinary.cjs
  - scripts/prepare-bun-runtime.cjs
modified_files:
  - src/test/resolveBinary.test.ts
  - scripts/resolveBinary.cjs
  - scripts/cli.cjs
  - scripts/bklg.cjs
  - .github/workflows/release.yml
  - README.md
  - README.zh-CN.md
  - DEVELOPMENT.md
type: feature
ordinal: 413000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
目前 @boriszhangyyy/bklg 仅打包 Apple Silicon 的二进制。使用者应能在 fork 已构建的 macOS、Linux 和 Windows 上使用统一 npm 安装命令和 bklg 入口，不替换官方 backlog，不迁移项目数据。
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 同一个 @boriszhangyyy/bklg 安装入口覆盖 macOS、Linux、Windows 各自的 x64 和 ARM64，不引入官方 npm 平台包。
- [x] #2 主包只选择与安装平台匹配且版本完全一致的 fork 二进制；bklg --version 和 bklg browser 使用 fork，不依赖 postinstall 下载。
- [x] #3 安装说明列出平台范围和 npm 更新命令；安装验收区分真实平台运行与打包检查。
<!-- AC:END -->

## Definition of Done
<!-- DOD:BEGIN -->
- [x] #1 bun run check:types passes when TypeScript touched
- [x] #2 bun run check . passes when formatting/linting touched
- [x] #3 bun test (or scoped test) passes
<!-- DOD:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. 复用 Release 构建矩阵和启动器的进程行为，生成独立 bklg 主包及六个同 scope 的平台包；保持上游包名和源码开发入口不变。
2. 以 exact-version optionalDependencies 绑定平台包，并验证 npm 选择规则、命令入口和同版本匹配。
3. 衔接现有发布构建，先打包及验证平台产物，再发布主包；以实际 registry 安装及 bklg --version 作为发布验证。
4. 更新 fork 安装说明；保持当前提交与公开发布边界，未获确认不提交、不推送、不发布。
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
实现沿用上游 npm 架构：scripts/cli.cjs 的 main() 接受 packageName/commandName，scripts/resolveBinary.cjs 的包名前缀可传入，scripts/bklg.cjs 仅三行入口。release.yml 的 npm-publish 生成主包（bin 只有 bklg、可选依赖改成 @boriszhangyyy/bklg-* 且锁 exact 版本），publish-binaries 矩阵改发六个同 scope 平台包，install-sanity/verify 都改成校验 bklg --version 与 tag 相等。

验证：types/Biome 通过；resolveBinary、cli-launcher、packaging-bin 42 项测试与 3 项 CI 信任测试通过。用隔离 npm 注册表实测六个平台配置各自只装匹配的平台包，macOS arm64 原生与 x64（Rosetta）真实跑通 version/中文帮助/建任务/Web /api/version；Linux arm64 用同源构建在 Docker 原生跑通。linux-x64 与 Windows 仅做打包检查，无法在本机执行。

最终本地验收：沿用官方六平台矩阵，主包只暴露 bklg，锁定同版 fork 平台包；未携带 npm 生命周期脚本。6 个原版 fork Release 二进制已按 GitHub SHA-256 核对；Linux ARM64 的首次断点下载摘要不符，完整重下已解决。已按 README 的无后缀 npm 全局安装命令用隔离 registry 验证六种 os/cpu 选包。macOS arm64/x64（后者 Rosetta）与 Linux arm64/x64（Docker）执行了 bklg 版本、中文帮助、建任务和 Web /api/version；Windows 仅验证打包和选包，未运行 exe。npm 12.2.1 的主包及平台包发布 dry-run 通过，显式 --tag latest 使 -zh.N 版本支持无后缀安装；未验证公开发布或 OIDC。

全仓并行阶段 27 项失败；历史未修改基线抽样有 15 个同名失败，本轮 3 项浏览器退出测试专项复跑通过；不把全量结果判为通过。当前相关专项 42 项、CI 信任检查 3 项、类型及 Biome 均通过，独立复核无阻塞项。上游生成的 Agent 指令仍默认 backlog，不改变 CLI/MCP 自动配置；README 提供 fork 手动 MCP 配置。
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
本地实现及专项验收完成：@boriszhangyyy/bklg 沿用上游六平台 npm 分包流程；新增简体中文 README。未提交、未推送、未公开发版，不改 youchu 文件或全局安装。
<!-- SECTION:FINAL_SUMMARY:END -->
