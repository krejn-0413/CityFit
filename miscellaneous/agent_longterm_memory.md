# CityFit 城宜 — 项目架构全景记忆

> 本文档为 AI 助手与开发者共享的项目级长期记忆，涵盖架构设计、技术栈、模块划分、数据流、目录结构、开发流程等核心信息，帮助快速理解项目并有效贡献代码。

---

## 一、项目概览

| 项目 | 内容 |
|------|------|
| **项目名称** | CityFit 城宜 |
| **项目定位** | 趣味城市人格测试 SPA（Single Page Application） |
| **核心功能** | 18 道趣味问答 + 八字玄学分析，匹配用户与 32 座中国城市的契合度 |
| **部署方式** | GitHub Pages 静态部署 |
| **项目类型** | 纯前端应用，无后端服务、无数据库 |
| **入口文件** | `index.html` → `src/main.ts` → `src/App.vue` |

---

## 二、整体架构设计

### 2.1 架构模式：单页应用（SPA）

```
┌─────────────────────────────────────────────────────────┐
│                    index.html                           │
│                     ┌───────┐                           │
│                     │ App.vue│  (router-view)           │
│                     └───┬───┘                           │
│                         │                               │
│          ┌──────────────┼──────────────────┐            │
│          ▼              ▼                  ▼            │
│    ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │
│    │ HomePage │  │ InfoPage │  │    QuizPage      │    │
│    │  (首页)   │  │ (信息页)  │  │  (答题页)         │    │
│    └──────────┘  └──────────┘  └────────┬─────────┘    │
│                                         │              │
│                                         ▼              │
│                              ┌────────────────────┐    │
│                              │    ResultPage      │    │
│                              │  (结果页 + 地图)    │    │
│                              └────────────────────┘    │
│                                         │              │
│                                         ▼              │
│                              ┌────────────────────┐    │
│                              │  PortraitPreview   │    │
│                              │  (AI插画预览页)     │    │
│                              └────────────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Composables (逻辑层)               │   │
│  │  useStore.ts  useBazi.ts  useMatching.ts        │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Components (组件层)                │   │
│  │  ChinaMap.vue  RadarChart.vue  ShareCard.vue   │   │
│  │  CityPersonaImage.vue                          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Data Layer (数据层)                │   │
│  │  cities.ts  questions.ts  types/index.ts        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 架构特点

- **纯前端 SPA**：所有逻辑在浏览器端执行，无后端依赖
- **组件化架构**：基于 Vue 3 组合式 API（Composition API）组织代码
- **Composable 逻辑复用**：核心业务逻辑封装在 `composables/` 目录下的可组合函数中
- **Hash 路由**：使用 `createWebHashHistory()` 路由模式，兼容 GitHub Pages 静态部署
- **无状态后端**：用户数据通过 `sessionStorage` 在页面间传递，刷新即失
- **静态数据驱动**：城市数据、题目数据均为 TypeScript 静态常量，编译时确定

---

## 三、核心技术栈选型

### 3.1 前端框架与工具

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vue 3** | ^3.5.32 | 前端框架，使用 Composition API + `<script setup>` |
| **TypeScript** | ~6.0.2 | 类型安全，所有 `.ts` / `.vue` 文件均使用 TS |
| **Vite** | ^8.0.10 | 构建工具，开发服务器 + 生产构建 |
| **Vue Router** | ^4.6.4 | 前端路由，Hash 模式 |
| **Tailwind CSS** | ^3.4.19 | 原子化 CSS 框架，配合 PostCSS |
| **PostCSS** | ^8.5.13 | CSS 后处理器，配合 Autoprefixer |
| **vue-tsc** | ^3.2.7 | TypeScript 类型检查（构建时） |

### 3.2 第三方库

| 库 | 版本 | 用途 |
|----|------|------|
| **ECharts** | ^6.0.0 | 中国地图可视化 + 雷达图 |
| **html2canvas** | ^1.4.1 | 生成分享卡片截图 |
| **@vitejs/plugin-vue** | ^6.0.6 | Vite 的 Vue 3 插件 |
| **@vue/tsconfig** | ^0.9.1 | Vue 官方 TS 配置预设 |
| **Autoprefixer** | ^10.5.0 | CSS 浏览器前缀自动补全 |

### 3.3 关键说明

- **无后端 / 无数据库**：项目为纯静态 SPA，所有数据（城市、题目、八字算法）均在客户端
- **无状态管理库**：未使用 Pinia/Vuex，使用 `sessionStorage` + `reactive()` 组合管理状态
- **无 UI 组件库**：所有 UI 组件（按钮、卡片、表单）均为手写 Tailwind CSS 样式
- **无测试框架**：项目当前未配置单元测试或 E2E 测试

---

## 四、关键业务模块划分

### 4.1 模块总览

```
┌────────────────────────────────────────────────────────────┐
│                     CityFit 业务模块                         │
├───────────┬───────────┬───────────┬───────────┬────────────┤
│  首页模块  │  信息采集  │  答题模块  │  结果展示  │  插画预览   │
│  HomePage │  InfoPage │  QuizPage │ ResultPage│PortraitPrev│
├───────────┼───────────┼───────────┼───────────┼────────────┤
│ 品牌展示   │ 出生日期   │ 18道题目   │ Top3城市   │ 32城×1人格 │
│ 入口引导   │ 出生时间   │ 进度条    │ 雷达图    │ AI插画展示  │
│ 特性卡片   │ 性别选择   │ 选项选择   │ 八字分析   │ 画像组件   │
│           │ 表单验证   │ 自动跳转   │ 中国地图   │            │
│           │           │           │ 小队系统   │            │
│           │           │           │ 分享功能   │            │
└───────────┴───────────┴───────────┴───────────┴────────────┘
```

### 4.2 模块详细说明

#### 4.2.1 首页模块（HomePage.vue）

- **功能**：品牌展示、应用入口、特性介绍
- **交互**：点击"测一测你的本命城市"按钮 → 跳转 `/info`
- **视觉**：浮动装饰 emoji、渐变背景、毛玻璃卡片、动画效果
- **路由**：`/`（name: `home`）

#### 4.2.2 信息采集模块（InfoPage.vue）

- **功能**：收集用户出生日期、出生时间（选填）、性别
- **交互**：三个下拉选择器（年月日）+ 两个下拉选择器（时分）+ 性别按钮
- **验证**：日期有效性校验（闰年、每月天数）、性别必选
- **数据存储**：写入 `sessionStorage.cityfit.userInfo`
- **路由**：`/info`（name: `info`）

#### 4.2.3 答题模块（QuizPage.vue）

- **功能**：18 道选择题，每题 4 个选项
- **题目分类**：`material`（物质生活）、`spiritual`（精神追求）、`xuanxue`（玄学倾向）
- **交互**：点击选项自动进入下一题，支持上一题/下一题导航
- **进度**：顶部进度条 + 题号显示
- **提交**：最后一题选择后自动提交，计算八字 + 匹配结果
- **数据存储**：写入 `sessionStorage.cityfit.results`
- **路由**：`/quiz`（name: `quiz`）

#### 4.2.4 结果展示模块（ResultPage.vue）

- **功能**：展示 Top 3 城市匹配结果、AI 人格画像、雷达图、八字分析、中国地图、小队系统、分享功能
- **子模块**：
  - **城市人格画像**：显示城市人格标签 + AI 插画
  - **彩蛋模式**：滑动开关切换标准/幽默风格城市人格画像（仅北京/上海/成都支持）
  - **Top 3 城市列表**：匹配度排名，点击查看详情
  - **三维雷达图**：物质/精神/玄学三个维度的城市画像
  - **八字玄学分析**：四柱八字、五行分布、日主分析、喜用神/忌神、夫妻宫
  - **中国地图**：ECharts 地图，标记 Top 3 城市位置
  - **小队系统**：生成小队码，组队后地图合并显示
  - **分享功能**：复制链接分享结果
- **路由**：`/result`（name: `result`）

#### 4.2.5 插画预览模块（PortraitPreview.vue）

- **功能**：展示所有 32 座城市 × 1 人格的 AI 插画
- **用途**：预生成静态画像的展示页面
- **路由**：`/preview`（name: `preview`）

### 4.3 核心算法模块

#### 4.3.1 八字计算（useBazi.ts）

- **功能**：根据出生年月日时计算四柱八字、五行分布、日主、喜用神/忌神、夫妻宫
- **算法来源**：中国传统八字命理学的简化实现
- **核心函数**：
  - `calculateBazi(year, month, day, hour)` → `BaziInfo`
  - `getEnhancedBaziInfo(bazi)` → `EnhancedBaziInfo`（含详细解读）
- **输出**：天干地支、五行元素、日主五行、喜用神列表、忌神列表、夫妻宫解读

#### 4.3.2 城市匹配算法（useMatching.ts）

- **功能**：根据用户答案 + 八字信息计算城市匹配度
- **算法步骤**：
  1. 遍历所有答案，累加每个城市的得分（基于 `questions.ts` 中定义的 scores）
  2. 归一化：将最高分映射为 100 分，其余按比例缩放
  3. 八字加成：城市偏好五行与用户喜用神匹配数 × 5 分
  4. 性别加成：女性城市 +3 分 / 男性城市 +3 分
  5. 截断：最终分数限制在 [0, 100] 区间
  6. 排序取 Top 3
- **核心函数**：`calculateResults(answers, baziInfo, gender)` → `Results`

---

## 五、主要数据流与交互逻辑

### 5.1 用户主流程

```
用户打开应用
     │
     ▼
┌─────────────┐
│   HomePage   │  ← 品牌展示、入口引导
│   路由: /    │
└──────┬──────┘
       │ 点击"测一测"
       ▼
┌─────────────┐
│   InfoPage   │  ← 填写出生信息、性别
│  路由: /info │
└──────┬──────┘
       │ 提交信息 → sessionStorage.cityfit.userInfo
       ▼
┌─────────────┐
│   QuizPage   │  ← 18 道选择题
│  路由: /quiz │
└──────┬──────┘
       │ 完成所有题目 → 计算八字 → 计算匹配结果
       │ → sessionStorage.cityfit.results
       ▼
┌──────────────┐
│  ResultPage   │  ← 展示结果、地图、八字分析、分享
│ 路由: /result │
└──────┬───────┘
       │ 点击"重新测试"
       ▼
┌─────────────┐
│   HomePage   │  ← 清除 sessionStorage，回到起点
│   路由: /    │
└─────────────┘
```

### 5.2 数据流图

```
┌─────────────────────────────────────────────────────────────────────┐
│                         sessionStorage('cityfit')                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  userInfo: { birthDate, birthTime, gender }                  │   │
│  │  results: { topResults, personalityTag, allScores, baziInfo, │   │
│  │            teamId }                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
         ▲                        ▲                        ▲
         │ 写入                   │ 写入                   │ 读取
    InfoPage                 QuizPage                ResultPage
         │                        │                        │
         │    ┌──────────┐        │                        │
         └────┤ 用户输入  ├────────┘                        │
              └──────────┘                                 │
                    │                                       │
                    ▼                                       ▼
         ┌──────────────────┐              ┌──────────────────────┐
         │  calculateBazi() │              │  calculateResults()  │
         │  (useBazi.ts)    │              │  (useMatching.ts)    │
         └────────┬─────────┘              └──────────┬───────────┘
                  │                                   │
                  ▼                                   ▼
         ┌──────────────────┐              ┌──────────────────────┐
         │   BaziInfo       │◄────────────┤  questions.ts        │
         │   {              │   scores     │  (18 道题目 + 分值)   │
         │    heavenlyStems │              └──────────────────────┘
         │    earthlyBranches│             ┌──────────────────────┐
         │    fiveElements  │◄────────────┤  cities.ts           │
         │    dayMaster     │   baziPref   │  (32 座城市数据)      │
         │    likes/dislikes│              └──────────────────────┘
         │    ...           │
         └──────────────────┘
```

### 5.3 小队系统数据流

```
用户 A 生成分享链接
     │
     ├─→ 编码自身结果 + 小队码 → base64 → URL 参数
     │
     ▼
用户 B 打开链接
     │
     ├─→ 解析 URL 参数 → 解码 → 提取小队数据
     │
     ▼
ResultPage 合并显示
     ├─→ 用户 A 的 Top 3 城市（彩色气泡）
     └─→ 用户 B 的 Top 3 城市（半透明气泡）
```

---

## 六、文件系统组织结构

```
City_fit_codebase/
│
├── index.html                          # HTML 入口，挂载 #app，引入 main.ts
├── package.json                        # 项目配置、依赖、脚本
├── vite.config.ts                      # Vite 构建配置（端口 5176、GitHub Pages base）
├── tsconfig.json                       # TypeScript 总配置
├── tsconfig.app.json                   # 应用 TS 配置（extends @vue/tsconfig）
├── tsconfig.node.json                  # Node 环境 TS 配置
├── tailwind.config.js                  # Tailwind CSS 主题配置（颜色、字体、动画）
├── postcss.config.js                   # PostCSS 配置（Tailwind + Autoprefixer）
├── .gitignore                          # Git 忽略规则
│
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Actions CI/CD：push main 自动构建部署到 Pages
│
├── .vscode/
│   └── extensions.json                 # 推荐 VSCode 插件（Vue.volar）
│
├── public/
│   └── assets/
│       ├── personas/                   # 32 座城市的 AI 人格插画（PNG）
│       │   ├── beijing.png
│       │   ├── shanghai.png
│       │   └── ...                     # 共 32 张
│       └── humor_cities_personas_images/  # 彩蛋模式幽默风格城市插画（PNG）
│           ├── beijing.png
│           ├── shanghai.png
│           └── chengdu.png             # 当前仅 3 张，可扩展
│
├── scripts/
│   └── download-personas.mjs           # Node 脚本：批量下载 AI 城市插画
│
├── src/
│   ├── main.ts                         # Vue 应用入口：createApp + use(router) + mount
│   ├── App.vue                         # 根组件：仅包含 <router-view />
│   ├── style.css                       # 全局样式：字体导入 + Tailwind 指令 + 组件样式类
│   │
│   ├── router/
│   │   └── index.ts                    # Vue Router 配置（Hash 模式，5 条路由）
│   │
│   ├── types/
│   │   └── index.ts                    # TypeScript 类型定义（UserInfo, Question, City, BaziInfo 等）
│   │
│   ├── data/
│   │   ├── cities.ts                   # 32 座城市静态数据 + 城市人格标签数据
│   │   └── questions.ts                # 18 道题目静态数据（含选项分值映射）
│   │
│   ├── composables/
│   │   ├── useStore.ts                 # 全局状态管理（reactive + sessionStorage 桥接）
│   │   ├── useBazi.ts                  # 八字计算引擎（四柱推算、五行分析、日主解读）
│   │   └── useMatching.ts             # 城市匹配算法（评分计算、归一化、排序）
│   │
│   ├── components/
│   │   ├── ChinaMap.vue                # ECharts 中国地图组件（散点图 + Geo 地图）
│   │   ├── RadarChart.vue              # ECharts 雷达图组件（三维城市画像）
│   │   ├── ShareCard.vue               # 分享卡片组件（html2canvas 截图用）
│   │   └── CityPersonaImage.vue        # 城市人格插画组件（图片 + 降级 emoji 兜底）
│   │
│   └── views/
│       ├── HomePage.vue                # 首页视图
│       ├── InfoPage.vue                # 信息采集视图
│       ├── QuizPage.vue                # 答题视图
│       ├── ResultPage.vue              # 结果展示视图（最复杂，含地图/八字/分享/小队）
│       └── PortraitPreview.vue         # AI 插画预览视图
│
└── miscellaneous/
    └── agent_longterm_memory.md        # 本文件：项目架构全景记忆
```

### 6.1 目录功能说明

| 目录/文件 | 功能说明 |
|-----------|----------|
| `src/views/` | 页面级组件，对应路由，每个文件一个完整页面 |
| `src/components/` | 可复用 UI 组件，被 views 引用 |
| `src/composables/` | 可组合逻辑函数，封装核心业务逻辑 |
| `src/data/` | 静态数据源，编译时确定的常量数据 |
| `src/types/` | TypeScript 类型定义，全局共享 |
| `src/router/` | 路由配置 |
| `public/assets/personas/` | 静态资源，AI 生成的 32 张城市人格插画 |
| `scripts/` | 开发工具脚本 |
| `.github/workflows/` | CI/CD 自动化部署配置 |

---

## 七、项目启动流程

### 7.1 环境要求

- **Node.js** >= 18（推荐 20 LTS）
- **npm** >= 9（随 Node.js 安装）

### 7.2 首次启动

```bash
# 1. 克隆项目
git clone <repository-url>
cd City_fit_codebase

# 2. 安装依赖
npm install

# 3. 启动开发服务器（默认端口 5176）
npm run dev

# 4. 浏览器打开
# http://localhost:5176
```

### 7.3 可用脚本

| 命令 | 功能 |
|------|------|
| `npm run dev` | 启动 Vite 开发服务器（热更新） |
| `npm run build` | 生产构建：TypeScript 检查 + Vite 打包 |
| `npm run preview` | 预览生产构建结果 |
| `npm run generate-personas` | 下载 AI 城市人格插画（调用 Pollinations API） |

### 7.4 生产构建与部署

```bash
# 构建
npm run build
# 输出目录：dist/

# 本地预览
npm run preview
```

**CI/CD 自动部署**（[deploy.yml](file:///e:/git/City_fit_codebase/.github/workflows/deploy.yml)）：
- 触发条件：push 到 `main` 分支
- 流程：`npm ci` → `npm run build` → 上传 `dist/` 到 GitHub Pages
- 部署 URL：`https://<username>.github.io/CityFit/`

---

## 八、开发环境配置指南

### 8.1 推荐 VSCode 插件

- **Vue.volar**（官方推荐，见 [extensions.json](file:///e:/git/City_fit_codebase/.vscode/extensions.json)）
- **Tailwind CSS IntelliSense**（Tailwind 类名补全）
- **ESLint**（代码规范检查，当前项目未配置，建议后续添加）

### 8.2 Vite 配置说明

```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/CityFit/' : '/',
  plugins: [vue()],
  server: {
    port: 5176,
    strictPort: true,  // 端口被占用时直接报错，不自动递增
  },
})
```

- `base` 动态设置：GitHub Actions 构建时使用 `/CityFit/`，本地开发使用 `/`
- `strictPort: true`：确保开发服务器始终使用 5176 端口

### 8.3 TypeScript 配置

- [tsconfig.app.json](file:///e:/git/City_fit_codebase/tsconfig.app.json)：继承 `@vue/tsconfig/tsconfig.dom.json`
- 严格模式：`noUnusedLocals`、`noUnusedParameters` 均开启
- 类型检查：`vue-tsc -b` 在构建时执行

### 8.4 Tailwind CSS 主题

- **主色调**：`primary: #FF6B6B`（珊瑚红）
- **辅助色**：`secondary: #4ECDC4`（青绿）、`accent: #45B7D1`（天蓝）
- **字体**：`ZCOOL KuaiLe`（标题）、`Noto Sans SC`（正文）
- **自定义动画**：float、bounce-slow、pulse-soft、slide-up、slide-in-right、fade-in、scale-in、shimmer、wiggle、glow

---

## 九、代码规范

### 9.1 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `HomePage.vue`, `ChinaMap.vue` |
| 组合式函数 | camelCase, 以 `use` 开头 | `useStore.ts`, `useBazi.ts` |
| 数据文件 | camelCase | `cities.ts`, `questions.ts` |
| 类型文件 | camelCase | `index.ts`（位于 types/ 目录） |
| 变量/函数 | camelCase | `calculateResults()`, `currentIndex` |
| 类型/接口 | PascalCase | `UserInfo`, `CityResult` |
| 路由名称 | kebab-case | `'home'`, `'result'` |

### 9.2 Vue 组件规范

- 使用 `<script setup lang="ts">` 语法
- 模板中使用 `scoped` 样式（或全局样式在 `style.css` 中定义）
- 组件命名：多单词组合，避免与 HTML 元素冲突
- Props 使用 `defineProps<Type>()` 泛型方式定义类型
- Emits 使用 `defineEmits<{ eventName: [argType] }>()` 方式定义

### 9.3 TypeScript 规范

- 所有 `.ts` 和 `.vue` 文件必须使用 TypeScript
- 禁止使用 `any` 类型（当前项目未配置 ESLint，但应自觉遵守）
- 接口定义集中在 [types/index.ts](file:///e:/git/City_fit_codebase/src/types/index.ts)
- 使用 `import type` 导入仅类型引用

### 9.4 CSS 规范

- 优先使用 Tailwind CSS 原子类
- 复杂样式使用 `@layer components` 定义可复用组件类（见 [style.css](file:///e:/git/City_fit_codebase/src/style.css)）
- 自定义动画在 `tailwind.config.js` 的 `extend.theme.animation` 中定义
- 颜色变量使用 Tailwind 配置中的语义化名称（如 `bg-primary-pale`）

### 9.5 注释规范

- 复杂算法逻辑（如八字计算）需添加必要的实现说明
- 公共导出函数建议添加 JSDoc 注释
- 避免冗余注释，代码应自文档化

---

## 十、提交流程

### 10.1 分支策略

- `main`：生产分支，推送即自动部署到 GitHub Pages
- 功能开发在 feature 分支进行，完成后合并到 main

### 10.2 提交信息规范

建议使用 Conventional Commits 规范：

```
<type>(<scope>): <description>

feat(home): 添加首页动画效果
fix(quiz): 修复日期选择器边界问题
refactor(bazi): 重构八字计算逻辑
style(css): 调整结果页卡片间距
docs: 更新项目 README
```

### 10.3 提交流程

```bash
# 1. 创建功能分支
git checkout -b feat/your-feature

# 2. 开发并提交
git add .
git commit -m "feat(scope): 描述你的改动"

# 3. 合并到 main
git checkout main
git merge feat/your-feature

# 4. 推送到远程（触发自动部署）
git push origin main
```

### 10.4 构建检查

推送前务必确保构建通过：

```bash
npm run build
# 应无 TypeScript 错误、无构建警告
```

---

## 十一、常见开发任务操作步骤

### 11.1 添加新城市

1. 在 [cities.ts](file:///e:/git/City_fit_codebase/src/data/cities.ts) 中添加城市数据（遵循 `City` 接口）
2. 在 `cityPersonalities` 中添加对应的人格标签
3. 在 [ChinaMap.vue](file:///e:/git/City_fit_codebase/src/components/ChinaMap.vue) 的 `getCityCoord()` 中添加城市坐标
4. 在 [download-personas.mjs](file:///e:/git/City_fit_codebase/scripts/download-personas.mjs) 中添加城市配置
5. 运行 `npm run generate-personas` 生成插画
6. 在题目数据 [questions.ts](file:///e:/git/City_fit_codebase/src/data/questions.ts) 中为选项添加新城市的分值

### 11.2 添加新题目

1. 在 [questions.ts](file:///e:/git/City_fit_codebase/src/data/questions.ts) 中添加题目对象（遵循 `Question` 接口）
2. 确保 `category` 为 `'material' | 'spiritual' | 'xuanxue'` 之一
3. 为每个选项的 `scores` 合理分配城市分值
4. 题目会自动出现在 QuizPage 中，无需修改视图代码

### 11.3 修改匹配算法

1. 编辑 [useMatching.ts](file:///e:/git/City_fit_codebase/src/composables/useMatching.ts)
2. 核心函数 `calculateResults()` 包含：
   - 基础评分累加
   - 归一化处理
   - 八字加成（`matchCount * 5`）
   - 性别加成（`+3`）
   - 分数截断 `[0, 100]`
3. 修改后需验证 ResultPage 的展示是否正常

### 11.4 修改八字算法

1. 编辑 [useBazi.ts](file:///e:/git/City_fit_codebase/src/composables/useBazi.ts)
2. 核心函数 `calculateBazi()` 包含：
   - 年柱计算（`getYearGanZhi`）
   - 月柱计算（`getMonthGanZhi`）
   - 日柱计算（`getDayGanZhi`）
   - 时柱计算（`getHourGanZhi`）
3. 解读文本在 `getEnhancedBaziInfo()` 中生成
4. 注意：日柱计算基于 2024-01-01 的偏移量，修改需谨慎

### 11.5 更新 Tailwind 主题

1. 编辑 [tailwind.config.js](file:///e:/git/City_fit_codebase/tailwind.config.js)
2. 在 `extend.theme` 中修改：
   - `colors`：添加/修改颜色变量
   - `fontFamily`：修改字体配置
   - `animation` / `keyframes`：添加/修改自定义动画
3. 全局组件样式类在 [style.css](file:///e:/git/City_fit_codebase/src/style.css) 的 `@layer components` 中定义

### 11.6 更新 AI 城市插画

```bash
# 运行下载脚本（调用 Pollinations.ai API）
npm run generate-personas

# 脚本配置
# - 输出目录：public/assets/personas/
# - 并发数：1（CONCURRENCY）
# - 请求间隔：5 秒（DELAY_BETWEEN_MS）
# - 超时时间：120 秒（TIMEOUT_MS）
# - 重试次数：3 次
```

### 11.7 调试与排查

- **路由问题**：检查 `router/index.ts` 中的路由配置，确保路径和组件名正确
- **数据丢失**：检查 `sessionStorage` 中 `cityfit` 键的值
- **地图加载失败**：检查网络连接，地图数据来自 `geo.datav.aliyun.com`
- **构建错误**：运行 `npx vue-tsc -b` 单独检查类型错误
- **样式问题**：确认 Tailwind 类名拼写正确，检查 `content` 配置是否包含对应文件

### 11.8 添加幽默城市图像（彩蛋模式）

1. 准备幽默风格的城市插画 PNG 图片（建议 512×512 以上）
2. 放入 `public/assets/humor_cities_personas_images/` 目录，文件名为 `{cityId}.png`
3. 在 [ResultPage.vue](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue) 的 `HUMOR_CITIES` 数组中添加城市 ID：
   ```typescript
   const HUMOR_CITIES = ['beijing', 'shanghai', 'chengdu', 'hangzhou']  // ← 添加新城市
   ```
4. 彩蛋开关会自动生效，无需修改其他代码
5. 验证：访问 `/#/result?easterEgg=1` 查看效果

---

## 十二、项目依赖关系图

```
package.json
├── vue ^3.5.32
│   └── vue-router ^4.6.4
├── echarts ^6.0.0
│   └── ChinaMap.vue
│   └── RadarChart.vue
├── html2canvas ^1.4.1
│   └── ShareCard.vue
├── @vitejs/plugin-vue ^6.0.6
│   └── vite.config.ts
├── tailwindcss ^3.4.19
│   ├── postcss ^8.5.13
│   └── autoprefixer ^10.5.0
├── typescript ~6.0.2
├── vite ^8.0.10
└── vue-tsc ^3.2.7
```

---

## 十三、注意事项与约定

1. **端口固定**：开发服务器强制使用 5176 端口（`strictPort: true`）
2. **Hash 路由**：必须使用 Hash 模式，否则 GitHub Pages 刷新会 404
3. **sessionStorage**：用户数据存储在 sessionStorage，关闭标签页即丢失
4. **无后端**：所有计算在客户端完成，八字算法为简化实现，仅供娱乐
5. **地图数据**：依赖阿里云 DataV 的 GeoJSON 数据，有网络要求
6. **插画生成**：依赖 Pollinations.ai 外部 API，可能因网络或限流失败
7. **构建命令**：`npm run build` 包含 TypeScript 类型检查（`vue-tsc -b`）
8. **CI/CD**：推送到 main 分支自动触发 GitHub Pages 部署
9. **类型安全**：禁止使用 `any`，所有数据需有完整类型定义
10. **组件风格**：使用 Composition API + `<script setup>`，不使用 Options API

---

## 十四、彩蛋模式功能说明

### 14.1 功能概述

彩蛋模式（Easter Egg Mode）允许用户在结果页将城市人格画像切换为幽默风格版本，增加趣味性。当前仅北京、上海、成都三座城市有对应的幽默插画。

### 14.2 实现位置

| 文件 | 作用 |
|------|------|
| [ResultPage.vue](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue) | 彩蛋开关 UI + 逻辑 |
| [CityPersonaImage.vue](file:///e:/git/City_fit_codebase/src/components/CityPersonaImage.vue) | 城市人格画像组件（图片 + emoji 降级兜底） |
| `public/assets/humor_cities_personas_images/` | 幽默风格插画存储目录 |

### 14.3 核心代码

**开关状态**（[ResultPage.vue:L462](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue#L462)）：
```typescript
const easterEggMode = ref(route.query.easterEgg === '1')
```

**白名单**（[ResultPage.vue:L464](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue#L464)）：
```typescript
const HUMOR_CITIES = ['beijing', 'shanghai', 'chengdu']
```

**图片路径切换**（[ResultPage.vue:L505-L512](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue#L505-L512)）：
```typescript
const personalityAssetSrc = computed(() => {
  const topCity = topResults.value[0]?.city
  if (!topCity) return ''
  if (easterEggMode.value && HUMOR_CITIES.includes(topCity.id)) {
    return `/assets/humor_cities_personas_images/${topCity.id}.png`
  }
  return `/assets/personas/${topCity.id}.png`
})
```

### 14.4 数据流

```
用户点击彩蛋开关
     │
     ├─→ easterEggMode = true
     │
     ▼
personalityAssetSrc 重新计算
     │
     ├─→ Top1 城市在 HUMOR_CITIES 白名单中？
     │     ├─ 是 → 返回 humor_cities_personas_images/{cityId}.png
     │     └─ 否 → 返回 personas/{cityId}.png（标准图）
     │
     ▼
CityPersonaImage 组件接收新 assetSrc
     │
     ├─→ 图片加载成功 → 显示幽默插画
     └─→ 图片加载失败 → 显示 emoji 降级兜底
```

### 14.5 URL 参数控制

在结果页 URL 后添加 `?easterEgg=1` 可默认开启彩蛋模式：

```
https://your-domain/#/result?easterEgg=1
```

适用于：
- 分享彩蛋模式链接给好友
- 活动推广时默认展示幽默风格
- 开发调试时快速验证

### 14.6 扩展指南

如需为更多城市添加幽默插画：

1. **准备图片**：将幽默风格 PNG 放入 `public/assets/humor_cities_personas_images/{cityId}.png`
2. **注册白名单**：在 [ResultPage.vue](file:///e:/git/City_fit_codebase/src/views/ResultPage.vue#L464) 的 `HUMOR_CITIES` 数组中添加城市 ID
3. **验证**：访问 `/#/result?easterEgg=1` 确认切换正常

> **注意**：如果城市不在 `HUMOR_CITIES` 白名单中，彩蛋开关打开后仍显示标准图，不会报错。