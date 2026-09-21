# 个人作品集网站模板

黑底 × 象牙白 × 红色点缀的编辑杂志风作品集，纯 HTML/CSS/JS，无需构建工具。

## 文件结构

```
├── index.html                 主页（四屏）
├── portfolio/
│   ├── project-01.html        作品详情页 01
│   ├── project-02.html        作品详情页 02
│   ├── project-03.html        作品详情页 03
│   └── project-04.html        作品详情页 04
└── assets/
    ├── css/style.css          全站样式（颜色/字体在顶部变量区统一改）
    ├── js/main.js             交互脚本
    └── img/                   放你的图片（photo.jpg、作品图等）
```

## 本地预览

```bash
cd 本目录
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 如何替换内容

| 要改什么       | 在哪里改                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------ |
| 姓名 / 介绍    | `index.html` 第一屏的 `YOUR NAME`、`hero__desc`                                                       |
| 个人照片       | 把图片命名为 `photo.jpg` 放入 `assets/img/`（建议 3:4 竖图）                                                   |
| 数据（年限/项目数） | `index.html` 中 `hero__meta`                                                                      |
| 工作经历       | `index.html` 第二屏 4 个 `timeline__item`                                                            |
| 作品封面图      | `index.html` 中对应卡片的 `.card__img--N`，将渐变改为 `background: url(assets/img/cover-1.jpg) center/cover` |
| 作品标题/简介    | 卡片的 `card__title` / `card__brief`                                                                |
| 项目详情页      | `portfolio/project-XX.html`，把 `IMAGE` 占位框替换为 `<img src="../assets/img/xxx.jpg">`                 |
| 邮箱 / 社交链接  | `index.html` 第四屏 `contact__mail` 与 `contact__links`                                              |
| 全站配色 / 字体  | `assets/css/style.css` 顶部 `:root` 变量（`--accent`、`--ivory`、`--serif` 等）                              |

## 内置动效

- 加载进度动画、标题乱码（Scramble）入场
- 自定义光标（跟随 + hover 放大）
- 滚动进度条、导航毛玻璃 + 当前区块高亮
- 各区块滚动淡入揭示（IntersectionObserver）
- 卡片 / 照片 3D 倾斜跟随 + 封面放大 + VIEW ALL 悬浮按钮
- 已适配移动端与"减少动效"系统偏好
