# 个人作品集网站模板

黑底 × 象牙白 × 荧光绿（组件色 `--accent`）点缀的编辑杂志风作品集，纯 HTML/CSS/JS，无需构建工具。

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

## 部署到线上（GitHub + Cloudflare Pages）

纯静态站点，无需构建。免费获得 `*.pages.dev` 地址，也支持绑定自己的域名。

### 1. 推送到 GitHub

- 仓库：`zlqoo/portfolio`（GitHub 账号 `zlqoo`，注册邮箱 `912744642@qq.com`）。
- 本地已 `git init` 并配置 remote 指向该仓库；首次提交已推送。
- 日常推送命令（改完内容后执行）：

  ```bash
  git add .
  git commit -m "更新说明"
  git push origin main
  ```

  若本机没有存储 GitHub 凭据，push 时会走设备授权流程：按提示打开 <https://github.com/login/device> 输入屏幕上的授权码即可，无需输入密码。

### 2. 用 Cloudflare Pages 发布

1. 打开 <https://dash.cloudflare.com> → 左侧 **Workers & Pages** → **Create** → 切到 **Pages** 标签 → **Connect to Git**。
2. 授权 Cloudflare 读取 GitHub，在仓库列表里选 **`zlqoo/portfolio`**。
3. 构建设置（关键，纯静态无构建）：
   - **Framework preset**：`None`
   - **Build command**：**留空**
   - **Build output directory**：**`/`**（仓库根即网站根）
4. 点 **Save and Deploy**，约 1–2 分钟得到形如 `https://portfolio-xxxx.pages.dev` 的免费地址。

### 3. 改完内容后重新部署

只要 `git push` 到 `main` 分支，Cloudflare 会自动重新构建并部署，无需任何手动操作。

### 4. 绑定自定义域名（可选）

在 Pages 项目内的 **Custom domains** → 添加域名 → 按提示在域名 DNS 处添加一条 CNAME 记录指向 `*.pages.dev` 即可。

### 注意事项

- 站点引用的 `assets/pdf/pages-*/` 为详情页渲染图（76 张 PNG，单张均 < 5MB），已纳入仓库；Cloudflare Pages 单文件上限 25MB、单次部署文件数上限 2000，当前体量无压力。
- `assets/img/hero-bg.jpg`（首屏视频封面）目前缺失，仅影响视频加载前的一瞬；`assets/img/figure.png` 为无引用废文件，可清理。
- 第二屏背景 `assets/img/experience-bg.jpg` 为占位图，日后可换成真实照片。
