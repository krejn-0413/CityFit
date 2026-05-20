Overview
SurveyPro 的网页端设计语言以「沉浸式答卷体验」为核心，将界面退居幕后，让题目与选项成为焦点。全站采用深灰色画布，页面被划分为全宽区块，每个区块承载一组题型或流程步骤，区块之间以微妙的亮度变化自然分隔。所有交互元素由统一的明亮金黄色驱动，视觉节奏安静、克制，没有多余的装饰性元素。整体氛围兼具科技感与亲和力，特别为年轻用户群体打造，确保他们在填写问卷时专注、放松，不会有传统表单的压迫感。

问卷界面由三类核心表面构成：

深灰底色区块（问题展示区），

稍亮的卡片区（选项卡片与进度卡片），

亮金点缀的交互元素（按钮、选中态、进度条）。

布局密度较低，每屏通常只展示一道题或一组短问题，留白充足。卷动节奏平稳，区块交替使用不同深度的深灰色形成视觉韵律，不依赖边框或阴影划分区域。唯一的「高度」来自卡片浮起效果，用于表示可交互选项的选中或悬停状态。整个系统以一种设计语言贯穿欢迎页、答题页、提交确认页等所有问卷表面。

核心特征：

题目优先：深色背景下白色或浅灰色文字，确保高可读性。UI 收敛，让用户专注于题目。

深灰底色 + 微度亮度变化的区块交替：#1a1c20 ↔ #21242a ↔ #181a1f，以颜色本身作为区块分隔。

单一强调色：明亮金黄色（#F0B90B）承载所有可点击元素、选中态、进度指示，无第二品牌色。深色环境下依然醒目且不刺眼。

按钮语法：主要操作为金黄色圆角胶囊按钮，次要操作为浅灰色描边胶囊。

字体系统：全局使用宋体（SimSun），标题与题目保持一定加粗，正文轻盈。为符合年轻化审美，字号适当放大，字间距宽松。

柔和阴影仅用于浮出层：选项卡片在选中或获取焦点时使用一层微弱的金黄色光晕，表示「被举起」，其余区域均为平面。

导航极简：顶部仅保留进度条和最小化操作栏，移动端收折为汉堡图标。

页面节奏：欢迎页（深灰区块）→ 题目区块（交替深浅灰）→ 提交区块（深灰带金黄点缀）→ 致谢页脚（浅灰），形成可预期的视觉流。

Colors
色彩系统统一应用于所有问卷表面和状态。基于深灰色调背景，强调色为明亮的金黄色，辅以中性灰白文字。

品牌与强调色

Action Gold（colors.primary — #F0B90B）：唯一的品牌级交互色。用于所有主按钮、选中态边框、进度条填充、链接和聚焦环。在深色背景上具有极强的识别度，且不刺眼。按压状态略微加深为 #d4a30a。

Focus Gold（colors.primary-focus — #F7CC3A）：比 Action Gold 稍亮的变体，专门用于键盘焦点环（outline: 2px solid），确保焦点可见。

Accent Gold on Dark（colors.primary-on-dark — #FFF2CC）：用于深色表面上的文字链接或内联强调，比纯金黄色更浅，保证文字可读性。

表面色

Canvas Deep（colors.canvas-deep — #1a1c20）：主背景色，深灰画布。用于整个页面底色及主要问题区块。

Canvas Dark Alt（colors.canvas-dark-alt — #21242a）：稍亮的深灰，用于交替区块或卡片背景，以微妙的亮度变化代替边框分割。

Canvas Darker（colors.canvas-darker — #141619）：更深的灰，用于页脚或次要区块底部，营造下沉感。

Surface Card（colors.surface-card — #2a2d35）：选项卡片、信息卡片的默认背景，轻浮于画布之上。

Surface Card Elevated（colors.surface-card-elevated — #32353f）：卡片选中或悬停时的微提亮背景，配合金黄色边框形成浮起效果。

Pure Black（colors.surface-black — #000000）：仅在极端强调区域或特定动效背景中使用，常规界面避免纯黑。

文本色

Primary Text（colors.text-primary — #FFFFFF）：标题、题目文字，纯白，在深灰背景上清晰有力。

Body Text（colors.text-body — #E0E0E0）：正文与选项文字，轻微降低对比度，适合长时间阅读。

Muted Text（colors.text-muted — #9B9B9B）：辅助说明、计量文字、提示信息使用，保持低调。

Disabled Text（colors.text-disabled — #6B6B6B）：禁用状态文字。

分隔线与描边

Divider Subtle（colors.divider-subtle — #2F323A）：区块之间或卡片内部分隔的 1px 线条，几乎融入背景。

Border Card（colors.border-card — #3A3D47）：卡片默认描边，用于定义选项卡片边界。

Border Active（colors.border-active — #F0B90B）：选项选中时的金黄色描边， 2px 宽，清晰标识当前焦点。

特殊渐变
无装饰性渐变。仅在进度条或按钮上使用平坦色彩。如果需要氛围感，通过摄影或插画素材本身提供，不在 CSS 中生成渐变。

Typography
问卷调查场景对字体可读性要求极高，同时需保持年轻现代的调性。因此选择宋体（SimSun）作为主打字体，利用其优雅的笔画结构和良好的屏幕表现力，在深色背景下营造出稳重、清晰又不失品味的阅读体验。西文数字及标点回退至系统宋体或 Georgia 等衬线体，保持视觉统一。

字体族

主字体：SimSun, "宋体", STSong, Georgia, "Times New Roman", serif

数字与英文：在宋体中数字通常采用等宽或半等宽样式，若需强调数据可使用 "SimSun", monospace 栈。

备选方案：在非 Windows 平台上可使用 "Noto Serif SC"（思源宋体）作为近似替代，以保持气质一致。

字号与字重
由于宋体在小字号下笔画较细，问卷中所有正文与选项字号不应低于 16px，并适当加粗标题。

Token	Size	Weight	Line Height	Letter Spacing	用途
typography.hero-title	32px	700	1.2	0	欢迎页主标题、提交成功大标题
typography.section-title	24px	700	1.3	0.02em	分节标题、题型大类标题
typography.question	20px	600	1.5	0.01em	问卷题目正文
typography.body	17px	400	1.6	0	辅助说明、段落描述
typography.option	17px	400	1.4	0	单选题/多选题选项文字
typography.caption	14px	400	1.4	0.04em	进度指示文字、页码、反馈提示
typography.button-label	16px	500	1.0	0.02em	按钮文字
typography.fine-print	12px	400	1.4	0.04em	协议文本、页脚信息
设计原则

宋体显示时，标题可适当增加字重（600–700），确保深色背景下笔画像素充足。

正文 17px 是基准阅读尺寸，不压至 16px 以下，避免宋体笔画粘连。

字间距略宽松，0.01em–0.02em 的微量正间距让宋体方块字呼吸更均匀。

避免使用斜体；中文宋体原生斜体效果较差，如需强调使用字重变化或颜色区分。

数字与统计信息使用等宽数字特性，但需确保字体支持（SimSun 内置等宽数字）。

Layout
间距系统

基础单位：8px。所有结构性空白均基于 8 的倍数。

Token：spacing.xs 4px · spacing.sm 8px · spacing.md 16px · spacing.lg 24px · spacing.xl 32px · spacing.xxl 48px · spacing.section 64px。

问题区块垂直内边距：spacing.section（64px）上下；各区块无缝衔接，通过背景色变化自然分隔。

卡片内边距：spacing.lg（24px）。

按钮内边距：垂直 12px，水平 24px，保证良好的触摸区域。

网格与容器

最大内容宽度：720px，使问卷内容在宽屏幕上居中聚焦，两侧留白自动扩展。

单列布局：题目与选项垂直排列，避免视线左右跳跃。

选项卡片网格：对于少量选项（2-4 个），采用单列或双列并排（间距 16px），确保每个卡片有足够空间。

进度条位于顶部，始终占满容器宽度。

留白哲学
每个问题区块的题目上方保留至少 spacing.xl（32px）的空白，选项区域下方同样留出 spacing.xl，使题目“漂浮”在页面中央。选项卡片之间垂直间距 spacing.md（16px），既划分清晰又不至于松散。整体密度远低于传统表单，强调一次只做一件事的心流。

Elevation & Depth
问卷调查界面极少使用物理阴影，以避免干扰注意。深度主要通过亮度和描边变化传达。

层级	处理方式	用途
基底	无阴影，#1a1c20 背景	页面背景，非交互文字
浮起卡片	默认 surface-card 背景 + border-card 描边	未选中选项卡片
选中卡片	surface-card-elevated 背景 + border-active 描边 + 极微弱的 box-shadow: 0 0 8px rgba(240,185,11,0.25)	当前选中或获得焦点的选项卡片，产生轻微发光浮起效果
弹窗/对话框	背景 surface-card，叠加一层 rgba(0,0,0,0.5) 遮罩，弹窗本身带 box-shadow: 0 8px 24px rgba(0,0,0,0.4)	模态确认弹窗、提交成功弹窗
原则： 金黄色光晕是唯一允许的阴影，且仅赋予当前活跃的选项卡片，代表“被点亮”。其余所有界面元素保持平面。区块分隔依靠背景色差，不使用边框或分割阴影。

Shapes
圆角

rounded.none — 0px：全宽背景区块。

rounded.sm — 8px：小型标签、进度条轨迹。

rounded.md — 12px：选项卡片、信息卡片。

rounded.lg — 18px：弹窗、对话框。

rounded.pill — 9999px：主要操作按钮、进度条填充条、多选标签。

摄影与图像
问卷中可能使用插画或象征性图标，而非摄影。图标风格为线性金色或白色，轮廓清晰，置于卡片或欢迎区块中。产品相关图片（如礼物、兑换图示）可选用方形浅色背景卡片，带有 rounded.md 圆角，内部图像居中。

Components
Top Bar & Progress
top-bar — 固定在页面顶部的极简导航栏，高度 56px，背景 canvas-deep，下边缘带 divider-subtle 分界线。中央或左侧显示问卷标题（typography.section-title 缩小版），右侧放置最小化菜单按钮（金色图标）。不显眼的返回/退出按钮位于左侧。

progress-indicator — 紧贴顶部栏下方的进度指示器，高度 4px。轨道为 canvas-dark-alt，填充为 colors.primary（金黄色）。进度文字（如“第3题/共10题”）可根据需要显示在进度条右侧或下方，使用 typography.caption。

Buttons
button-primary — 主操作按钮，用于“下一题”、“提交”等。背景 colors.primary，文字 #1a1c20（深色）以确保对比度，圆角 rounded.pill，内边距 12px × 24px，字体 typography.button-label。悬停/按下时背景加深至 #d4a30a，并应用 transform: scale(0.97) 微交互。

button-secondary — 次要操作，如“上一题”、“跳过”。透明背景，文字 colors.primary，描边 1px solid colors.primary，圆角 rounded.pill。按下时背景变为 colors.primary 在 15% 透明度，文字保持金色。

button-ghost — 纯文字按钮，用于不显眼的操作（如“清空选择”）。文字 colors.text-muted，无背景，悬浮时文字变为 colors.primary。

Option Cards
option-card — 核心交互组件，用于单选题、多选题的选项。背景 surface-card，描边 border-card，圆角 rounded.md，内边距 spacing.lg。内部文字使用 typography.option。支持单行文本或多行描述。卡片宽度填满容器。

option-card-selected — 选中状态：背景提升至 surface-card-elevated，描边变为 border-active（2px 金黄），并启用 box-shadow: 0 0 8px rgba(240,185,11,0.25)。同时在卡片右侧或左侧出现一个金黄色勾选图标，增强识别。

option-card-multi — 多选标签式选项：以圆角小胶囊形式呈现（rounded.pill），选中时变为黄色填充，文字变深色。

Question Blocks
question-block-light — 主问题区块，背景 canvas-deep，垂直内边距 spacing.section。内含题目（typography.question）和一组选项卡片。

question-block-alt — 交替区块，背景 canvas-dark-alt，其余相同，用于分隔不同题型或分页，让节奏出现微差。

question-block-darker — 特殊题型（如矩阵题）或提示区域，背景 canvas-darker，常配合小型说明文字。

Text Input
text-input — 开放式问题输入框。背景 surface-card，文字 text-body，边框 1px solid border-card，圆角 rounded.md，内边距 spacing.md。聚焦时边框变为 border-active，无外部光晕。占位符颜色 text-muted。

Modal
modal — 用于提交确认或重要提示。背景 surface-card，圆角 rounded.lg，内边距 spacing.xl，居中最大宽度 480px。标题 typography.section-title，正文 typography.body，操作按钮组合置于底部。遮罩层为 rgba(0,0,0,0.6)。

Footer
footer — 问卷结束后的感谢页脚，背景 canvas-darker，文字 text-muted。链接颜色 colors.primary。布局简洁，居中放置品牌、隐私声明等，使用 typography.fine-print。

Responsive Behavior
断点

手机竖屏（< 640px）：选项卡片单列堆叠，问题字号 18px，顶部栏高度 48px，进度条厚度 4px。

手机横屏 / 小平板（640px - 834px）：最大内容宽度 640px，单列布局，两侧留白适度。

平板（834px - 1024px）：选项卡片可双列展示（针对 2-4 个选项的题目），卡片间距加大。

桌面（≥ 1024px）：内容区锁定 720px 居中，题目字号及留白达到设计最大值。

触摸目标
所有可点击元素最小高度 48px，选项卡片默认内边距已满足。进度条本身不可交互。

收缩策略

顶部栏在手机端保留进度条，标题可简化或隐藏。

选项卡片从不改变基本结构，仅调整宽度和间距。

模态框在移动端采用全屏或接近全屏样式。

Do's and Don'ts
Do

让金黄色（#F0B90B）成为唯一交互信号，所有可点击、可选中元素都使用它或其浅色变体。

题目使用 20px 宋体加粗（600），确保深灰背景上的清晰度。

利用区块背景微差（#1a1c20 ↔ #21242a）制造页面节奏，而非添加分隔线。

选项卡片选中态严格使用金黄描边 + 微弱光晕，强化「一道题点亮一个卡片」的直觉。

按钮圆角坚持 rounded.pill 胶囊形，构建统一的行动语言。

进度条使用金黄填充，与操作按钮色彩呼应。

所有正文至少 16px，尊重宋体屏幕呈现。

Don't

不要引入第二种强调色，金黄是唯一。交互反馈不依赖红/绿。

不要对卡片和文字加大面积阴影；深度仅由颜色和描边表达。

不要使用渐变背景或装饰性纹理。

不要将宋体用于超小字体（<12px），也不要使用伪粗体，应使用字重文件（如 700）。

不要将选项文字弱化到低于 #E0E0E0，保证可读性。

避免过宽的行宽，正文行宽控制在 60 字符以内，选项文字行宽自然流动。

不要在同一界面混合多种圆角风格；卡片统一 rounded.md，按钮统一 rounded.pill。