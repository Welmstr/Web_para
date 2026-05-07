---
name: glassmorphism-ui
description: 创建具有通透玻璃质感的前端UI设计，包含毛玻璃效果、景深光影、极简字体和卡片式信息层次。当用户提到玻璃质感、毛玻璃、通透UI、iOS风格、玻璃拟态设计时必须使用此技能。
dependency:
  npm:
    - canvas@^2.11.2
---

# 通透质感UI设计

## 任务目标
- 本 Skill 用于创建具有玻璃拟态（Glassmorphism）风格的前端UI设计
- 能力：毛玻璃效果、景深光影、极简字体、卡片式信息层次、圆环数据展示、动态背景生成
- 触发：用户需要玻璃质感UI、iOS风格界面、毛玻璃效果、通透设计

## 设计规范

### 视觉风格
- **毛玻璃效果**：使用 `backdrop-filter: blur()` 实现iOS原生模糊
- **景深光影**：背景图 + 暗色遮罩 + 光源方向明确的阴影
- **玻璃反光**：叠加高光模拟玻璃表面反光效果
- **空间感**：通过多层阴影和透明度制造正式的空间层次

### 字体规范
- 字体轻盈，采用系统默认无衬线字体（-apple-system, BlinkMacSystemFont）
- 留白精简但信息完整
- 阅读顺序清晰，遵循 Apple 设计规范

### 卡片设计
- 单层阴影，不加描边
- 色块用透明度区分主次
- 圆角设计，符合 Apple 风格

### 数据展示
- 圆环进度条
- 卡片式信息块
- 色块对比展示

### 导航
- Apple 风格圆角导航栏
- 悬浮效果与过渡动画

## 资源索引

### 脚本工具
- **[scripts/generate-background.js](scripts/generate-background.js)**
  - 用途：根据颜色风格指令随机生成简约风格背景图
  - 触发时机：当用户需要自定义背景图时，**必须调用此脚本**
  - 关键作用：生成与玻璃组件风格匹配的背景图

### 参考文档
- **[references/design-system.md](references/design-system.md)**
  - 内容：完整的玻璃质感设计系统规范，包含CSS变量、组件样式、动效参数
  - 使用时机：在实现任何玻璃质感UI前，**必须先读取此文档**
  - 关键作用：确保设计符合统一的视觉规范

- **[references/component-examples.md](references/component-examples.md)**
  - 内容：核心组件的代码示例（玻璃卡片、圆环进度、导航栏）
  - 使用时机：需要实现具体组件时，**参考此文档的代码片段**
  - 关键作用：提供可直接使用的组件实现模式

- **[references/background-generator.md](references/background-generator.md)**
  - 内容：背景图生成器的使用说明和颜色配置指南
  - 使用时机：在调用背景生成脚本前，**必须先读取此文档**
  - 关键作用：了解如何配置背景图的颜色风格和参数

### 静态资源
- **[assets/](assets/)**
  - 内容：设计所需的背景图片、渐变素材
  - 使用方式：当需要背景图资源时，**直接使用此目录中的文件**

## 注意事项
- **附件读取规则**：当任务涉及玻璃质感UI实现时，**必须优先读取** references/ 中的设计规范文档
- **背景图生成规则**：当用户需要自定义背景时，**必须先读取** references/background-generator.md，然后**调用** scripts/generate-background.js
- **实现优先级**：backdrop-filter > box-shadow > background-gradient
- **性能注意**：毛玻璃效果在低端设备上可能影响性能，建议提供降级方案
- **浏览器兼容**：确保在 Safari、Chrome、Firefox 上均有良好表现