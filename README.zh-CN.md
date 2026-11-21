<p align="center">
  <img src="./.github/backlog-logo.png" alt="Backlog.md logo" width="120">
</p>

<h1 align="center">Backlog.md</h1>
<p align="center"><strong>基于 Markdown 的任务管理器与看板工具，适用于任意 Git 仓库</strong></p>
<p align="center">AI Agent 负责写代码，你在事前、事中、事后审阅任务。</p>

<p align="center">
  <a href="https://github.com/BorisZhangYYY/Backlog.md/releases"><img src="https://img.shields.io/github/v/release/BorisZhangYYY/Backlog.md?color=brightgreen" alt="release version"></a>
  <a href="https://github.com/BorisZhangYYY/Backlog.md/blob/main/LICENSE"><img src="https://img.shields.io/github/license/BorisZhangYYY/Backlog.md" alt="MIT license"></a>
  <a href="https://github.com/BorisZhangYYY/Backlog.md"><img src="https://img.shields.io/github/stars/BorisZhangYYY/Backlog.md?style=social" alt="GitHub stars"></a>
</p>

<p align="center">
  <a href="README.md">English</a> | <strong>简体中文</strong>
</p>

<p align="center">
<code>npm i -g @boriszhangyyy/bklg</code>
</p>

![Backlog demo GIF using: backlog board](./.github/backlog-v1.40.gif)


---

> **Backlog.md** 把任意文件夹变成一个**自包含的项目看板**，
> 数据就是纯 Markdown 文件，CLI 零配置上手。

## 这是 Fork 说明

本仓库是 [MrLesk/Backlog.md](https://github.com/MrLesk/Backlog.md) 的 Fork，额外提供**简体中文适配**：

- **Web UI**：完整中文界面，可在界面内切换语言，选择会记住。
- **CLI**：面向人的提示与帮助支持简体中文，通过 `BACKLOG_LANG=zh-CN` 启用。

只翻译展示层，不改业务数据：任务 ID、状态、优先级、类型、标签、项目、里程碑、自定义字段值、用户正文、任务 Markdown、JSON 输出与退出码都保持上游行为。

本 Fork 的 npm 包是 `@boriszhangyyy/bklg`，命令是 `bklg`；`backlog.md` 是上游 npm 包，两者可以共存。

## 为什么在 AI 时代需要 Backlog.md

AI Agent 现在一小时能写出比你一天仔细读完还像样的代码。瓶颈不再是写代码，而是**你的注意力**。你没法一口气审完 15000 行生成代码，但在一行代码还没写之前，你可以读完一屏带验收标准的任务说明，并在误解还只是一句话的时候把它顶回去，而不是等它变成一个已经写完的功能。

Backlog.md 把 Agent 的工作组织成**三个审阅关卡**：

1. **审阅需求**：Agent 把你的想法拆成任务，每个任务带描述、验收标准和里程碑，然后才开始实现。
2. **审阅方案**：Agent 研究你的代码库，把实现方案写进任务里。在写任何代码之前，你可以批准它或调整方向。
3. **审阅代码**：一个任务 = 一个上下文窗口 = 一个 PR。Diff 的大小保持在人类真正能读完的范围内。

完成后，任务以纯 Markdown 留在 Git 里，成为「尝试过什么、为什么」的长期记录，你、你的团队和下一个 Agent 都能读。

**自我 dogfood：** Backlog.md 自己的代码几乎全部由 AI Agent 通过 Backlog.md 写就。完整任务台账见本仓库的 [backlog 目录](backlog/tasks)。

📺 **看实际效果：** [Devoxx Belgium 2025](https://www.youtube.com/watch?v=LSoDQU_9MMA) · [AI Engineer Code Summit 2025](https://www.youtube.com/watch?v=zMXKhhwiCIc)

## 功能

* 🤖 **面向 AI** —— 适配 Claude Code、Gemini CLI、Codex、Kiro 以及任何兼容 MCP 或 CLI 的 AI 助手

* 📝 **Markdown 原生任务** —— 每个任务就是仓库里的一个 `.md` 文件

* ✅ **验收标准与完成定义（DoD）** —— 每个任务都有可验证的范围，另有一份可复用的 DoD 清单供新任务套用

* 🎯 **里程碑与依赖** —— 把大块工作组织起来，让执行顺序可审阅；任务详情里能看到它依赖谁、谁依赖它

* 📊 **终端看板** —— `backlog board` 在终端里画出实时看板；`backlog board export` 导出可分享的 Markdown 报告

* 🌐 **Web 界面** —— `backlog browser` 在本地提供支持拖拽和表单编辑的看板

* 🔍 **搜索** —— `backlog search` 在任务、文档与决策之间做模糊搜索

* 🌏 **简体中文** —— Web UI 与 CLI 的面向人界面均可切换简体中文，数据格式不变

* 🔒 **本地优先** —— 无服务端、无账号、无遥测；任务就是仓库里的纯文件，远程 Git 操作是可选的

* 💻 跨平台（macOS、Linux、Windows） · 🆓 MIT 许可 · 开源


---

## <img src="./.github/5-minute-tour-256.png" alt="Getting started" width="28" height="28" align="center"> 快速上手

<a id="安装"></a>

### 安装

```bash
npm install -g @boriszhangyyy/bklg
bklg --version
bklg browser
```

多平台版本支持 macOS、Linux、Windows 的 x64 和 ARM64，npm 会自动安装匹配的二进制。更新时重跑同一条安装命令。下文示例使用上游的 `backlog` 命令；通过 npm 安装本 Fork 后，将命令开头换成 `bklg` 即可。

不使用 npm 时，也可以从 [GitHub Releases](https://github.com/BorisZhangYYY/Backlog.md/releases) 下载可执行文件：

```bash
# macOS (Apple Silicon)
curl -L -o backlog https://github.com/BorisZhangYYY/Backlog.md/releases/latest/download/backlog-bun-darwin-arm64
chmod +x backlog && mv backlog /usr/local/bin/backlog

# Linux (x64)
curl -L -o backlog https://github.com/BorisZhangYYY/Backlog.md/releases/latest/download/backlog-bun-linux-x64
chmod +x backlog && mv backlog /usr/local/bin/backlog
```

各平台文件名：`backlog-bun-darwin-arm64`、`backlog-bun-darwin-x64`、`backlog-bun-linux-x64`、`backlog-bun-linux-arm64`、`backlog-bun-windows-x64.exe`、`backlog-bun-windows-arm64.exe`。

### 初始化

```bash
# 在任意 Git 仓库里初始化
backlog init "我的项目"

# 或者在本地/非代码项目里初始化（不用 Git）
backlog init "个人规划" --no-git
```

### 启用中文

```bash
# CLI：输出简体中文的帮助与提示
export BACKLOG_LANG=zh-CN
backlog --help
```

Web UI：运行 `backlog browser` 后在界面里切换语言，选择保存在浏览器本地存储。

> [!TIP]
> **不想装也想先试试？** 上游官方包支持 `npx backlog.md init "我的项目"`、`npx backlog.md board`。

### 用 Nix 运行

```bash
nix run github:MrLesk/Backlog.md -- --version
```

或把命名包装进你的 Nix profile：

```bash
nix profile install github:MrLesk/Backlog.md#backlog-md
```

Nix flake 支持 `x86_64-linux`、`aarch64-linux` 和 `aarch64-darwin`。x86_64 的 Linux 包使用
[Bun 的统一 x64 runtime](https://bun.com/docs/installation#cpu-requirements)，
要求 SSE4.2 及以上，并自动选择对应 CPU 的执行路径。AVX2 之前的兼容性会在 Ivy Bridge 模拟下检查。Intel macOS 用户改用 npm、Bun 或 Homebrew 安装。

初始化向导会问你希望怎么接入 AI 工具：
- **CLI 说明（推荐）**：生成一份简短的说明文件，告诉 Agent 运行 `backlog instructions overview`。
- **MCP 连接器**：可选地为 Claude Code、Codex、Gemini CLI、Kiro 或 Cursor 配置 MCP。
- **跳过**：不做 AI 集成，只把 Backlog.md 当任务管理器用。

Cursor 选 CLI 说明时，选 AGENTS.md 或传 `--agent-instructions cursor`；两者都用同一个 AGENTS.md 目标。Backlog.md 会保留已有 AGENTS.md 内容，不会迁移或删除你自行管理的 `.cursor/rules` 文件。

所有内容都以人类可读的 Markdown 存在项目本地的 backlog 目录下，例如 `backlog/`、`.backlog/`，或通过 `backlog.config.yml` 配置的自定义项目内路径（例如 `backlog_directory: my-backlog`）。任务 ID 前缀可配置（`backlog init --task-prefix`）：默认是 `TASK-1` 式，本仓库用的是 `back`，所以下面的例子写成 `BACK-1`。Git 是可选的：`backlog init --no-git` 会创建一个纯文件系统项目。

> [!TIP]
> **想要一张自动保持更新的仓库架构图？** 见下面的 [Backlog.md + Groma.md 集成](#groma-md)。

---

## 与 AI Agent 协作

这是给 Claude Code、Codex、Gemini CLI、Kiro 等工具的推荐流程，遵循**规范驱动的 AI 开发**方式。
运行 `backlog init` 之后，Agent 应先运行 `backlog instructions overview`。按这个循环工作：

**第 1 步：描述你的想法。** 告诉 Agent 你想做什么，并要求它拆成小任务，每条都有清楚的描述和验收标准。

**🤖 这样问你的 AI Agent：**
> 我想在 Web 视图里加一个搜索功能，搜任务、文档和决策。请把它拆成若干个小的 Backlog.md 任务。

> [!NOTE]
> **审阅关卡 #1：** 读任务描述和验收标准。

**第 2 步：一次只做一个任务。** 每个 Agent 会话做单个任务，每个任务一个 PR。好的拆分意味着各会话可以独立推进、互不冲突。确保任务小到能在一次对话里完成——你要避免的是撑爆上下文窗口。

**第 3 步：先写方案再写代码。** 让 Agent 研究代码库，并把实现方案写进任务里。要在实现之前紧挨着做，这样方案反映的是当前代码状态。

**🤖 这样问你的 AI Agent：**
> 只做 BACK-10。研究代码库，把实现方案写进任务里。等我批准后再写代码。

> [!NOTE]
> **审阅关卡 #2：** 读方案。思路对不对？批准它，或者让 Agent 改。

**第 4 步：实现并验证。** 让 Agent 实现任务。

> [!NOTE]
> **审阅关卡 #3：** 审阅代码、跑测试、检查 lint，核对结果是否符合预期。

验证通过的任务标为 Done（或配置的终态）。定期清理时，`backlog task archive` 会把它移出看板；同一个命令在任何时候也能把取消、重复或无效的工作移出看板。归档任务保留它的 ID、记录和依赖链接，仍可用 `backlog task view` 查看，且变为只读。`backlog task restore` 能把归档任务原样带回看板，ID 不变。要彻底移除一个任务，先归档再运行 `backlog task delete`；只要其他分支或工作树还持有该任务，ID 就不会释放。

如果产出不够好：清掉方案/备注/最终总结，把任务描述和验收标准改细，然后在新会话里重跑。

---

## 不用 AI Agent 也能用

把 Backlog.md 当独立的任务管理器，在终端或浏览器里用。

```bash
# 创建并完善任务
backlog task create "把 Markdown 渲染成看板"
backlog task edit BACK-1 -d "详细背景" --ac "清晰的验收标准"

# 跟踪进展
backlog task list -s "To Do"
backlog task list --json | jq '.tasks[] | .id'
backlog task edit BACK-1 --comment "UI 这块能拆成单独的 PR 吗？" --comment-author @sara
backlog search "看板"
backlog board

# 在浏览器里可视化操作
backlog browser
```

你可以随时在 AI 辅助和手动操作之间切换；两者操作的是同一批 Markdown 任务文件。请优先使用 Backlog.md 命令（CLI/MCP/Web）而不是手工编辑任务文件，这样字段类型和元数据才保持一致。

读命令提供稳定、有版本的 JSON，供脚本与集成使用。`task list`、`task view`、`task <id>` 简写、`draft list`、`decision list` 和 `search` 都支持 `--json`。JSON 模式是非交互的，成功时 stdout 保持机器可读。给 `task list --json` 加 `--watch` 会先输出一次完整列表，之后持续输出变更后的完整替换，JSON 格式完全相同。连续读取完整的 JSON 值即可，每次响应都会替换上一次的列表。

**了解更多：** [CLI 参考](CLI-INSTRUCTIONS.md) | [高级配置](ADVANCED-CONFIG.md)

---

<a id="groma-md"></a>

## 🗺️ Backlog.md + Groma.md

Backlog.md 让需求、方案和代码都可审阅。[Groma.md](https://groma.md) 补上架构这一层：它把你的仓库扫描成一张 C4 地图，由你或你的编码 Agent 维护，和代码放在一起，存成 [Open Knowledge Format 0.2](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md) 包。它会读取你的 Backlog.md 任务，所以两者配合得很好：

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./.github/groma-map-dark.webp">
  <img src="./.github/groma-map-light.webp" alt="Backlog.md's own architecture in Groma.md: Backlog.md tasks pinned to the components they touch, with one task selected and its acceptance criteria open" width="100%">
</picture>

* 📍 **任务落在图上** —— 每个任务都钉在它触及的组件上，你看到的是工作落点，而不只是列表

* 👀 **谁在忙什么** —— 多个 Agent 同时开工时，能看到各自在忙哪块

* 🔍 **按架构审阅任务** —— 选中任务即可高亮它触及的组件，不离开地图就能检查改动

* 📦 **Open Knowledge Format 0.2** —— 每个元素一份 Markdown 文档，让地图可移植、可读

* 📝 **依然是纯文件** —— 两者都在本地运行，不需要账号，都以 Markdown 存在你的仓库里

Groma.md 是独立安装的，没有它 Backlog.md 也完全可用。要给已经有 Backlog.md 的仓库加上地图：

```bash
npm i -g groma.md
groma web
```

Backlog.md 用它管理自己：每次推到 main 都会更新地图，每个 PR 都会有一条评论说明它改动了哪些架构。

👉 **[从 groma.md 开始](https://groma.md)**

🗺️ **[在线查看 Backlog.md 自己的架构](https://mrlesk.github.io/Backlog.md/architecture/auto/)**

---

## <img src="./.github/web-interface-256.png" alt="Web Interface" width="28" height="28" align="center"> Web 界面

在本机启动 Web 界面做可视化任务管理。默认监听 `127.0.0.1`，局域网和 VPN 上的其他设备访问不到：

```bash
# 启动 Web 服务（自动打开浏览器）
backlog browser

# 自定义端口
backlog browser --port 8080

# 不自动打开浏览器
backlog browser --no-open
```

**功能：**
- 支持拖拽的交互式看板
- 多选卡片，一次把多个任务移到同一列
- 表单式任务创建与编辑
- 带清单的交互式验收标准编辑器
- 各视图之间实时同步
- 桌面端与移动端自适应
- 带确认对话框的任务归档
- 与 CLI 无缝衔接 —— 所有改动都同步回 Markdown 文件

![Web Interface Screenshot](./.github/web.jpeg)

想把 Web UI 作为开机自启的本地服务运行，见[把 Backlog.md 作为服务运行](backlog/docs/doc-003%20-%20Running-Backlog-Browser-as-a-Service.md)。

---

## 🔧 MCP 集成（Model Context Protocol）

CLI 说明是默认的 AI 配置方式。当你明确偏好 MCP 连接器时，Claude Code、Codex、Gemini CLI 和 Kiro 等 AI 编码助手同样支持 MCP。

官方 `backlog` 可通过 `backlog init` 自动配置 MCP。用 npm 安装本 Fork 时，请按下面的步骤手动配置，将启动命令 `backlog` 换成 `bklg`，服务名仍用 `backlog`。

### 客户端指南

<details>
  <summary><strong>Claude Code</strong></summary>

  ```bash
  claude mcp add backlog --scope user -- backlog mcp start
  ```

</details>

<details>
  <summary><strong>Codex</strong></summary>

  ```bash
  codex mcp add backlog -- backlog mcp start
  ```

</details>

<details>
  <summary><strong>Gemini CLI</strong></summary>

  ```bash
  gemini mcp add backlog -s user backlog mcp start
  ```

</details>

<details>
  <summary><strong>Kiro</strong></summary>

  ```bash
  kiro-cli mcp add --scope global --name backlog --command backlog --args mcp,start
  ```

</details>

<details>
  <summary><strong>Cursor / 其他 MCP 客户端</strong></summary>

  在客户端的 MCP 设置里使用下面的手写 JSON 配置。

</details>

无论哪个客户端，都用统一的 `backlog` 服务名。服务会从客户端的 MCP roots 找到当前项目，你切换工作区或工作树时它会重新解析。一个 user 作用域的服务就够覆盖所有仓库。

<details>
  <summary><strong>手动配置</strong></summary>

```json
{
  "mcpServers": {
    "backlog": {
      "command": "backlog",
      "args": ["mcp", "start"],
      "env": {
        "BACKLOG_CWD": "/absolute/path/to/your/project"
      }
    }
  }
}
```

把 `BACKLOG_CWD` 设成某个具体项目路径，就能把服务钉死在那儿、不再跟随工作区。要么始终指向同一个 backlog，要么在客户端无法上报 MCP roots 时用这个办法。如果你的 IDE 支持自定义参数但不支持环境变量，也可以用 `["mcp", "start", "--cwd", "/absolute/path/to/your/project"]`。在服务找到已初始化的项目之前，它会返回 `backlog://init-required`。

</details>

> [!IMPORTANT]
> 手动添加 MCP 服务后，请在你的 CLAUDE.md/AGENTS.md 里加一句提示，让 Agent 读取 `backlog://workflow/overview`。
> 用 CLI 方式配置时不需要这一步，`backlog init` 会自动加上这些说明。


连接之后，Agent 可以通过 `backlog://workflow/overview` 读取 Backlog.md 的工作流说明，详细指南在 `backlog://workflow/task-creation`、`backlog://workflow/task-execution` 和 `backlog://workflow/task-finalization`。
在你的 AI 工具（Claude Code、Codex、Kiro）里用 `/mcp` 命令确认连接是否正常。

---

## <img src="./.github/cli-reference-256.png" alt="CLI Reference" width="28" height="28" align="center"> CLI 参考

覆盖任务管理、搜索、看板、文档、决策等全部命令的完整参考：**[CLI-INSTRUCTIONS.md](CLI-INSTRUCTIONS.md)**

常用示例：`backlog`、`backlog instructions`、`backlog task create`、`backlog task list`、`backlog task edit`、`backlog milestone add`、`backlog milestone rename`、`backlog milestone remove`、`backlog search`、`backlog board`、`backlog browser`。

完整帮助：`backlog --help`

---

## <img src="./.github/configuration-256.png" alt="Configuration" width="28" height="28" align="center"> 配置

Backlog.md 零配置即可使用。配置按顺序合并：CLI 参数 → 项目配置文件（存在 `backlog.config.yml` 时用它，否则是 `backlog/config.yml` 或 `.backlog/config.yml`）→ 内置默认值。

不带参数运行 `backlog config` 会进入交互式向导（和 `backlog init` 高级设置触发的是同一套流程）。它会引导你配置跨分支准确度（`checkActiveBranches`、`remoteOperations`、`activeBranchDays`）、Git 工作流（`autoCommit`、`bypassGitHooks`）、ID 格式（`zeroPaddedIds`）、编辑器集成（`defaultEditor`）、完成定义默认值，以及 Web UI 默认值（`defaultPort`、`autoOpenBrowser`）。跳过向导会采用安全的内置默认值；重跑 `backlog init` 或 `backlog config` 会用你当前的值预填提示。

对纯文件系统项目（`backlog init --no-git`），保存的配置会强制 `checkActiveBranches=false`、`remoteOperations=false` 和 `autoCommit=false`，这样 CLI、Web 和 MCP 的本地文件流程都不依赖 Git 仓库。

### 完成定义默认值

用 `backlog config`（或 `backlog init` 高级设置期间）、在 Web UI 里（设置 → 完成定义默认值），或直接编辑项目配置文件，为项目设置统一的 DoD 条目：

```yaml
definition_of_done:
  - Tests pass
  - Documentation updated
  - No regressions introduced
```

使用根目录配置发现的项目，请改 `backlog.config.yml` 而不是 `backlog/config.yml`。

这些条目默认会加到每个新任务上。创建时可用 `--dod` 追加，或用 `--no-dod-defaults` 为单个任务禁用默认值。

完整配置参考（全部选项、默认值、命令和详细说明）见 **[ADVANCED-CONFIG.md](ADVANCED-CONFIG.md)**。

---

## 疑难排查

### Apple Silicon（macOS）

在 M 系列 Mac 上，当 Node、Bun 或 Homebrew 跑在 Rosetta（x64 模拟）下时，`backlog` 可能报 `illegal hardware instruction` 或 `Binary package not installed for darwin-...` —— 因为装成了 Intel 版二进制，或者反过来。启动器会运行实际装着的那个 darwin 变体（arm64 或 x64），但用本机原生架构干净安装才是可靠的修法。

看看你的工具报什么：

```bash
uname -m                            # arm64 = Apple Silicon 硬件；x86_64 = Intel 或 Rosetta shell
node -p process.arch                # 你的 Node/Bun 运行时的架构
sysctl -in sysctl.proc_translated   # 1 = 当前 shell 跑在 Rosetta 下
which brew                          # /opt/homebrew = arm64 brew，/usr/local = Intel brew
```

如果架构不一致，用原生的那个重装：

```bash
# Homebrew：确认 `which brew` 输出 /opt/homebrew，然后
brew reinstall backlog-md

# npm：本 Fork
arch -arm64 npm install -g @boriszhangyyy/bklg

# Bun：上游版本
arch -arm64 bun add -g backlog.md
```

使用 x64 Node 跑在 Rosetta 下时，`bklg` 会在已安装的 `@boriszhangyyy/bklg-darwin-*` 包中选择可用的版本。

---

## 📺 演讲与社区

看 Backlog.md 的实际应用：

- **Devoxx Belgium 2025**：[Backlog.md 背后的规范驱动 Agent 工作流，台上实战](https://www.youtube.com/watch?v=LSoDQU_9MMA)
- **AI Engineer Code Summit 2025**：[Backlog.md：面向 AI Agent 的任务管理](https://www.youtube.com/watch?v=zMXKhhwiCIc)
- 更多演讲的幻灯片：[mrlesk.com/talks](https://mrlesk.com/talks)

### 社区工具

- **[vscode-backlog-md](https://marketplace.visualstudio.com/items?itemName=ysamlan.vscode-backlog-md)** —— VS Code 扩展，提供问题面板、看板视图和编辑功能。（[ysamlan/vscode-backlog-md](https://github.com/ysamlan/vscode-backlog-md)）

---

## 许可

Backlog.md 以 **MIT 许可** 发布：随便用，注明出处即可。见 [LICENSE](LICENSE)。
