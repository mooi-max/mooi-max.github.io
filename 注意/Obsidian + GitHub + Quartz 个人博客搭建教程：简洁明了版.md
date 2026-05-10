---
title: Obsidian + GitHub + Quartz 个人博客搭建教程：简洁明了版
description: 新手小白也能照着完成的个人笔记博客搭建流程。
date: 2026-04-29
tags:
  - 博客搭建
  - Obsidian
  - GitHub
  - Quartz
  - 教程
---

# Obsidian + GitHub + Quartz 个人博客搭建教程：简洁明了版

这篇文章只保留最基础、最容易成功的流程。完成后，你可以用 Obsidian 写笔记，自动上传到 GitHub，再通过 Quartz + GitHub Pages 发布成个人博客。

最终流程：

```text
Obsidian 写笔记
↓
Git 上传 GitHub
↓
Quartz 构建网站
↓
GitHub Pages 发布博客
```

---

## 一、准备环境

先安装：

```text
Git
Node.js 22 或更高版本
Obsidian
GitHub 账号
```

安装完成后，打开 CMD 检查：

```bash
git --version
node -v
npm -v
```

能显示版本号就可以继续。

---

## 二、下载 Quartz

打开 CMD，选择一个目录存放博客，例如桌面：

```bash
cd C:\Users\你的用户名\Desktop
mkdir blog
cd blog
git clone https://github.com/jackyzha0/quartz.git myblog
cd myblog
npm i
```

如果 git clone​ 网络报错，可以先执行：

```bash
git config --global http.sslBackend schannel
git config --global http.version HTTP/1.1
```

再重新克隆。

---

## 三、初始化 Quartz

在 myblog​ 文件夹里执行：

```bash
npx quartz create
```

第一个选项选择：

```text
Empty Quartz
```

第二个选项选择：

```text
Treat links as shortest path
```

这个选项适合 Obsidian 的 [[双链]]​ 写法。

---

## 四、本地预览博客

执行：

```bash
npx quartz build --serve
```

看到：

```text
Started a Quartz server listening at http://localhost:8080
```

浏览器打开：

```text
http://localhost:8080
```

能看到页面，说明本地博客搭好了。

停止服务按：

```text
Ctrl + C
```

---

## 五、用 Obsidian 打开项目

打开 Obsidian，选择：

```text
打开本地文件夹作为仓库
```

选择整个项目文件夹：

```text
...\myblog
```

不要只选择 content​ 文件夹，因为后面 Git 插件需要操作整个仓库。

以后写文章的位置是：

```text
myblog/content/
```

---

## 六、设置图片保存位置

Obsidian 里进入：

```text
设置 → 文件与链接
```

把附件默认存放位置设置为：

```text
当前文件所在文件夹下的指定子文件夹
```

子文件夹名称填：

```text
assets
```

这样图片会放在当前文章目录下的 assets​ 文件夹中。

---

## 七、创建基本目录

在 content​ 里创建自己的目录，如：

```text
content/
├── index.md
├── CTF/
├── Linux/
├── Docker/
├── 数据库/
├── 工具教程/
└── 随笔/
```

注意：在 Obsidian 新建笔记时，不要手动输入 .md​。  
例如新建首页只输入 index​，不要输入 index.md​，否则可能变成 index.md.md​。

---

## 八、修改首页

打开：

```text
content/index.md
```

写入：

```markdown
---
title: 首页
description: 我的个人技术笔记
---

# 我的个人技术笔记

这里是我的公开笔记博客，主要记录 CTF、Linux、Docker、数据库、工具教程和学习过程。

## 内容分类

- [[CTF/index|CTF 笔记]]
- [[Linux/index|Linux 笔记]]
- [[Docker/index|Docker]]
- [[数据库/index|数据库]]
- [[工具教程/index|工具教程]]
- [[随笔/index|随笔]]
```

---

## 九、写第一篇文章

在 content/CTF/​ 里新建文章：

```text
Nmap常用命令
```

内容示例：

````markdown
---
title: Nmap常用命令
description: 记录 Nmap 在 CTF 和靶机测试中的常用扫描命令。
date: 2026-04-29
tags:
  - CTF
  - Nmap
  - 信息收集
---

# Nmap常用命令

Nmap 是常用的端口扫描和服务识别工具。

## 常用扫描

```bash
nmap -sC -sV 192.168.56.105
```

## UDP 扫描

```bash
nmap -sU 192.168.56.105
```
````

写完后重新执行：

```bash
npx quartz build --serve
```

刷新 http://localhost:8080​，确认文章能显示。

---

## 十、修改网站标题

打开：

```text
quartz.config.ts
```

找到：

```ts
pageTitle: "Quartz 4",
```

改成：

```ts
pageTitle: "我的个人技术笔记",
```

找到 baseUrl​，如果你的 GitHub 仓库叫：

```text
你的用户名.github.io
```

就写：

```ts
baseUrl: "你的用户名.github.io",
```

注意不要写 https://​，最后也不要加 /​。

---

## 十一、创建 GitHub 仓库

登录 GitHub，新建仓库。

如果你想让博客地址是：

```text
https://你的用户名.github.io/
```

仓库名必须是：

```text
你的用户名.github.io
```

创建仓库时建议：

```text
Public
不要勾选 README
不要添加 .gitignore
不要添加 license
```

---

## 十二、上传到 GitHub

回到 CMD，进入项目目录：

```bash
cd C:\Users\你的用户名\Desktop\blog\myblog
```

修改远程仓库地址：

```bash
git remote set-url origin https://github.com/你的用户名/你的用户名.github.io.git
```

切换分支名为 v4​：

```bash
git branch -M v4
```

提交并上传：

```bash
git add .
git commit -m "init blog"
git push -u origin v4
```

如果 push 报 remote unpack failed​，执行：

```bash
git push --no-thin -u origin v4
```

---

## 十三、配置 GitHub Actions 部署

在项目根目录创建：

```text
.github/workflows/deploy.yml
```

内容如下：

```yaml
name: Deploy Quartz site to GitHub Pages

on:
  push:
    branches:
      - v4

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Build Quartz
        run: npx quartz build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

提交并推送：

```bash
git add .
git commit -m "add deploy workflow"
git push
```

---

## 十四、开启 GitHub Pages

打开 GitHub 仓库：

```text
Settings → Pages
```

把 Source 改成：

```text
GitHub Actions
```

然后进入：

```text
Actions
```

等待 Deploy Quartz site to GitHub Pages​ 变成绿色对勾。

成功后访问：

```text
https://你的用户名.github.io/
```

---

## 十五、安装 Obsidian Git 插件

Obsidian 中进入：

```text
设置 → 第三方插件 → 浏览
```

搜索：

```text
Git
```

选择作者是 Vinzent​ 的 Git 插件，安装并启用。

进入插件设置，建议设置：

```text
Auto commit-and-sync interval：10
Auto pull interval：10
Auto commit-and-sync only staged files：关闭
Commit message：vault backup: {{date}}
```

手动测试：

```text
Ctrl + P → Git: Commit-and-sync
```

如果网页内容成功更新，说明完整流程打通。

---

## 十六、日常使用

以后只需要：

```text
打开 Obsidian
↓
在 content 里写笔记
↓
Git 插件自动同步
↓
GitHub Actions 自动部署
↓
网站自动更新
```

到这里，基础个人博客就搭建完成了。