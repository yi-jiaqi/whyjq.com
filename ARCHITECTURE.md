# whyjq.com 架构文档

## 项目概述

一个静态作品集网站，使用原生 HTML/CSS/JavaScript 构建，采用响应式网格布局系统展示多类别创意项目。

**在线访问**: https://yi-jiaqi.github.io/whyjq.com/

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | 无 (Vanilla JS) |
| 3D 渲染 | Three.js (r83) |
| 程序化动画 | Noise.js |
| PDF 查看 | PDF.js (2.6.347) |
| 样式 | 自定义 CSS + pattern.min.css |
| 字体 | Google Material Symbols |

---

## 核心架构

### 1. 三层视图系统

网站通过 `currentType` 变量控制三种视图状态：

| 视图 | Code 值 | 说明 |
|------|---------|------|
| **首页** | `-1` | Logo + 8大分类按钮 + 8个随机项目 |
| **分类页** | `1-9` | 特定分类下的所有项目封面 |
| **项目详情** | `1000+` | 单个项目的完整内容 |

**项目编码规则**: `categoryCode × 1000 + projectIndex`
- 例：`1001` = Architecture 类第1个项目
- 例：`8002` = Web Design 类第2个项目

### 2. 网格布局系统

**核心参数** (`scripts.js`):
```javascript
canvasDivision = 5        // 短边分5格
gapProportion = 0.02      // 间隙比例 (2%)
gridMap[][]               // 二维数组记录格子占用状态
```

**布局流程**:
1. 计算视口 → 确定网格行列数
2. 创建 `gridMap` 二维数组追踪占用
3. 根据 `type` 调用 `fillGrid()` 选择布局策略
4. 放置元素时检查 `canPlaceObject()` 避免重叠

### 3. 数据层结构

**分类定义** (`objects.js`):
```javascript
const categoryObjects = [
  { type: 1, html: "...", action: () => setupGrid(null, 1) }, // Architecture
  { type: 2, html: "...", action: () => setupGrid(null, 2) }, // Fabrications
  // ... 共8个分类
]
```

**项目数据结构**:
```javascript
{
  id: 1001,                          // 唯一标识 (编码规则)
  title: "Project Name",             // 项目标题
  tags: ["architecture"],            // 分类标签
  year: 2021,                        // 年份
  coverPicture: "images/...",        // 封面图路径
  dimension: { x: 2, y: 1 },         // 首页/详情页尺寸
  dimension_category: { x: 2, y: 1 },// 分类页尺寸
  pdf: "pdfs/...",                   // PDF 文档路径 (可选)
  elements: [                        // 详情页内容元素
    { kind: 'text', content: "..." },
    { kind: 'picture', content: "...", dimension: {x, y} },
    { kind: 'link', link: "...", explanation: "..." }
  ]
}
```

### 4. 元素放置函数

| 函数 | 用途 | 尺寸支持 |
|------|------|----------|
| `placeSS()` | 单格元素 (按钮、Logo) | 1×1 |
| `placeMS()` | 多格简单元素 (分类按钮) | 1×1 |
| `placeMM_Cover()` | 项目封面 (自动寻位) | 1×1, 1×2, 2×1, 2×2 |
| `placeMM_Content()` | 项目详情内容 | 任意 |

### 5. 背景系统

**Three.js 动画** (`cloud.js`):
- TorusKnotGeometry 创建环形结
- Noise.js 驱动顶点动画，形成流动效果
- 颜色：`0x071108` (深绿黑)

### 6. 自动演示模式

页面加载后自动循环触发 hover 效果，用户首次交互后停止。

---

## 文件结构

```
whyjq.com/
├── index.html              # 主页面入口
├── styles.css              # 主样式表
├── pattern.min.css         # 点阵背景图案
│
├── scripts.js              # 网格创建与布局逻辑
├── basicFunctions.js       # 基础工具函数
├── IntegratedFunctions.js  # 元素放置函数
├── objects.js              # 项目数据与分类定义
├── cloud.js                # Three.js 背景动画
├── pdfViewer.js            # PDF 查看器逻辑
│
├── images/                 # 项目图片资源 (158项)
├── icons/                  # SVG 图标
├── pdfs/                   # PDF 文档
├── arrival/                # 子项目: Arrival (含 AWS Lambda)
├── doodletest/             # 子项目: 物理引擎实验
└── mandala/                # 子项目: Mandala (空目录)
```

---

## 关键算法

### 网格碰撞检测
```javascript
function canPlaceObject(gridMap, startX, startY, dimension) {
  for (let x = startX; x < startX + dimension.x; x++) {
    for (let y = startY; y < startY + dimension.y; y++) {
      if (x >= gridMap.length || y >= gridMap[0].length || gridMap[x][y]) {
        return false; // 超出边界或已被占用
      }
    }
  }
  return true;
}
```

### 主页项目选择逻辑
```javascript
// 从排除列表之外的项目中随机选取8个
const excludeFromHome = [8002, 8003]; // Quanta Bridge, Alfa Art Gallery
let selectedProjects = filterUnqualifiedItems(projectObjects, excludeFromHome, 8);
```

---

## 子项目链接

| 项目名称 | 链接 |
|----------|------|
| Arrival | https://yi-jiaqi.github.io/arrival/ |
| Mandala | https://yi-jiaqi.github.io/mandala/ |
| Voronoi | https://yi-jiaqi.github.io/Voronoi-Map-Creation/ |

---

## 部署

**GitHub Pages 配置**:
- 仓库: `yi-jiaqi/whyjq.com`
- 分支: `main`
- 目录: `/ (root)`

**本地预览**:
```bash
cd whyjq.com
python -m http.server 8000
# 访问 http://localhost:8000
```

---

## 更新记录

| 日期 | 变更 |
|------|------|
| 2025-04 | 移除 mustSee 固定项目，改为随机选择 |
| 2025-04 | 压缩 4×2 项目为 2×1，保留重要作品 |
| 2025-04 | Quanta Bridge 和 Alfa Art Gallery 不在主页显示 |
| 2025-04 | 更新子项目链接至 yi-jiaqi.github.io |

---

## 分类清单 (8类)

1. **Architecture** - 建筑设计
2. **Fabrications** - 制作
3. **Game Design** - 游戏设计
4. **Generative Art** - 生成艺术
5. **Interaction Design** - 交互设计
6. **iOS Development** - iOS 开发
7. **Product Design** - 产品设计
8. **Web Design** - 网页设计
9. **Fictions** - 虚构叙事

---

*本文档自动生成于 2025-04-10*
