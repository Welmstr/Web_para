---
name: meoo-design-kungfu
description: "You MUST use this before writing any frontend code for a new project, full-stack app, web page, or any task needing a UI. Matches the best style from 140+ built-in designs (minimalism, glassmorphism, brutalism, neumorphism, cyberpunk, bento grid, apple-style, dark mode, etc.) based on product type, brand tone, and audience. Provides color palettes, component specs, and shadcn/ui + Tailwind CSS guides. 能力: 风格推荐、设计令牌、组件配方、响应式布局、配色方案、评分体系. Projects: SaaS, e-commerce, fintech, edtech, dev tools, AI/ML, Web3, dashboard, admin panel, blog. Triggers: build a web app, create a project, full-stack app, 全栈应用, 搭建项目, 搭建页面, 做个网站, 帮我设计, 设计风格, 设计建议, 推荐风格, design style, UI recommendation, web design, style guide, color scheme, help me design, recommend a design, make it look good, modern UI."
---

# Design Kungfu Skill 🥋

Design Kungfu 帮用户从 140 个精选设计风格中选出最匹配的方案，并产出可直接落地的 shadcn/ui + Tailwind CSS 代码。所有数据离线内置：

- **`database.yaml`** —— 产品类型 / 品牌调性 / 受众 → 风格的映射表
- **`styles/<slug>.md`** —— 140 个风格的 Tailwind token、组件配方、禁用模式（代码生成用）
- **`references/<brand>.md`** —— 53 个品牌的深度叙事设计系统文档（深度参考用）
- **`EXAMPLES.md`** —— 端到端推荐对话示例

## 优先级原则（Override Chain）

本 Skill 在生成设计与代码时始终遵循如下优先级，从高到低：

1. **用户显式指定的字段**——用户在 prompt 里明确提到的任何视觉属性（具体色值、字体家族、圆角半径、阴影层级、动效类型与时长、布局结构等）视为**不可覆盖的硬约束**
2. **用户点名的品牌 / 风格**——若用户指名"像 Linear"、"用 Bento Grid"之类的参考，对应的 `references/<brand>.md` 或 `styles/<slug>.md` 作为**骨架参考**，但仅用于填补第 1 项未覆盖的字段
3. **智能默认**——用户未指定、也未点名品牌的字段，使用 `database.yaml` 打分胜出的风格的 tokens 作为合理默认

**核心语义**：style / references 文档**只填补用户未说的字段，不覆盖用户说过的任何内容**。任何冲突永远以用户为准。

**字段级合并（而非整块替换）**：例如用户说"参考 Linear，主色用深蓝"——Linear 的排版、间距、圆角、阴影 tokens 全部沿用，**只把 Linear 原本的紫色强调色替换为用户要的深蓝**，不做整体换风格，也不反过来让 Linear 的紫色覆盖用户的深蓝。

**检测顺序**：在进入第一步之前，AI 应先扫描用户 prompt，识别其中已显式指定的视觉字段，作为后续所有决策的顶层约束。

## 工作流程

### 第一步：扫描 prompt，按需追问

在收到用户请求后，**先静默扫描 prompt**（不要把扫描过程展示给用户），识别以下三个维度的信息是否已给出：

- **产品类型**（SaaS / 电商 / 工具类应用 / 作品集 / 官网 / 后台 / 其他）
- **品牌调性**（专业 / 活泼 / 奢华 / 极简 / 大胆 / 科技感 / 温暖 / 其他）
- **视觉约束**（任何具体色值、字体、圆角、动效、布局、点名的参考品牌或风格）

**分流规则**：

| 已明确的维度数 | 行为 |
|---------------|------|
| ≥ 2 维 | **跳过追问**，直接进入第二步 |
| 1 维 | **口语化追问一次**，只问当前最缺的那一项 |
| 0 维（"帮我做个网站"这类） | **一次口语化追问**，问"项目是做什么的？想要什么感觉？" |

**禁止**：

- 禁止塞 5 条清单式问题（"产品类型 / 目标用户 / 品牌调性 / 主要设备 / 特殊要求"）——这是 2.5.0 及之前版本的模式，已废弃
- 禁止对用户已经在 prompt 里说过的维度复读式确认（"你说要做 SaaS 对吧？"）
- 追问的语言要大白话，不用开发者术语（不说"品牌调性"、"目标受众"，说"想要什么感觉"、"给谁用"）

**产品名静默核查**：

若 prompt 里出现具体产品 / 公司 / 品牌名（如 `DJI Pocket 4`、`Linear`、`Notion`、`Vercel`、用户公司名等），AI 在扫描的同时**静默 WebSearch 一次**确认：
- 产品是否存在、最新版本号、关键规格、品牌主色（如能搜到）
- 静默执行——不告诉用户"我在搜"，不打断流程
- 搜到结果直接用作后续设计的事实依据，而不是凭训练记忆假设
- 搜不到 / 结果模糊：在第三步候选展示前的对话里轻问一句，例如"你说的 X 是 [搜到的描述] 这个吗？"——避免基于错误假设产出

**为什么这条规则**：用户提到具体品牌时，AI 凭记忆假设品牌色 / 字体 / 产品形态经常出错（实例：把 Kimi 假设成橙色，实际是 `#1783FF` 蓝；把已发布产品当成"还没发布"做概念稿）。WebSearch 10 秒 << 返工 2 小时。

**追问示例**（对"帮我做个网站"这种零信息 prompt）：

> 这个项目是做什么的？想要什么感觉（商务 / 活泼 / 极简 / 大胆 都行）？

### 第二步：内部打分选出候选（附两条快速通道）

读取 `database.yaml` 的三张表，按以下权重**内部打分**（满分 100）。打分仅用于排序和选出 Top 3，**数字本身不向用户展示**：

| 维度 | 权重 | 评分依据 |
|------|------|----------|
| 产品类型匹配 | 40 | `product_types[<type>]` 中 primary 计 40，secondary 计 25 |
| 品牌调性匹配 | 35 | `brand_moods[<mood>].styles` 命中计 35 |
| 目标受众匹配 | 25 | `audiences[<aud>].styles` 命中计 25 |

未命中维度给该维度的 30%-50% 作为软分（让候选不至于 0 分被淘汰）。三个维度都明确命中的风格自然排到前面。

**两条快速通道**（命中则跳过第三步，直接进入第五步）：

1. **用户显式指定了风格**——用户用了"用 Linear 风格做"、"按 Apple 那一套来"、"make it like X"这类**指令性措辞**点名了风格/品牌，视为用户已选，不再展示候选
2. **用户视觉字段高覆盖**——依 Override Chain 的扫描结果，用户已**以精确值**锁定 **≥ 3 项**关键视觉字段（色值 / 字体 / 圆角 / 阴影 / 动效 / 布局结构），此时展示候选已无意义；仅把打分最高的风格作为组件骨架参考

**"精确值"判定**：
- ✅ 精确值：`#00F2FF`、`Manrope`、`rounded-3xl`、`scale(1.05) 200ms ease-out`、"三栏卡片网格 1200px 居中"——AI 无需额外选择即可直接写进代码
- ❌ 方向性描述：`青色`、`无衬线`、`大圆角`、`加点动效`、"现代布局"——方向明确但具体值仍需 AI 决策，应走第三步正常流程

**计数规则**：同一字段只计 1 次（给了 `#0A0A0A` 又给了 `#FFFFFF` 仍算色值 1 项）；方向性描述不计入 ≥ 3 项；用户点名了参考品牌但未给精确值的字段，由品牌 tokens 填补、**不计入**本通道的字段数。

其他情况（用户给了调性但未锁风格、或只用"参考 X"软性提及品牌、或只给了方向性描述）——走第三步正常推荐流程。

### 第三步：展示 3 个候选，让用户选

展示**3 个**（不是 3-5 个）内部打分最高的风格，用下面这种口语化卡片格式：

```
给你挑了 3 个最合适的风格，选一个我就开始做：

1️⃣ {风格名}
   特点：{一句话讲这个风格长什么样、给人什么感觉}
   为什么适合你：{一句话讲它为什么跟你的项目契合}

2️⃣ {风格名}
   特点：...
   为什么适合你：...

3️⃣ {风格名}
   特点：...
   为什么适合你：...

回复 1 / 2 / 3 或直接说风格名就行。
```

**格式规则**：

- **禁用 ASCII 盒子框**（`┌──┐`、`│`、`├──┤`）——对小白用户是视觉噪音
- **禁止展示数字评分**（"93/100"、"40/40"、"★★★★★"）——打分是内部逻辑，用户不需要看
- **只给 3 个候选**，不多不少（候选过多增加选择焦虑）
- 每个候选**固定两行**：`特点` + `为什么适合你`，不加第三行

**语言规则（仅约束本步卡片文案，不影响第五步代码生成里的 Tailwind class）**：

- **禁用开发者术语**：`Geist`、`tracking-tight`、`hex`、`token`、`Tailwind class`、`WCAG`、`primary / secondary` 等不出现在卡片里
- **"特点"一行 ≤ 25 字**，用大白话描述"长什么样、给人什么感觉"，可以说"像 Linear 那种"、"类似 Apple 官网"，但不要展开细节
- **"为什么适合你"一行 ≤ 30 字**，聚焦在项目契合度（不是风格本身）
- 结尾一句**口语引导**（"回复 1 / 2 / 3 或直接说风格名就行"），不用"请选择"这种书面语

**好示例**（用户 prompt："我要做一个极简 SaaS 官网"）：

```
给你挑了 3 个最合适的风格，选一个我就开始做：

1️⃣ Vercel 风格
   特点：黑白为主、大号字号、充足留白，技术味浓
   为什么适合你：极简 SaaS 官网的标杆调性，一眼就显得很专业

2️⃣ Linear 风格
   特点：清爽现代，深色配紫色强调，项目管理软件的感觉
   为什么适合你：目标用户偏专业人士时，既冷静又有设计感

3️⃣ Minimalist Flat 风格
   特点：纯色块、直角设计、零装饰
   为什么适合你：比 Vercel 更克制，适合想要非常简单的页面

回复 1 / 2 / 3 或直接说风格名就行。
```

**坏示例**（不要这样写）：

- ❌ "Vercel 风格匹配度 93/100" —— 数字评分不展示
- ❌ "使用 Geist 字体 + `tracking-tight` + `bg-black text-white`" —— 开发者术语
- ❌ "产品类型: 40/40，品牌调性: 33/35" —— 评分维度不展示
- ❌ ASCII 盒子框包裹的任何格式

### 第四步：用户选定后读风格文档

读取对应的风格文档（路径相对于 skill 根目录）：`styles/<slug>.md`，例如 `styles/vercel-style.md`。

每个风格文档包含：设计理念、Design Tokens（精确 Tailwind class）、组件配方、禁用模式、Do's & Don'ts。

**可选的深度参考**：若用户点名的是下列 53 个品牌之一，`references/<brand>.md` 提供 200-500 行的深度叙事版设计系统说明（品牌的色彩哲学、排版规则来源、阴影语言、交互哲学等），适合用户想深入理解品牌视觉语言、做高保真还原、或写设计调研报告时读取：

```
binance, bugatti, clickhouse, cohere, coinbase, composio, elevenlabs, expo,
ferrari, hashicorp, ibm, intercom, kraken, lamborghini, linear-app, lovable,
mastercard, meta, minimax, mintlify, miro, mistral-ai, mongodb, nike, nvidia,
ollama, opencode-ai, pinterest, playstation, posthog, renault, replicate,
resend, revolut, runwayml, sanity, sentry, shopify, spacex, starbucks,
superhuman, tesla, theverge, together-ai, uber, vodafone, voltagent, warp,
webflow, wired, wise, x-ai, zapier
```

完整索引见 `references/README.md`。日常代码生成优先读 `styles/`，深度理解/调研才读 `references/`。

### 第五步：按字段级优先级生成代码

按用户实际需求（落地页、登录页、Dashboard 等）输出 shadcn/ui + Tailwind 代码。生成时严格遵循 Override Chain：

- **用户显式指定**的视觉字段（色值、字体、圆角、阴影、动效、布局结构等）——**以用户给的值为准**，不被风格文档的 tokens 或 forbidden 列表覆盖或限制
- **用户未指定**的字段——精确使用风格文档里的 token 类名作为合理默认，不要发明近似值
- **用户点名品牌 / 风格**的情况——该品牌 / 风格的 tokens 作为骨架，但遇到用户另有显式指定时仍以用户为准（字段级合并）

**轻动效层默认**（除非用户明确要"完全静态"，否则一律带上）：

页面是死的还是活的，是"AI 生成"和"设计过"的最直观区别之一。生成代码时默认包含以下三层动效，让代码不再是死的静态页：

| 动效层 | 默认实现 | Tailwind 写法示例 |
|--------|----------|-------------------|
| **交互反馈**：所有可点击元素 hover 必须有视觉变化 | 颜色 / 透明度 / 缩放 / 阴影任选 | `hover:bg-zinc-900 hover:scale-[1.02]` 或 `hover:opacity-80` |
| **过渡平滑**：所有状态变化加 transition | 默认 `200ms` 时长，缓动用 `ease-out` 或 `cubic-bezier(0.4, 0, 0.2, 1)` | `transition-all duration-200 ease-out` |
| **首屏入场**：hero 区主元素首次加载淡入 / 上滑 | 用 Tailwind animate 或 CSS keyframes，`300-500ms` 时长，`opacity 0→1` + `translate-y-2→0` | `animate-in fade-in slide-in-from-bottom-2 duration-500` |

**例外**：
- 用户显式说"不要动效" / "纯静态" / "做信息图就行" → 全部跳过
- 风格 spec 本身禁用某层（如 Brutalist 风格通常不要平滑过渡，用直接的状态切换）→ 遵守 spec
- 性能敏感的 Dashboard / 数据表格大列表 → 跳过入场动画，保留 hover 反馈

技术栈选择留给用户/项目实际情况，不要硬塞 Next.js 脚手架。

## 风格库

完整列表可查看 `styles/` 目录（140 个文件，每个对应一个 slug）。下面只列代表性的几个，便于 AI 在打分时锚定：

**知名产品系（用户提到具体公司或产品类型时优先）**
Vercel · Linear · Stripe · Supabase · Spotify · Airbnb · Raycast · Claude · Cursor · Figma · Framer · Apple · Notion · BMW · Cal.com · Clay · Airtable

**视觉语言系（按调性挑选）**
Minimalist Flat · Soft UI · Corporate Clean · Swiss Style · Editorial · Neo-Brutalist · Neo-Brutalist Playful · Brutalist Web · Glassmorphism · Neumorphism · Claymorphism · Skeuomorphism · Dark Mode · Cyberpunk Neon · Modern Gradient

**布局系（结构需求驱动）**
Bento Grid · Card Stack · Dashboard Layout · Split Screen · Masonry Flow

## 核心规则

1. **先扫描后追问**——扫描用户 prompt 里已明确的产品类型/调性/视觉约束；≥2 维明确则跳过提问，仅在关键维度缺失时一次口语化追问，禁用 5 问清单
2. **提供 3 个候选**——不多不少 3 个，用"特点 + 为什么适合你"两行卡片格式，让用户挑一个
3. **打分内部化**——风格匹配的数字评分（93/100、40/40 等）仅用于内部排序，不展示给用户
4. **优先 shadcn/ui + Tailwind**——除非用户指定其他技术栈
5. **字段级优先级（Override Chain）**——用户显式指定的视觉字段不可被 style / references 文档覆盖；风格 tokens 仅作为用户未指定字段的合理默认
6. **一致的视觉语言**——一个项目里所有组件遵循同一风格
7. **面向小白用户的语言**——所有对用户可见的文案用大白话，禁用开发者术语（token、hex、Tailwind class、WCAG 等）；开发者术语仅允许出现在第五步生成的代码里

## AI 输出规则

生成代码时：

- **用户未指定的字段**：精确使用风格文档里的 Tailwind class，不要发明近似值
- **用户已指定的字段**（色值/字体/圆角/阴影/动效等）：以用户给的值为准，不被风格文档的 forbidden 列表限制——若用户明确要求的样式恰好在 forbidden 里，应输出用户要的值并可选简短提示"此写法在 X 风格的通用规范中不推荐，但遵从你的指定"
- 遵循组件配方的参数化模板，而不是临时拼凑
- 响应式：移动端 / 平板 / 桌面端体验一致
- 可访问性：色彩对比度符合 WCAG 2.1 AA
- 引用风格时给出文件路径（如 `styles/vercel-style.md`），方便用户进一步查看

### 反 AI slop 黑名单（默认禁用，除非风格 spec 或用户显式要求）

"AI slop" 指 AI 训练语料里最常见的"视觉最大公约数"——它们不丑，但因为太常见，会让用户的产品看起来像"又一个 AI 做的页面"，**没有任何品牌识别度**。规避 slop 不是审美洁癖，是替用户保护品牌识别度。

| 元素 | 为什么是 slop | 例外（合法使用） |
|------|---------------|------------------|
| **激进紫渐变** （`from-purple-500 to-pink-500` 之类）作通用背景 | SaaS / AI / Web3 落地页千篇一律的"科技感"万能公式 | 风格 spec 本身用紫渐变（如 Linear 某些场景）；用户显式要求 |
| **Emoji 当 UI 图标** | "不够专业就用 emoji 凑"的偷懒症，每个 bullet 配 🚀✨💡 是 AI 标志 | 品牌本身用（如 Notion）；产品受众是儿童 / 轻松场景 |
| **圆角卡片 + 左侧彩色 border accent** （`border-l-4 border-blue-500`）| 2020-2024 Material/Tailwind 模板烂大街组合，已成视觉噪音 | 风格 spec 明确保留 |
| **SVG 手画人物 / 物品 / 复杂插画** | AI 画的 SVG 五官永远错位、比例诡异 | 几乎没有——有图就用真图，没图就留诚实 placeholder |
| **`Inter` / `Roboto` / `Arial` / `system-ui` 作 display 字体** | 太常见，看不出"这是设计过的产品"还是"demo 页" | 风格 spec 明确指定（如 Stripe 用调过的 Inter 变体） |
| **`#0D1117` 深蓝 + 霓虹绿 / 紫赛博底** | GitHub dark mode 美学的烂大街复制 | 用户明确做开发者工具且品牌走 GitHub 调性 |
| **数据 slop**：装饰性数字 / stats / "10K+ 用户" | 没数据时编造看起来像数据的假数据，比留白还丑 | 用户给了真实数据 |
| **图标 slop**：每个标题前都配 icon | 给空白塞 icon 当装饰，icon 没 earn its place | icon 本身承担信息功能（如分类标签） |

**判断边界**：风格 spec 里**明写**用紫渐变 / Inter 字体 / 圆角左 accent 时，那不再是 slop——它是品牌签名。例外只认"风格 spec 写了"或"用户显式说要"，AI 自己想加是 slop。

### 图片诚实性

需要图片时，先问自己**"如果去掉这张图，信息是否有损？"**：

| 场景 | 判断 | 动作 |
|------|------|------|
| 文章列表封面、Profile 页风景头图、设置页装饰 banner、空白处的"灵感图" | ❌ 装饰，与内容无内在关联 | **不要加**——加了就是 AI slop，等同紫渐变 |
| 产品详情的实物渲染图、博物馆的展品照、地图卡片的地点照、人物详情的肖像 | ✅ 内容本身，有内在关联 | **必须加**——找真实图源（官方 / Wikimedia / Unsplash 等），找不到就用诚实 placeholder |
| 极淡的氛围背景纹理（不抢内容） | ⚠️ 服从内容不抢戏 | 加，但 `opacity ≤ 0.08` |

**找不到真图时的兜底**：
- ✅ 用诚实 placeholder：`<div class="bg-zinc-200 aspect-video flex items-center justify-center text-zinc-500">[产品截图位 · 待补]</div>` ——明确告诉用户这里需要他提供
- ❌ 不要画 SVG 假人脸 / 假产品图 / 假 logo
- ❌ 不要从 Unsplash 抓"灵感图"硬塞（除非内容确实需要那张图）

**核心原则**：在 hi-fi 设计里，**一个诚实的 placeholder 比一个拙劣的真实尝试好 10 倍**。

---

**版本**：2.7.0 · 140 个精选风格 + 53 个品牌深度参考内置，离线可用
