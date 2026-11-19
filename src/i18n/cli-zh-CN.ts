/**
 * Simplified Chinese copy for the CLI, keyed by the English text the command line already uses.
 *
 * English is the key so an upstream release that adds a description renders in English until
 * this file translates it. Command names, option flags and example arguments are never translated.
 */
export const cliZhCN: Record<string, string> = {
	// Help schema scaffolding
	"  - None": "  - 无",
	"Input schema:": "输入字段：",
	"Required fields:": "必填字段：",
	"Optional fields:": "可选字段：",
	"Markdown fields:": "Markdown 字段：",
	"Reads:": "读取：",
	"Writes:": "写入：",
	"Output:": "输出：",
	"Examples:": "示例：",
	"Usage:": "用法：",
	"Arguments:": "参数：",
	"Options:": "选项：",
	"Global Options:": "全局选项：",
	"Commands:": "命令：",
	"display version number": "显示版本号",
	"display help for command": "显示命令帮助",
	"  - Multi-line values need real newlines; a literal \\n is stored as text":
		"  - 多行值需要真实换行；字面量 \\n 会被当作普通文本保存",
	"  - Example (bash/zsh): --{field} $'First line\\nSecond line'": "  - 示例（bash/zsh）：--{field} $'第一行\\n第二行'",

	// Program and command descriptions
	"Backlog.md - Project management CLI": "Backlog.md - 项目管理命令行",
	"initialize backlog project in the current directory (or BACKLOG_CWD when set)":
		"在当前目录（或 BACKLOG_CWD 指定的目录）初始化 backlog 项目",
	"search tasks, documents, and decisions using the shared index": "使用共享索引搜索任务、文档和决策",
	"display tasks in a Kanban board": "以看板形式展示任务",
	"open browser interface (default host: 127.0.0.1; press Ctrl+C or Cmd+C to stop)":
		"打开网页界面（默认主机：127.0.0.1；按 Ctrl+C 或 Cmd+C 停止）",
	"display project statistics and metrics": "显示项目统计与指标",
	"manage backlog configuration": "管理 backlog 配置",
	"manage the short Backlog.md CLI nudge in agent instruction files":
		"管理 Agent 说明文件中简短的 Backlog.md 命令行提示",
	"diagnose duplicate task, document, and decision IDs, report self-referential and cyclic dependencies, safely repair duplicate task IDs, and move archived tasks into the archive folder":
		"诊断重复的任务、文档和决策 ID，报告自引用与循环依赖，安全修复重复任务 ID，并把已归档任务移入归档目录",
	"archive tasks in the final status that are older than a chosen age": "归档处于最终状态且超过指定天数的任务",
	"list tasks grouped by status": "按状态分组列出任务",
	"display task details": "显示任务详情",
	"create a new task": "新建任务",
	"create a task without opening it afterwards": "新建任务，创建后不打开",
	"create a task and fill in its fields without leaving the terminal": "新建任务并直接在终端中填写字段",
	"edit an existing task": "编辑已有任务",
	"move a task off the board into the archive, keeping its ID and links": "把任务从看板移入归档，保留其 ID 和关联",
	"permanently delete an archived task, releasing its ID": "永久删除已归档任务，释放其 ID",
	"move an archived task back to the board, keeping its ID and status": "把已归档任务恢复到看板，保留其 ID 和状态",
	"move task back to drafts": "把任务移回草稿",
	"promote draft to task": "把草稿转为任务",
	"list decisions": "列出决策",
	"view an active or archived decision": "查看活动或已归档的决策",
	"create a decision": "新建决策",
	"edit decision content, title, status or replacement link": "编辑决策内容、标题、状态或替换关系",
	"move a decision into the archive, keeping its ID reserved": "把决策移入归档，保留其 ID",
	"move an archived decision back to the decisions folder": "把已归档决策移回决策目录",
	"permanently delete an archived decision, releasing its ID": "永久删除已归档决策，释放其 ID",
	"list all drafts": "列出全部草稿",
	"display draft details": "显示草稿详情",
	"edit an existing draft": "编辑已有草稿",
	"archive a draft": "归档草稿",
	"list milestones with completion status": "列出里程碑及完成情况",
	"add a milestone file": "新增里程碑文件",
	"archive a milestone by id or title": "按 ID 或标题归档里程碑",
	"remove a milestone file and clear, keep, or reassign matching tasks":
		"移除里程碑文件，并清除、保留或重新分配匹配的任务",
	"rename a milestone file and update local tasks by default": "重命名里程碑文件，默认同步更新本地任务",
	"view a document": "查看文档",
	"update a document": "更新文档",
	"move a document into the archive, keeping its ID reserved": "把文档移入归档，保留其 ID",
	"move an archived document back to the docs folder": "把已归档文档移回文档目录",
	"permanently delete an archived document, releasing its ID": "永久删除已归档文档，释放其 ID",
	"search documents using the shared fuzzy index": "使用共享模糊索引搜索文档",
	"set a configuration value": "设置配置项",
	"get a configuration value": "读取配置项",
	"list all configuration values": "列出全部配置项",
	"show Backlog.md workflow instructions": "显示 Backlog.md 工作流说明",
	"manage shell completion scripts": "管理命令行补全脚本",
	"start the MCP server": "启动 MCP 服务",

	// Task fields
	"task description": "任务描述",
	"task description (multi-line: include real newlines inside the quoted string)":
		"任务描述（多行：在引号内换入真实换行）",
	"Task outcome and context": "任务的产出与背景",
	"Replacement description": "替换后的描述",
	"alias for --description": "`--description` 的别名",
	"Replacement task title": "替换后的任务标题",
	"Task title; prompted when omitted in interactive mode": "任务标题；交互模式下省略时会提示输入",
	"Replacement title": "替换后的标题",
	'assign task to one or more @names (comma-separated or repeatable); pass "" to leave it unassigned':
		'把任务指派给一个或多个 @名称（逗号分隔或重复指定）；传 "" 表示不指派',
	'assign draft to one or more @names (comma-separated or repeatable); pass "" to leave it unassigned':
		'把草稿指派给一个或多个 @名称（逗号分隔或重复指定）；传 "" 表示不指派',
	'Assign one or more @names; repeat -a or use @name1,@name2; omitting it applies the configured defaultAssignee, while -a "" leaves the task unassigned':
		'指派一个或多个 @名称；重复 -a 或使用 @name1,@name2；省略时应用配置的 defaultAssignee，-a "" 表示不指派',
	'replace all task assignees with one or more @names (comma-separated or repeatable); pass "" to clear them':
		'用一个或多个 @名称替换全部负责人（逗号分隔或重复指定）；传 "" 清空',
	'Replace all assignees; repeat -a or use @name1,@name2; -a "" clears them':
		'替换全部负责人；重复 -a 或使用 @name1,@name2；-a "" 清空',
	"add task labels (comma-separated or repeatable)": "添加任务标签（逗号分隔或可重复）",
	"add draft labels (comma-separated or repeatable)": "添加草稿标签（逗号分隔或可重复）",
	"add task labels without replacing existing labels (comma-separated or repeatable)":
		"添加任务标签，不替换已有标签（逗号分隔或可重复）",
	"Task labels; repeat -l or use label1,label2": "任务标签；重复 -l 或使用 label1,label2",
	"replace all task labels (comma-separated or repeatable; cannot combine with --add-label/--remove-label)":
		"替换全部任务标签（逗号分隔或可重复；不能与 --add-label/--remove-label 同时使用）",
	"Replace all labels; repeat --label or use label1,label2": "替换全部标签；重复 --label 或使用 label1,label2",
	"Replace all labels; repeatable": "替换全部标签；可重复",
	"Add labels; repeatable": "添加标签；可重复",
	"Add labels; repeat --add-label or use label1,label2": "添加标签；重复 --add-label 或使用 label1,label2",
	"remove task labels without replacing others (comma-separated or repeatable)":
		"移除任务标签，不影响其他标签（逗号分隔或可重复）",
	"remove all task labels (cannot combine with --label/--add-label/--remove-label)":
		"移除全部任务标签（不能与 --label/--add-label/--remove-label 同时使用）",
	"Remove all labels; cannot combine with other label flags": "移除全部标签；不能与其他标签参数同时使用",
	"Remove labels; repeat --remove-label or use label1,label2": "移除标签；重复 --remove-label 或使用 label1,label2",
	"Remove labels; repeatable": "移除标签；可重复",
	"Remove all labels": "移除全部标签",
	"Require every listed label; repeat --labels or use label1,label2":
		"要求包含全部列出的标签；重复 --labels 或使用 label1,label2",
	"filter tasks by labels; require every comma-separated label (repeatable)":
		"按标签筛选任务；要求包含每个逗号分隔的标签（可重复）",
	"Replacement tags": "替换后的标签集",
	"set tags (comma-separated or use multiple times)": "设置标签（逗号分隔或重复指定）",
	"set task priority (configured priorities)": "设置任务优先级（已配置的优先级）",
	"Task priority": "任务优先级",
	"Set priority (configured priorities)": "设置优先级（已配置的优先级）",
	"filter tasks by priority (configured priorities)": "按优先级筛选任务（已配置的优先级）",
	"filter task results by priority (configured priorities)": "按优先级筛选任务结果（已配置的优先级）",
	"Filter task results by priority": "按优先级筛选任务结果",
	"Filter by task priority": "按任务优先级筛选",
	"set task type (configured task types)": "设置任务类型（已配置的任务类型）",
	"set task type (configured task types; pass an empty value to clear)": "设置任务类型（已配置的任务类型；传空值清除）",
	"Task type; case-insensitive": "任务类型；不区分大小写",
	"Replacement task type; case-insensitive": "替换后的任务类型；不区分大小写",
	"filter tasks by configured task type (repeatable or comma-separated)":
		"按已配置的任务类型筛选任务（可重复或逗号分隔）",
	"filter task results by configured task type (repeatable or comma-separated)":
		"按已配置的任务类型筛选任务结果（可重复或逗号分隔）",
	"Filter by one or more configured task types; repeat or comma-separate values":
		"按一个或多个已配置的任务类型筛选；重复或逗号分隔取值",
	"Filter task results by one or more configured task types; repeat or comma-separate values":
		"按一个或多个已配置的任务类型筛选任务结果；重复或逗号分隔取值",
	"set task project (configured projects)": "设置任务项目（已配置的项目）",
	"set task project (configured projects; pass an empty value to clear)": "设置任务项目（已配置的项目；传空值清除）",
	"Task project; case-insensitive": "任务项目；不区分大小写",
	"Replacement task project; case-insensitive; pass an empty value to clear":
		"替换后的任务项目；不区分大小写；传空值清除",
	"filter tasks by configured project (repeatable or comma-separated)": "按已配置的项目筛选任务（可重复或逗号分隔）",
	"filter task results by configured project (repeatable or comma-separated)":
		"按已配置的项目筛选任务结果（可重复或逗号分隔）",
	"Filter by one or more configured projects; repeat or comma-separate values":
		"按一个或多个已配置的项目筛选；重复或逗号分隔取值",
	"Filter task results by one or more configured projects; repeat or comma-separate values":
		"按一个或多个已配置的项目筛选任务结果；重复或逗号分隔取值",
	"Project task status; case-insensitive": "项目任务状态；不区分大小写",
	"Task to display": "要显示的任务",
	"Task to archive, in any status": "要归档的任务，任意状态均可",
	"Archived task to restore": "要恢复的已归档任务",
	"Archived task to delete": "要删除的已归档任务",
	"Tasks to update; prompted when omitted in interactive mode. Several IDs apply the same shared-field change to every task":
		"要更新的任务；交互模式下省略时会提示输入。多个 ID 会把同一字段改动应用到每个任务",
	"Non-negative manual ordering value": "非负的手工排序值",
	"set task ordinal for custom ordering": "设置任务排序值以实现自定义顺序",
	"Set ordinal for custom ordering": "设置排序值以实现自定义顺序",
	"Optional due date (YYYY-MM-DD)": "可选截止日期（YYYY-MM-DD）",
	"Set the task due date (YYYY-MM-DD)": "设置任务截止日期（YYYY-MM-DD）",
	"set due date (YYYY-MM-DD)": "设置截止日期（YYYY-MM-DD）",
	"clear task due date": "清除任务截止日期",
	"Clear the task due date": "清除任务截止日期",
	"Clear the due date": "清除截止日期",
	"Clear the milestone due date": "清除里程碑截止日期",
	"clear milestone due date": "清除里程碑截止日期",
	"Set the milestone due date (YYYY-MM-DD)": "设置里程碑截止日期（YYYY-MM-DD）",
	"Optional milestone due date (YYYY-MM-DD)": "可选的里程碑截止日期（YYYY-MM-DD）",
	"set implementation plan": "设置实现计划",
	"Replacement implementation plan": "替换后的实现计划",
	"add implementation notes": "添加实现记录",
	"Replacement implementation notes": "替换后的实现记录",
	"set implementation notes (replaces existing)": "设置实现记录（替换原内容）",
	"Same restriction as plan": "限制与计划相同",
	"add a plan only for already-started work created directly in an active status (for example, In Progress)":
		"仅为直接创建在活动状态（例如「进行中」）下的已开始工作添加计划",
	"Only for already-started work created directly in a configured active status (for example, In Progress)":
		"仅用于直接创建在已配置活动状态（例如「进行中」）下的已开始工作",
	"Only for finished, verified work created directly in a configured terminal status":
		"仅用于直接创建在已配置最终状态下的已完成、已验证工作",
	"set final summary (replaces existing)": "设置完成总结（替换原内容）",
	"add final summary": "添加完成总结",
	"remove final summary": "移除完成总结",
	"Remove final summary": "移除完成总结",
	"Completion summary": "完成总结",
	"set modified file paths from project root (can be used multiple times)":
		"设置相对项目根目录的修改文件路径（可重复使用）",
	"add modified file path from project root (can be used multiple times)":
		"添加相对项目根目录的修改文件路径（可重复使用）",
	"Set modified file paths; repeatable": "设置修改文件路径；可重复",
	"filter tasks by parent task ID": "按父任务 ID 筛选任务",
	"specify existing parent task ID, not a milestone ID": "指定已有的父任务 ID，而不是里程碑 ID",
	"Existing parent task for subtasks; not a milestone ID": "子任务所属的已有父任务；不是里程碑 ID",
	"Show subtasks of a parent task": "显示某父任务的子任务",
	"filter tasks by assignee": "按负责人筛选任务",
	"Filter by @name": "按 @名称筛选",
	"filter tasks without an assignee (cannot be combined with --assignee)":
		"筛选没有负责人的任务（不能与 --assignee 同时使用）",
	"Only tasks without an assignee; cannot be combined with --assignee":
		"仅限没有负责人的任务；不能与 --assignee 同时使用",
	"filter tasks by status (case-insensitive, repeatable or comma-separated)":
		"按状态筛选任务（不区分大小写，可重复或逗号分隔）",
	"filter tasks by one or more statuses; repeat or comma-separate values; case-insensitive":
		"按一个或多个状态筛选任务；重复或逗号分隔取值；不区分大小写",
	"filter task results by status (repeatable or comma-separated)": "按状态筛选任务结果（可重复或逗号分隔）",
	"Filter task results by one or more statuses; repeat or comma-separate values; case-insensitive":
		"按一个或多个状态筛选任务结果；重复或逗号分隔取值；不区分大小写",
	"exclude tasks by status (repeatable or comma-separated)": "按状态排除任务（可重复或逗号分隔）",
	"exclude task results by status (repeatable or comma-separated)": "按状态排除任务结果（可重复或逗号分隔）",
	"Exclude tasks with one or more statuses; repeat or comma-separate values":
		"排除具有一个或多个状态的任务；重复或逗号分隔取值",
	"Exclude task results with one or more statuses; repeat or comma-separate values":
		"排除具有一个或多个状态的任务结果；重复或逗号分隔取值",
	"filter tasks by milestone (closest match, case-insensitive)": "按里程碑筛选任务（最接近匹配，不区分大小写）",
	"assign task to milestone by ID or title": "按 ID 或标题把任务指派到里程碑",
	"Assign to milestone by ID or title": "按 ID 或标题指派到里程碑",
	"clear task milestone assignment": "清除任务里程碑归属",
	"Clear the milestone assignment": "清除里程碑归属",
	'set task dependencies (comma-separated or use multiple times); pass "" to clear them':
		'设置任务依赖（逗号分隔或重复指定）；传 "" 清空',
	"set task dependencies (shortcut for --depends-on)": "设置任务依赖（`--depends-on` 的简写）",
	"specify task dependencies (comma-separated or use multiple times)": "指定任务依赖（逗号分隔或重复指定）",
	"specify task dependencies (shortcut for --depends-on)": "指定任务依赖（`--depends-on` 的简写）",
	"Set dependencies (shortcut for --depends-on)": "设置依赖（`--depends-on` 的简写）",
	'Set dependencies; pass "" to clear': '设置依赖；传 "" 清空',
	"remove all task dependencies (cannot combine with --depends-on or --dep)":
		"移除全部任务依赖（不能与 --depends-on 或 --dep 同时使用）",
	"Remove all task dependencies; cannot combine with dependency flags": "移除全部任务依赖；不能与依赖相关参数同时使用",
	"Remove all dependencies": "移除全部依赖",
	"add reference URL or file path (can be used multiple times)": "添加引用网址或文件路径（可重复使用）",
	"add references without replacing existing references (comma-separated or repeatable)":
		"添加引用，不替换已有引用（逗号分隔或可重复）",
	'replace all references (comma-separated or repeatable; cannot combine with --add-ref/--remove-ref); pass "" to clear them':
		'替换全部引用（逗号分隔或可重复；不能与 --add-ref/--remove-ref 同时使用）；传 "" 清空',
	'Replace all references; pass "" to clear': '替换全部引用；传 "" 清空',
	'replace all references (comma-separated or repeatable; cannot combine with --add-ref/--remove-ref); pass "" to clear':
		'替换全部引用（逗号分隔或可重复；不能与 --add-ref/--remove-ref 同时使用）；传 "" 清空',
	"remove references without replacing others (comma-separated or repeatable)":
		"移除引用，不影响其他引用（逗号分隔或可重复）",
	"remove all references (cannot combine with --ref/--add-ref/--remove-ref)":
		"移除全部引用（不能与 --ref/--add-ref/--remove-ref 同时使用）",
	"Remove all references; cannot combine with --ref, --add-ref, or --remove-ref":
		"移除全部引用；不能与 --ref、--add-ref 或 --remove-ref 同时使用",
	"Remove references; repeat --remove-ref or use ref1,ref2": "移除引用；重复 --remove-ref 或使用 ref1,ref2",
	"Remove references; repeatable": "移除引用；可重复",
	"Remove all references": "移除全部引用",
	"Add references; repeat --add-ref or use ref1,ref2": "添加引用；重复 --add-ref 或使用 ref1,ref2",
	"Add references; repeatable": "添加引用；可重复",
	"add documentation URL or file path (can be used multiple times)": "添加关联文档的网址或文件路径（可重复使用）",
	"add documentation without replacing existing documentation (comma-separated or repeatable)":
		"添加关联文档，不替换已有文档（逗号分隔或可重复）",
	"Add documentation; repeat --add-doc or use doc1,doc2": "添加关联文档；重复 --add-doc 或使用 doc1,doc2",
	"Add documentation; repeatable": "添加关联文档；可重复",
	"remove documentation without replacing others (comma-separated or repeatable)":
		"移除关联文档，不影响其他文档（逗号分隔或可重复）",
	"Remove documentation; repeat --remove-doc or use doc1,doc2": "移除关联文档；重复 --remove-doc 或使用 doc1,doc2",
	"Remove documentation; repeatable": "移除关联文档；可重复",
	"remove all documentation (cannot combine with --doc/--add-doc/--remove-doc)":
		"移除全部关联文档（不能与 --doc/--add-doc/--remove-doc 同时使用）",
	"Remove all documentation; cannot combine with --doc, --add-doc, or --remove-doc":
		"移除全部关联文档；不能与 --doc、--add-doc 或 --remove-doc 同时使用",
	"Remove all documentation": "移除全部关联文档",
	"add single-line acceptance criteria (can be used multiple times; no line breaks)":
		"添加单行验收标准（可重复使用；不能换行）",
	"add Definition of Done item (can be used multiple times)": "添加完成定义项（可重复使用）",
	"Add Definition of Done items; repeatable": "添加完成定义项；可重复",
	"No line breaks; repeat --ac for multiple criteria": "不能换行；重复 --ac 可添加多条标准",
	"Add acceptance criteria; no line breaks; repeatable; commas are preserved":
		"添加验收标准；不能换行；可重复；逗号会保留",
	"replace all acceptance criteria (single-line values; can be used multiple times; commas are preserved); matching trimmed text keeps checks":
		"替换全部验收标准（单行值；可重复使用；逗号会保留）；去除空白后相同的文本会保留勾选状态",
	"Replace all acceptance criteria; no line breaks; repeatable; matching trimmed text keeps checks":
		"替换全部验收标准；不能换行；可重复；去除空白后相同的文本会保留勾选状态",
	"remove acceptance criterion by index (1-based, can be used multiple times)":
		"按序号移除验收标准（从 1 开始，可重复使用）",
	"Remove acceptance criterion by 1-based index; repeatable": "按从 1 开始的序号移除验收标准；可重复",
	"check acceptance criterion by index (1-based, can be used multiple times)":
		"按序号勾选验收标准（从 1 开始，可重复使用）",
	"Check acceptance criterion by 1-based index; repeatable": "按从 1 开始的序号勾选验收标准；可重复",
	"uncheck acceptance criterion by index (1-based, can be used multiple times)":
		"按序号取消勾选验收标准（从 1 开始，可重复使用）",
	"Uncheck acceptance criterion by 1-based index; repeatable": "按从 1 开始的序号取消勾选验收标准；可重复",
	"1-based acceptance criterion index": "验收标准序号，从 1 开始",
	"Remove all acceptance criteria": "移除全部验收标准",
	"remove all acceptance criteria (cannot combine with acceptance criteria mutation options)":
		"移除全部验收标准（不能与其他验收标准修改参数同时使用）",
	"remove Definition of Done item by index (1-based, can be used multiple times)":
		"按序号移除完成定义项（从 1 开始，可重复使用）",
	"Remove Definition of Done item by index; repeatable": "按序号移除完成定义项；可重复",
	"check Definition of Done item by index (1-based, can be used multiple times)":
		"按序号勾选完成定义项（从 1 开始，可重复使用）",
	"Check Definition of Done item by index; repeatable": "按序号勾选完成定义项；可重复",
	"uncheck Definition of Done item by index (1-based, can be used multiple times)":
		"按序号取消勾选完成定义项（从 1 开始，可重复使用）",
	"Uncheck Definition of Done item by index; repeatable": "按从 1 开始的序号取消勾选完成定义项；可重复",
	"disable Definition of Done defaults": "不使用完成定义默认值",

	// Draft, decision, document and milestone fields
	"Draft to update; prompted when omitted in interactive mode": "要更新的草稿；交互模式下省略时会提示输入",
	"Replacement draft title": "替换后的草稿标题",
	'Only "Draft" is valid; drafts cannot change status': "仅「草稿」有效；草稿不能更改状态",
	"set decision title": "设置决策标题",
	"Decision title": "决策标题",
	"set decision status (free-form)": "设置决策状态（自由文本）",
	"set decision status (free-form, defaults to proposed)": "设置决策状态（自由文本，默认为 proposed）",
	"Decision status; free-form, defaults to proposed": "决策状态；自由文本，默认为 proposed",
	"New decision status; free-form": "新的决策状态；自由文本",
	"Decision to display": "要显示的决策",
	"Decision to update": "要更新的决策",
	"Decision to archive": "要归档的决策",
	"Archived decision to restore": "要恢复的已归档决策",
	"Archived decision to delete": "要删除的已归档决策",
	"Replacement Decision; empty text clears it, omission keeps it": "替换决策内容；传空文本清除，省略则保留",
	"Replacement Context; empty text clears it, omission keeps it": "替换背景；传空文本清除，省略则保留",
	"Replacement Consequences; empty text clears it, omission keeps it": "替换影响；传空文本清除，省略则保留",
	"Replacement Alternatives; empty text clears it, omission keeps it": "替换备选方案；传空文本清除，省略则保留",
	"replace Decision (multi-line: use real newlines); empty text clears it":
		"替换决策内容（多行：使用真实换行）；传空文本清除",
	"replace Context (multi-line: use real newlines); empty text clears it":
		"替换背景（多行：使用真实换行）；传空文本清除",
	"replace Consequences (multi-line: use real newlines); empty text clears it":
		"替换影响（多行：使用真实换行）；传空文本清除",
	"replace Alternatives (multi-line: use real newlines); empty text clears it":
		"替换备选方案（多行：使用真实换行）；传空文本清除",
	"set the replacing decision; pass an empty value to clear": "设置替换的决策；传空值清除",
	"Existing replacement decision; empty value to clear; does not change status":
		"用于替换的已有决策；传空值清除；不改变状态",
	"Document title": "文档标题",
	"Document to display": "要显示的文档",
	"Document to update": "要更新的文档",
	"Document to archive": "要归档的文档",
	"Archived document to restore": "要恢复的已归档文档",
	"Archived document to delete": "要删除的已归档文档",
	"Replacement document body": "替换后的文档正文",
	"replace document markdown content": "替换文档的 Markdown 内容",
	"update document title": "更新文档标题",
	"Document type": "文档类型",
	"Subdirectory under backlog/docs; absolute paths and .. are rejected": "backlog/docs 下的子目录；拒绝绝对路径和 ..",
	"move document under a docs-relative path (absolute paths and .. are rejected)":
		"把文档移到 docs 相对路径下（拒绝绝对路径和 ..）",
	"Move document under backlog/docs": "把文档移到 backlog/docs 下",
	"Milestone name/title, trimmed before storage": "里程碑名称/标题，保存前会去除首尾空白",
	"New milestone title; checked for alias conflicts": "新的里程碑标题；会检查别名冲突",
	"Active milestone to remove": "要移除的活动里程碑",
	"Existing active milestone to rename": "要重命名的现有活动里程碑",
	"Milestone to archive": "要归档的里程碑",
	"milestone description": "里程碑描述",
	"Optional milestone description": "可选的里程碑描述",
	"how to handle matching tasks (clear|keep|reassign)": "如何处理匹配的任务（clear|keep|reassign）",
	"How to handle matching local task milestone values; default clear": "如何处理匹配的本地任务里程碑值；默认 clear",
	"Required when task-handling is reassign; target must be an active milestone":
		"当 task-handling 为 reassign 时必填；目标必须是活动里程碑",
	"target milestone when --task-handling reassign": "当 --task-handling 为 reassign 时的目标里程碑",
	"Update local task milestone references; default true, disable with --no-update-tasks":
		"更新本地任务的里程碑引用；默认开启，用 --no-update-tasks 关闭",
	"do not update local tasks that reference the milestone": "不更新引用该里程碑的本地任务",
	"show completed milestones": "显示已完成的里程碑",
	"Include completed milestones": "包含已完成的里程碑",

	// Search and filters
	"Fuzzy search text": "模糊搜索文本",
	"Search text, 1-200 characters": "搜索文本，1-200 个字符",
	"Search task title, description, notes, comments, and metadata": "搜索任务标题、描述、记录、评论和元数据",
	"search task title, description, notes, comments, and metadata": "搜索任务标题、描述、记录、评论和元数据",
	"limit results to type (task, document, decision)": "把结果限制为指定类型（task、document、decision）",
	"Result types": "结果类型",
	"Maximum number of results": "最大结果数",
	"limit total results returned": "限制返回的结果总数",
	"Maximum tasks to display after sorting": "排序后显示的最大任务数",
	"limit tasks displayed after sorting": "限制排序后显示的任务数",
	"Task order before limit and windows; without it: ordinal, then priority, then ID":
		"在截断和分页之前确定任务顺序；未指定时为：排序值、优先级、ID",
	"filter task results by modified file path substring": "按修改文件路径子串筛选任务结果",
	"Filter by modified file path substring": "按修改文件路径子串筛选",
	"only show unblocked tasks with all dependencies completed": "仅显示未被阻塞、且依赖全部完成的任务",
	"Only show unblocked tasks with all dependencies completed": "仅显示未被阻塞、且依赖全部完成的任务",
	"Closest case-insensitive match": "不区分大小写的最接近匹配",

	// Output and interaction
	"Use plain text output": "使用纯文本输出",
	"use plain text output": "使用纯文本输出",
	"Use plain text output (the default)": "使用纯文本输出（默认）",
	"use plain text output (the default)": "使用纯文本输出（默认）",
	"Use plain text output after editing": "编辑后使用纯文本输出",
	"use plain text output after editing": "编辑后使用纯文本输出",
	"use plain text output after creating": "创建后使用纯文本输出",
	"Use plain text output, which is the default for this command": "使用纯文本输出，这也是本命令的默认方式",
	"Use text output instead of interactive UI": "使用文本输出而非交互界面",
	"use plain text output instead of interactive UI": "使用纯文本输出而非交互界面",
	"print plain text output instead of interactive UI": "输出纯文本而非交互界面",
	"print versioned machine-readable JSON output": "输出带版本的机器可读 JSON",
	"Use versioned machine-readable JSON output": "输出带版本的机器可读 JSON",
	"keep emitting changed full JSON lists (requires --json)": "持续输出变化后的完整 JSON 列表（需要 --json）",
	"Requires --json; emit an initial full list and changed replacements until stopped or the process that started it ends":
		"需要 --json；先输出一次完整列表，之后持续输出变化后的完整列表，直到被停止或启动它的进程结束",
	"append a task comment; standalone '---' lines are reserved (can be used multiple times)":
		"追加任务评论；单独成行的 '---' 属保留内容（可重复使用）",
	"Append a discussion comment": "追加讨论评论",
	"Append a discussion comment; repeatable": "追加讨论评论；可重复",
	"author to record for appended comments": "记录追加评论的作者",
	"Author to record for appended comments": "记录追加评论的作者",
	"append after --plan replacement (can be used multiple times)": "在 --plan 替换之后追加（可重复使用）",
	"Append after --plan replacement; repeatable": "在 --plan 替换之后追加；可重复",
	"append to implementation notes (can be used multiple times)": "追加到实现记录（可重复使用）",
	"Append to implementation notes; repeatable": "追加到实现记录；可重复",
	"append to final summary (can be used multiple times)": "追加到完成总结（可重复使用）",
	"Append to final summary; repeatable": "追加到完成总结；可重复",

	// Configuration
	"Configuration value to print": "要打印的配置项",
	"Configuration value to update": "要更新的配置项",
	"New value; parsed based on key type": "新值；按配置项类型解析",

	// Init and agents
	"Project name; prompted when omitted": "项目名称；省略时会提示输入",
	"AI integration mode; CLI instructions are recommended": "AI 集成方式；推荐使用命令行说明",
	"choose AI integration mode: cli, mcp, or none (default: cli; cli instructions are recommended)":
		"选择 AI 集成方式：cli、mcp 或 none（默认 cli；推荐命令行说明）",
	"Instruction files to create; cursor writes AGENTS.md; comma-separated":
		"要创建的说明文件；cursor 会写入 AGENTS.md；逗号分隔",
	"comma-separated agent instructions to create. Valid: claude, agents, gemini, copilot, cursor (writes AGENTS.md), none. Use 'none' to skip; when combined with others, 'none' is ignored.":
		"要创建的 Agent 说明文件，逗号分隔。有效值：claude、agents、gemini、copilot、cursor（写入 AGENTS.md）、none。用 'none' 跳过；与其他值同时使用时 'none' 会被忽略。",
	"backlog folder for init: backlog, .backlog, or a custom project-relative path":
		"初始化时的 backlog 目录：backlog、.backlog 或自定义的项目相对路径",
	"backlog, .backlog, or custom path": "backlog、.backlog 或自定义路径",
	"config location for init: folder or root": "初始化时的配置位置：folder 或 root",
	"Task ID prefix; draft, doc, and decision are reserved": "任务 ID 前缀；draft、doc、decision 为保留值",
	"custom task prefix, letters only (default: task); draft, doc, and decision are reserved":
		"自定义任务前缀，仅限字母（默认 task）；draft、doc、decision 为保留值",
	"Initialize without Git integration": "初始化时不集成 Git",
	"initialize without Git integration": "初始化时不集成 Git",
	"use default values for all prompts": "所有提示都使用默认值",
	"check task states across active branches (default: true)": "跨活动分支检查任务状态（默认：true）",
	"include remote branches when checking (default: true)": "检查时包含远程分支（默认：true）",
	"days to consider branch active (default: 30)": "分支视为活动的天数（默认：30）",
	"bypass git hooks when committing (default: false)": "提交时跳过 Git 钩子（默认：false）",
	"number of digits for zero-padding IDs (0 to disable)": "ID 补零位数（0 表示关闭）",
	"default editor command": "默认编辑器命令",
	"default web UI port (default: 6420)": "默认网页界面端口（默认：6420）",
	"auto-open browser for web UI (default: true)": "打开网页界面时自动启动浏览器（默认：true）",
	"install Claude Code agent (default: false)": "安装 Claude Code agent（默认：false）",
	"Interactively select instruction files and refresh the short Backlog.md CLI nudge":
		"交互式选择说明文件，并刷新简短的 Backlog.md 命令行提示",
	"update the Backlog.md CLI nudge in agent instruction files while preserving existing content":
		"更新 Agent 说明文件中的 Backlog.md 命令行提示，保留原有内容",

	// Board, browser, cleanup and doctor
	"board layout (horizontal|vertical)": "看板布局（horizontal|vertical）",
	"use vertical layout (shortcut for --layout vertical)": "使用纵向布局（`--layout vertical` 的简写）",
	"group tasks by milestone": "按里程碑分组任务",
	"export kanban board to markdown file": "把看板导出为 Markdown 文件",
	"export to README.md with markers": "带标记地导出到 README.md",
	"overwrite existing file without confirmation": "不确认直接覆盖已有文件",
	"version to include in the export": "导出中包含的版本号",
	"port to run server on": "运行服务器使用的端口",
	"listening hostname or IP for this run. DANGER: remote access is unauthenticated; see warning below":
		"本次运行监听的主机名或 IP。危险：远程访问没有身份验证，请见下方警告",
	"don't automatically open browser": "不自动打开浏览器",
	"automatically use next free port without asking": "自动使用下一个空闲端口，不再询问",
	"apply the displayed duplicate task ID repair and archived task move": "应用显示的重复任务 ID 修复和已归档任务移动",
	"Apply the displayed duplicate-ID repair and move archived tasks into the archive folder":
		"应用显示的重复 ID 修复，并把已归档任务移入归档目录",
	"confirm --fix without prompting": "不询问直接确认 --fix",
	"Confirm --fix without an interactive prompt": "不弹交互提示直接确认 --fix",

	// Reads, writes and output summaries

	"Active and archived milestone files, plus local tasks unless task handling is keep":
		"活动和已归档的里程碑文件，以及本地任务（task handling 为 keep 时除外）",
	"Active and archived milestone files, plus local tasks when task updates are enabled":
		"活动和已归档的里程碑文件，以及在启用任务更新时的本地任务",
	"Active and archived task files, document, decision, and draft files, plus Backlog Markdown references":
		"活动和已归档的任务文件、文档、决策和草稿文件，以及 Backlog 中的 Markdown 引用",
	"Active milestone files": "活动里程碑文件",
	"Active milestone files for duplicate and alias validation": "用于重复与别名校验的活动里程碑文件",
	"Active or archived decision metadata and full Markdown content": "活动或已归档决策的元数据和完整 Markdown 内容",
	"Decisions under the configured decisions directory": "配置的决策目录下的决策",
	"Document metadata and markdown body": "文档元数据和 Markdown 正文",
	"Documents under the configured docs directory": "配置的文档目录下的文档",
	"Documents under the configured docs directory using the shared fuzzy search index":
		"使用共享模糊搜索索引检索配置的文档目录下的文档",
	"Drafts under the configured drafts directory": "配置的草稿目录下的草稿",
	"Local editable tasks from the configured backlog directory": "配置的 backlog 目录下的可编辑本地任务",
	"Milestone files and local task milestone values": "里程碑文件和本地任务的里程碑值",
	"Project Backlog.md configuration": "项目的 Backlog.md 配置",
	"Project config and existing agent instruction files when updating": "项目配置，以及更新时的已有 Agent 说明文件",
	"Task metadata, description, plan, notes, comments, final summary, AC, and DoD":
		"任务元数据、描述、计划、记录、评论、完成总结、验收标准和完成定义",
	"Tasks in terminal status from the configured backlog directory": "配置的 backlog 目录下处于最终状态的任务",
	"Tasks, documents, and decisions from the configured backlog directory": "配置的 backlog 目录下的任务、文档和决策",
	"Archives the selected terminal-status tasks: moves them off the board into the archive, keeping their IDs":
		"归档选中的最终状态任务：把它们从看板移入归档，保留其 ID",
	"Backlog directory, config file, optional agent instruction files, and optional git commit":
		"backlog 目录、配置文件、可选的 Agent 说明文件和可选的 git 提交",
	"Creates a decision markdown file; sections not given are empty": "创建决策 Markdown 文件；未指定的章节为空",
	"Creates a document markdown file under the configured docs directory": "在配置的文档目录下创建文档 Markdown 文件",
	"Creates a milestone markdown file in the active milestones directory": "在活动里程碑目录下创建里程碑 Markdown 文件",
	"Creates a task or draft markdown file through Backlog.md": "通过 Backlog.md 创建任务或草稿 Markdown 文件",
	"Creates or updates the managed Backlog.md CLI nudge in selected instruction files; preserves existing content outside the managed block":
		"在选中的说明文件中创建或更新受管理的 Backlog.md 命令行提示；保留受管理区块以外的原有内容",
	"Interactive configuration updates when run without a subcommand": "不带子命令运行时进行交互式配置修改",
	"Moves a milestone file into the archived milestones directory": "把里程碑文件移入已归档里程碑目录",
	"Moves an archived decision's file, unchanged and under the same name, from backlog/archive/decisions back to backlog/decisions. It keeps its ID and is listed again. A file of that name already in backlog/decisions is never replaced. No task or draft is changed.":
		"把已归档决策的文件原样、按同名从 backlog/archive/decisions 移回 backlog/decisions。它保留原 ID 并重新出现在列表中。backlog/decisions 中已存在的同名文件不会被覆盖。不会改动任何任务或草稿。",
	"Moves an archived document's file, unchanged, from backlog/archive/docs back to the same relative path under backlog/docs. It keeps its ID and can be listed, searched and updated again. A file already at that path is never replaced. No task or draft is changed.":
		"把已归档文档的文件原样从 backlog/archive/docs 移回 backlog/docs 下的同一相对路径。它保留原 ID，可再次列出、搜索和更新。该路径上已存在的文件不会被覆盖。不会改动任何任务或草稿。",
	"Moves an archived task back to the board with the same ID and the status it had. Archived tasks are read-only, so restore a task before editing it. A task that is already on the board is left as it is.":
		"把已归档任务恢复到看板，保留原 ID 和原状态。已归档任务为只读，因此编辑前需要先恢复；已在看板上的任务保持不变。",
	"Moves the decision's file, unchanged and under the same name, to backlog/archive/decisions. Its ID stays reserved. The decision becomes read-only and leaves decision list and search. No task or draft is changed.":
		"把决策文件原样、按同名移入 backlog/archive/decisions。其 ID 仍被占用。该决策变为只读，并从决策列表和搜索中移除。不会改动任何任务或草稿。",
	"Moves the document's file, unchanged, to the same relative path under backlog/archive/docs. Its ID stays reserved. The document stays viewable with doc view, becomes read-only, and leaves doc list and search. No task or draft is changed.":
		"把文档文件原样移到 backlog/archive/docs 下的同一相对路径。其 ID 仍被占用。该文档仍可用 doc view 查看，但变为只读，并从文档列表和搜索中移除。不会改动任何任务或草稿。",
	"Moves the milestone file to the archived milestones directory and may clear or reassign local tasks":
		"把里程碑文件移入已归档里程碑目录，并可能清除或重新分配相关本地任务",
	"Moves the task off the board into the archive. Its ID stays reserved, and its record, dependencies, and references are kept; no other task is changed.":
		"把任务从看板移入归档。其 ID 仍被占用，记录、依赖和引用都会保留；不会改动其他任务。",
	"None; this is a read-only command": "无；这是只读命令",
	"Permanently removes an archived decision's file from backlog/archive/decisions; a file that is a symbolic link is removed as a link. A decision must be archived first (backlog decision archive). There is no prompt. Its ID is released once no other file and no committed file on any branch still uses the number. No task or draft is changed.":
		"从 backlog/archive/decisions 永久删除已归档决策的文件；符号链接按链接删除。决策必须先归档（backlog decision archive）。不会弹出确认。当没有任何其他文件、也没有任何分支上的已提交文件占用该编号时，ID 会被释放。不会改动任何任务或草稿。",
	"Permanently removes an archived document's file from backlog/archive/docs; a file that is a symbolic link is removed as a link. A document must be archived first (backlog doc archive). There is no prompt. Its ID is released once no other file and no committed file on any branch still uses the number. No task or draft is changed.":
		"从 backlog/archive/docs 永久删除已归档文档的文件；符号链接按链接删除。文档必须先归档（backlog doc archive）。不会弹出确认。当没有任何其他文件、也没有任何分支上的已提交文件占用该编号时，ID 会被释放。不会改动任何任务或草稿。",
	"Permanently removes an archived task. Its ID is released once no other branch or worktree still holds the task. Dependencies and references that other tasks and drafts hold to it are removed. A task must be archived first (backlog task archive), and a task whose subtasks still exist, as tasks or as drafts, is not deleted. There is no prompt.":
		"永久删除已归档任务。当没有任何其他分支或工作树仍持有该任务时，ID 会被释放。其他任务和草稿对它的依赖与引用会被移除。任务必须先归档（backlog task archive），且仍存在子任务（任务或草稿形式）的任务不会被删除。不会弹出确认。",
	"Renames the milestone file and, by default, updates matching local task milestone values":
		"重命名里程碑文件，默认同步更新匹配的本地任务里程碑值",
	"Updates document content, metadata, or docs-relative path": "更新文档内容、元数据或 docs 相对路径",
	"Updates draft metadata and structured sections through Backlog.md": "通过 Backlog.md 更新草稿元数据和结构化章节",
	"Updates named decision fields and updated_date when the record changes; preserves other content":
		"更新指定的决策字段，记录变化时更新 updated_date；保留其他内容",
	"Updates task metadata and structured task sections through Backlog.md": "通过 Backlog.md 更新任务元数据和结构化章节",
	"Updates the project Backlog.md configuration file": "更新项目的 Backlog.md 配置文件",
	"With --fix, atomically renames duplicate task files and updates only their frontmatter IDs; ambiguous references are reported for human review. Archived task files stored outside the archive folder are then moved into it without changing IDs or replacing files":
		"使用 --fix 时原子地重命名重复的任务文件，只更新其 frontmatter 中的 ID；有歧义的引用会被报告以便人工核对。随后把存放在归档目录之外的已归档任务文件移入归档目录，不改变 ID、也不覆盖文件",
	"All public configuration values": "全部公开的配置项",
	"Archive confirmation text": "归档确认文本",
	"Archive confirmation text, followed by the tasks and drafts whose documentation list names the moved file":
		"归档确认文本，随后列出其关联文档列表引用了该文件的文档和草稿",
	"Confirmation of the updated config value": "更新后配置项的确认信息",
	"Created decision ID": "新建决策的 ID",
	"Created document ID and path": "新建文档的 ID 和路径",
	"Created milestone title and ID": "新建里程碑的标题和 ID",
	"Created task details; use --plain for text output": "新建任务的详情；用 --plain 输出纯文本",
	"Delete confirmation text, followed by the tasks and drafts that lost a dependency or reference":
		"删除确认文本，随后列出因此失去依赖或引用的任务和草稿",
	"Delete confirmation text, followed by the tasks and drafts whose documentation list names the removed file, by its archive path or by the path it had before it was archived":
		"删除确认文本，随后列出其关联文档列表引用了该文件的任务和草稿（按归档路径或归档前路径匹配）",
	"Document metadata and markdown content": "文档元数据和 Markdown 内容",
	"Duplicate-ID diagnosis for tasks, documents, decisions, and drafts, a deterministic task repair preview, a reference-review report, a report of self-referential and cyclic task dependencies, and the archived task files stored outside the archive folder":
		"任务、文档、决策和草稿的重复 ID 诊断，可复现的任务修复预览，引用核对报告，自引用与循环任务依赖报告，以及存放在归档目录之外的已归档任务文件",
	"ID, title, date, status, replacement link, last update and content; archived records are marked read-only":
		"ID、标题、日期、状态、替换关系、最后更新时间和内容；已归档记录会标记为只读",
	"Initialization summary with selected integration and config; defaults to CLI instructions":
		"包含所选集成方式和配置的初始化摘要；默认使用命令行说明",
	"Interactive cleanup summary. The command asks for an age and a confirmation, so it needs an interactive terminal for both its input and its output; without that it exits non-zero and archives nothing":
		"交互式清理摘要。该命令会询问天数并请求确认，因此输入和输出都需要交互式终端；缺少交互终端时以非零状态退出且不归档任何内容",
	"Interactive file selection followed by created, updated, or unchanged file summary":
		"交互式选择文件，随后给出已创建、已更新或未变化的文件摘要",
	"Interactive task detail view, plain text with --plain, or versioned JSON with --json":
		"交互式任务详情视图；加 --plain 输出纯文本，加 --json 输出带版本的 JSON",
	"Interactive wizard results or subcommand output": "交互式向导的结果或子命令输出",
	"Removal summary and task handling count": "移除摘要和处理的任务数量",
	"Rename summary, task update count, and file move path when changed":
		"重命名摘要、更新的任务数量，以及路径变化时的移动结果",
	"Restore confirmation text": "恢复确认文本",
	"Restore confirmation text, followed by the tasks and drafts whose documentation list names the archive path the file left":
		"恢复确认文本，随后列出其关联文档列表引用了该文件原先归档路径的任务和草稿",
	"The selected configuration value": "所选配置项的值",
	"Updated decision ID": "更新后决策的 ID",
	"Updated document ID and path": "更新后文档的 ID 和路径",
	"Updated draft details; use --plain for text output": "更新后草稿的详情；用 --plain 输出纯文本",
	"Updated task details; use --plain for text output": "更新后任务的详情；用 --plain 输出纯文本",

	// Field type phrases
	"one of": "以下之一",
	"one or more of": "以下一项或多项",
	"configured statuses": "已配置的状态",
	"configured priorities": "已配置的优先级",
	"configured task types": "已配置的任务类型",
	"configured projects": "已配置的项目",
	"no projects configured; add a 'projects:' list to the project config file":
		"未配置项目；请在项目配置文件中添加 'projects:' 列表",

	// Field types
	Assignee: "负责人",
	Boolean: "布尔值",
	"Comma-separated strings": "逗号分隔的字符串",
	"Decision ID": "决策 ID",
	"Docs-relative path": "相对 docs 的路径",
	"Document ID": "文档 ID",
	"Draft ID": "草稿 ID",
	Integer: "整数",
	"Milestone ID or title": "里程碑 ID 或标题",
	Number: "数字",
	"Positive integer": "正整数",
	"Project-relative path": "项目相对路径",
	"Project-root-relative path": "相对项目根目录的路径",
	"Single-line text": "单行文本",
	String: "字符串",
	"String (letters only; default: task)": "字符串（仅限字母；默认：task）",
	"Task ID": "任务 ID",
	"Task IDs": "任务 ID",
	date: "日期",

	// Terminal view footers, help popup and status lines
	" {cyan-fg}[Tab]{/} View | {cyan-fg}[N]{/} New | {cyan-fg}[/]{/} Search | {cyan-fg}[{keys}]{/} Filter | {cyan-fg}[←→/↑↓]{/} Nav | {cyan-fg}[Enter]{/} Details | {cyan-fg}[E/M/A]{/} Edit/Move/Arch | {cyan-fg}[Y]{/} Yank | {cyan-fg}[?]{/} Help | {cyan-fg}[q]{/} Quit":
		" {cyan-fg}[Tab]{/} 视图 | {cyan-fg}[N]{/} 新建 | {cyan-fg}[/]{/} 搜索 | {cyan-fg}[{keys}]{/} 筛选 | {cyan-fg}[←→/↑↓]{/} 移动 | {cyan-fg}[Enter]{/} 详情 | {cyan-fg}[E/M/A]{/} 编辑/移动/归档 | {cyan-fg}[Y]{/} 复制 ID | {cyan-fg}[?]{/} 帮助 | {cyan-fg}[q]{/} 退出",
	" {cyan-fg}[Tab]{/} View | {cyan-fg}[/]{/} Search | {cyan-fg}[{keys}]{/} Filter | {cyan-fg}[↑↓]{/} Nav | {cyan-fg}[E/A]{/} Edit/Arch | {cyan-fg}[Y]{/} Yank | {cyan-fg}[?]{/} Help | {cyan-fg}[q]{/} Quit":
		" {cyan-fg}[Tab]{/} 视图 | {cyan-fg}[/]{/} 搜索 | {cyan-fg}[{keys}]{/} 筛选 | {cyan-fg}[↑↓]{/} 移动 | {cyan-fg}[E/A]{/} 编辑/归档 | {cyan-fg}[Y]{/} 复制 ID | {cyan-fg}[?]{/} 帮助 | {cyan-fg}[q]{/} 退出",
	Filtered: "已筛选",
	"Keyboard Shortcuts": "键盘快捷键",
	" {cyan-fg}[↑↓]{/} Scroll | {cyan-fg}[Esc/q]{/} Close Help": " {cyan-fg}[↑↓]{/} 滚动 | {cyan-fg}[Esc/q]{/} 关闭帮助",
	" {cyan-fg}[Esc/q]{/} Close Help": " {cyan-fg}[Esc/q]{/} 关闭帮助",
	"Switch View (Kanban/List)": "切换视图（看板/列表）",
	"Create a task": "新建任务",
	"Search tasks": "搜索任务",
	"Filter by Type": "按类型筛选",
	"Filter by Project": "按项目筛选",
	"Filter by Priority": "按优先级筛选",
	"Filter by Milestone": "按里程碑筛选",
	"Filter by Labels": "按标签筛选",
	"Filter by Status": "按状态筛选",
	"Navigate columns": "切换列",
	"Navigate tasks": "切换任务",
	"View task details": "查看任务详情",
	"Edit task": "编辑任务",
	"Move tasks (Shift+M selects more in move mode)": "移动任务（移动模式下 Shift+M 可多选）",
	"Archive task": "归档任务",
	"Yank (Copy) task ID": "复制任务 ID",
	"Hide/show empty columns": "隐藏/显示空列",
	"Show this help menu": "显示此帮助菜单",
	"Quit / Close": "退出 / 关闭",
	"Switch between list and details": "在列表与详情之间切换",
	"Focus task details": "聚焦任务详情",
	"Loading tasks": "正在加载任务",
	"No tasks found.": "没有找到任务。",
	"No tasks available for the Kanban board.": "看板没有可显示的任务。",
	"No config found": "未找到配置",
	"Failed to open editor.": "打开编辑器失败。",
	"Failed to copy to clipboard": "复制到剪贴板失败",
	"Clear filters before moving tasks.": "移动任务前请先清除筛选。",
	"No task to select here.": "这里没有可选的任务。",
	"Hiding empty columns": "已隐藏空列",
	"Showing empty columns": "已显示空列",

	"Set BACKLOG_LANG=zh-CN for Simplified Chinese output. Only human-readable text changes; task data, JSON output and exit codes stay the same.":
		"设置 BACKLOG_LANG=zh-CN 可输出简体中文。只有面向人的文字会改变；任务数据、JSON 输出和退出码保持不变。",

	// Terminal filter header labels
	"Search:": "搜索：",
	"Status:": "状态：",
	"Type:": "类型：",
	"Project:": "项目：",
	"Priority:": "优先级：",
	"Milestone:": "里程碑：",
	"Labels:": "标签：",
	All: "全部",
	"No milestone": "无里程碑",
	"{count} selected": "已选 {count} 项",
	Filters: "筛选",
};
