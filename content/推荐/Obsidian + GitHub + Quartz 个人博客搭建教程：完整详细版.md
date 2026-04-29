---
title: Obsidian + GitHub + Quartz 个人博客搭建教程：完整详细版
description: 面向完全新手的个人博客搭建教程，包含 Git、Node.js、npm、Obsidian、Quartz、GitHub Pages、自动同步、网站优化、访问统计、favicon、SEO 和常见问题排查。
date: 2026-04-29
tags:
  - 博客搭建
  - Obsidian
  - GitHub
  - Quartz
  - GitHub Pages
  - 教程
---

# Obsidian + GitHub + Quartz 个人博客搭建教程：完整详细版

这篇文章会一步一步教你搭建一个免费的个人笔记博客。

最终使用的方案是：

```text
Obsidian + GitHub + Quartz + GitHub Pages
```

最终效果是：

```text
你在 Obsidian 写笔记
↓
Obsidian Git 插件自动上传 GitHub
↓
GitHub Actions 自动构建网站
↓
GitHub Pages 自动发布
↓
别人通过网址访问你的博客
```

适合这些场景：

```text
1. 想把自己的学习笔记公开给别人看
2. 想长期更新 CTF、Linux、Docker、数据库、工具教程等文章
3. 想用 Markdown 写文章
4. 想插入图片、代码块和命令
5. 不想买服务器
6. 想用 GitHub 免费托管博客
```

本教程以 Windows 系统 为主，适合新手一步一步照着做。

---

# 一、整体流程先看懂

搭建过程可以分成 8 个阶段：

```text
第一阶段：安装基础环境
第二阶段：下载并初始化 Quartz
第三阶段：本地预览博客
第四阶段：用 Obsidian 写文章
第五阶段：上传到 GitHub
第六阶段：配置 GitHub Pages 自动发布
第七阶段：配置 Obsidian Git 自动同步
第八阶段：优化网站外观、SEO、统计和图标
```

不用一次全部理解，照着步骤做就行。

最终你的博客地址类似：

```text
https://你的GitHub用户名.github.io/
```

例如：

```text
https://mooi-max.github.io/
```

---

# 二、安装基础环境

这一部分非常重要。后面所有命令都依赖这些环境。

需要安装：

```text
1. Git
2. Node.js
3. npm
4. Obsidian
5. GitHub 账号
```

其中：

```text
Git：负责上传文件到 GitHub
Node.js：负责运行 Quartz
npm：Node.js 自带的包管理工具，用来安装 Quartz 依赖
Obsidian：负责写笔记
GitHub：负责存放博客代码并发布网站
```

---

## 2.1 安装 Git

### 第一步：打开 Git 官网

浏览器打开：

```text
https://git-scm.com/
```

点击：

```text
Download for Windows
```

下载安装包。

### 第二步：安装 Git

双击下载好的 Git 安装包。

安装过程中，如果你不懂每个选项是什么意思，建议全部保持默认，然后一直点：

```text
Next
Next
Next
Install
Finish
```

大部分新手不需要改安装选项。

### 第三步：检查 Git 是否安装成功

安装完成后，重新打开 CMD。

打开方式：

```text
Win + R
输入 cmd
回车
```

在 CMD 中输入：

```bash
git --version
```

如果显示类似：

```text
git version 2.xx.x
```

说明 Git 安装成功。

如果提示：

```text
git 不是内部或外部命令
```

可以尝试：

```text
1. 关闭 CMD，重新打开
2. 重启电脑
3. 重新安装 Git
4. 安装时确认勾选了添加到 PATH 的选项
```

### 第四步：配置 Git 用户名和邮箱

Git 第一次使用建议设置用户名和邮箱。

在 CMD 输入：

```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
```

例如：

```bash
git config --global user.name "mooi"
git config --global user.email "你的GitHub邮箱@example.com"
```

查看是否配置成功：

```bash
git config --global user.name
git config --global user.email
```

如果能显示你刚才设置的内容，说明配置成功。

---

## 2.2 安装 Node.js

Quartz 需要 Node.js 才能运行。

### 第一步：打开 Node.js 官网

浏览器打开：

```text
https://nodejs.org/
```

建议下载：

```text
LTS 版本
```

LTS 的意思是长期支持版，比较稳定，适合大多数人。

### 第二步：安装 Node.js

双击下载好的安装包。

安装过程中建议：

```text
1. 一路 Next
2. 保持默认路径
3. 勾选 Add to PATH 或自动添加到环境变量
4. 点击 Install
5. 安装完成后点击 Finish
```

如果你不懂选项，保持默认即可。

### 第三步：检查 Node.js 是否安装成功

重新打开 CMD，输入：

```bash
node -v
```

如果显示类似：

```text
v22.x.x
```

说明 Node.js 安装成功。

如果显示：

```text
node 不是内部或外部命令
```

可以尝试：

```text
1. 关闭 CMD 重新打开
2. 重启电脑
3. 重新安装 Node.js
4. 安装时确认添加到了 PATH
```

---

## 2.3 检查 npm

npm 通常会随 Node.js 一起安装，不需要单独下载安装。

检查 npm：

```bash
npm -v
```

如果显示类似：

```text
10.x.x
```

或者：

```text
11.x.x
```

说明 npm 正常。

如果 node -v​ 正常，但 npm -v​ 不正常，可以尝试：

```text
1. 关闭 CMD 重新打开
2. 重启电脑
3. 重新安装 Node.js LTS
```

---

## 2.4 安装 Obsidian

浏览器打开：

```text
https://obsidian.md/
```

下载 Windows 版本并安装。

安装完成后先不用急着创建仓库，后面我们会用 Obsidian 打开 Quartz 项目文件夹。

---

## 2.5 注册 GitHub 账号

打开：

```text
https://github.com/
```

注册并登录。

记住你的 GitHub 用户名，后面仓库名要用到。

例如你的 GitHub 主页是：

```text
https://github.com/mooi-max
```

那么你的 GitHub 用户名就是：

```text
mooi-max
```

---

## 2.6 最终检查

打开 CMD，依次输入：

```bash
git --version
node -v
npm -v
```

只要这三个都能显示版本号，就可以继续。

---

# 三、创建博客项目文件夹

建议把博客放在一个固定目录，例如：

```text
C:\Users\你的用户名\Desktop\_study\blog
```

打开 CMD，执行：

```bash
cd C:\Users\你的用户名\Desktop
mkdir _study
cd _study
mkdir blog
cd blog
```

如果你的桌面路径不同，可以自己调整。

你也可以直接用自己的路径，比如：

```text
D:\blog
```

核心原则是：路径不要太乱，后面方便找到。

---

# 四、下载 Quartz

在刚才的 blog​ 文件夹中执行：

```bash
git clone https://github.com/jackyzha0/quartz.git myblog
```

执行成功后，会出现一个新文件夹：

```text
myblog
```

进入这个文件夹：

```bash
cd myblog
```

## 4.1 如果 git clone 失败怎么办？

如果出现类似：

```text
TLS connect error
unexpected eof while reading
```

一般是网络连接 GitHub 不稳定。

可以先设置 Git：

```bash
git config --global http.sslBackend schannel
git config --global http.version HTTP/1.1
```

然后重新克隆：

```bash
git clone --depth=1 https://github.com/jackyzha0/quartz.git myblog
```

如果之前已经生成了失败的 myblog​ 文件夹，可以先删除：

```bash
rmdir /s /q myblog
```

再重新执行 clone。

---

# 五、安装 Quartz 依赖

进入项目目录：

```bash
cd myblog
```

安装依赖：

```bash
npm i
```

等待它执行完成。

如果看到类似：

```text
added xxx packages
```

说明依赖安装成功。

如果看到：

```text
vulnerabilities
```

先不用急着处理，不影响博客搭建。不要一开始就乱执行 npm audit fix​，否则可能导致依赖版本变化。

---

# 六、初始化 Quartz

执行：

```bash
npx quartz create
```

它会出现选项。

## 6.1 选择初始化方式

如果出现：

```text
Choose how to initialize the content
```

选择：

```text
Empty Quartz
```

然后按回车。

## 6.2 选择链接格式

如果出现：

```text
Choose how Quartz should resolve links in your content
```

选择：

```text
Treat links as shortest path
```

这个适合 Obsidian 的双链写法，例如：

```markdown
[[Nmap常用命令]]
[[Linux权限管理]]
```

后面选项不懂就默认回车。

---

# 七、本地启动博客

在 myblog​ 文件夹中执行：

```bash
npx quartz build --serve
```

如果成功，会显示类似：

```text
Started a Quartz server listening at http://localhost:8080
```

打开浏览器访问：

```text
http://localhost:8080
```

如果能看到页面，说明本地博客已经运行成功。

停止服务的方法：

```text
在 CMD 里按 Ctrl + C
```

---

# 八、用 Obsidian 打开项目

打开 Obsidian，选择：

```text
打开本地文件夹作为仓库
```

选择整个项目文件夹：

```text
...\myblog
```

不要只选择：

```text
...\myblog\content
```

原因：

```text
后面要用 Obsidian Git 插件自动上传
Git 仓库在 myblog 根目录
如果只打开 content，插件可能找不到 Git 仓库
```

平时写文章的位置是：

```text
myblog/content/
```

---

# 九、让 Obsidian 左侧更清爽

因为打开的是整个项目，Obsidian 里可能会看到很多文件：

```text
node_modules
quartz
package.json
quartz.config.ts
quartz.layout.ts
```

可以隐藏不常用文件。

进入 Obsidian：

```text
设置 → 文件与链接 → 排除文件
```

添加：

```text
node_modules/
quartz/
public/
.github/
.git/
package.json
package-lock.json
quartz.config.ts
quartz.layout.ts
tsconfig.json
```

这样 Obsidian 左侧主要显示 content​ 里的笔记。

---

# 十、设置图片保存位置

进入 Obsidian：

```text
设置 → 文件与链接
```

找到：

```text
附件默认存放位置
```

选择：

```text
当前文件所在文件夹下的指定子文件夹
```

子文件夹名称填：

```text
assets
```

以后你在文章里粘贴图片，会自动放到当前文章目录下的 assets​ 文件夹中。

例如：

```text
content/CTF/assets/nmap-scan-01.png
```

---

# 十一、设置新建笔记默认位置

进入：

```text
设置 → 文件与链接
```

找到：

```text
新建笔记的存放位置
```

建议选择：

```text
指定的文件夹
```

文件夹填：

```text
content
```

这样新建笔记时默认就会放到 content​ 中，不会跑到项目根目录。

---

# 十二、创建博客目录结构

在 Obsidian 的 content​ 文件夹中创建这些文件夹：

```text
CTF
Linux
Docker
数据库
工具教程
随笔
```

最后结构类似：

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

注意：

在 Obsidian 新建笔记时，文件名不要写 .md​。

例如要创建：

```text
index.md
```

你只需要输入：

```text
index
```

不要输入：

```text
index.md
```

否则可能变成：

```text
index.md.md
```

---

# 十三、修改首页

打开：

```text
content/index.md
```

写入：

```markdown
---
title: 首页
description: 我的个人技术笔记，记录 CTF、网络安全、Linux、Docker、数据库、工具教程和学习复盘。
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

## 最近整理方向

- CTF 靶机复盘
- Web 安全基础
- Linux 常用命令
- Docker 部署记录
- 数据库学习笔记
```

---

# 十四、创建分类首页

例如在：

```text
content/CTF/
```

里面新建笔记：

```text
index
```

内容：

```markdown
---
title: CTF 笔记
description: 记录 CTF、靶机和 Web 安全相关学习内容。
tags:
  - CTF
---

# CTF 笔记

这里整理 CTF、靶机、Web 安全相关内容。

## 信息收集

- [[Nmap常用命令]]

## Web 安全

后续可以整理 SQL 注入、文件上传、XSS 等内容。

## 靶机复盘

后续可以记录靶机练习过程。
```

---

# 十五、写第一篇文章

在：

```text
content/CTF/
```

中新建：

```text
Nmap常用命令
```

内容：

````markdown
---
title: Nmap常用命令
description: 记录 Nmap 在 CTF 和靶机测试中的常用扫描命令、参数说明和实战用法。
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

## 相关笔记

- [[CTF/index|CTF 笔记]]
````

写完后重新本地预览：

```bash
npx quartz build --serve
```

打开：

```text
http://localhost:8080
```

检查首页、分类页、文章页是否能访问。

---

# 十六、修改网站标题和配置

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
pageTitle: "Mooi 的个人技术笔记",
```

或者：

```ts
pageTitle: "Mooi 的网络安全与技术笔记",
```

找到：

```ts
baseUrl:
```

如果你的 GitHub 仓库是：

```text
你的用户名.github.io
```

例如：

```text
mooi-max.github.io
```

那么写：

```ts
baseUrl: "mooi-max.github.io",
```

注意：

```text
不要写 https://
不要在最后加 /
```

找到：

```ts
locale:
```

建议设置：

```ts
locale: "zh-CN",
```

---

# 十七、创建 GitHub 仓库

登录 GitHub，点击：

```text
New repository
```

如果你想让博客地址是：

```text
https://你的用户名.github.io/
```

仓库名必须是：

```text
你的用户名.github.io
```

例如用户名是：

```text
mooi-max
```

仓库名就是：

```text
mooi-max.github.io
```

创建时建议：

```text
Public
不要勾选 README
不要添加 .gitignore
不要添加 license
```

---

# 十八、连接 GitHub 仓库

回到 CMD，进入项目目录：

```bash
cd C:\Users\你的用户名\Desktop\_study\blog\myblog
```

查看远程仓库：

```bash
git remote -v
```

修改 origin：

```bash
git remote set-url origin https://github.com/你的用户名/你的用户名.github.io.git
```

例如：

```bash
git remote set-url origin https://github.com/mooi-max/mooi-max.github.io.git
```

添加 Quartz 官方仓库作为上游：

```bash
git remote add upstream https://github.com/jackyzha0/quartz.git
```

如果提示 upstream already exists​，不用管。

---

# 十九、创建 GitHub Actions 部署文件

在项目根目录创建：

```text
.github/workflows/deploy.yml
```

如果没有 .github​ 文件夹，就手动创建：

```text
.github
└── workflows
    └── deploy.yml
```

​deploy.yml​ 内容：

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

---

# 二十、提交并推送到 GitHub

查看当前分支：

```bash
git branch --show-current
```

如果不是：

```text
v4
```

执行：

```bash
git branch -M v4
```

提交：

```bash
git add .
git commit -m "init blog"
git push -u origin v4
```

如果 push 失败，报类似：

```text
remote unpack failed
did not receive expected object
```

执行：

```bash
git push --no-thin -u origin v4
```

---

# 二十一、开启 GitHub Pages

打开你的 GitHub 仓库：

```text
Settings → Pages
```

找到：

```text
Build and deployment
```

把 Source 改成：

```text
GitHub Actions
```

然后进入：

```text
Actions
```

等待：

```text
Deploy Quartz site to GitHub Pages
```

变成绿色对勾。

成功后访问：

```text
https://你的用户名.github.io/
```

---

# 二十二、解决部署分支限制问题

如果 Actions 报错：

```text
Branch "v4" is not allowed to deploy to github-pages due to environment protection rules.
```

解决方法：

```text
Settings → Environments → github-pages
```

找到：

```text
Deployment branches and tags
```

把限制改成：

```text
No restriction
```

或者添加允许部署的分支：

```text
v4
```

然后回到 Actions，点击：

```text
Re-run jobs
```

重新运行部署。

---

# 二十三、安装 Obsidian Git 插件

打开 Obsidian：

```text
设置 → 第三方插件 → 浏览
```

搜索：

```text
Git
```

选择作者是：

```text
Vinzent
```

描述类似：

```text
Integrate Git version control with automatic backup
```

安装并启用。

注意：

不要安装 GitHobs​，它主要是 GitHub Issue 编辑器，不是我们需要的自动同步插件。

---

# 二十四、配置 Obsidian Git 自动同步

进入：

```text
设置 → 第三方插件 → Git
```

建议配置：

```text
Auto commit-and-sync interval：10
Auto pull interval：10
Auto pull on startup：开启
Auto commit-and-sync only staged files：关闭
Specify custom commit message：关闭
Commit message on auto commit-and-sync：vault backup: {{date}}
Commit message on manual commit：vault backup: {{date}}
Merge strategy：Merge
```

然后按：

```text
Ctrl + P
```

搜索并执行：

```text
Git: Commit-and-sync
```

如果显示：

```text
no change to commit
no commits to push
```

说明插件正常，只是当前没有新改动。

你可以修改 content/index.md​，再执行一次测试。

如果显示：

```text
committed 1 file
```

说明已经成功提交。

如果 GitHub 仓库出现新提交，并且网站内容也更新了，就说明流程完全打通。

---

# 二十五、配置 .gitignore

打开：

```text
.gitignore
```

建议内容：

```gitignore
.DS_Store
Thumbs.db

node_modules/
public/
.quartz-cache/
tsconfig.tsbuildinfo

.obsidian/
.trash/

private/
content/private/
.replit
replit.nix
prof/
```

不要写：

```gitignore
.gitignore
```

因为 .gitignore​ 自己也需要被 Git 管理。

如果 .obsidian​ 已经被 Git 跟踪，执行：

```bash
git rm -r --cached .obsidian
git commit -m "remove obsidian config from git"
git push
```

---

# 二十六、添加 favicon 网站图标

准备一个图标文件：

```text
icon.png
```

放到：

```text
quartz/static/icon.png
```

然后本地测试：

```bash
npx quartz build --serve
```

浏览器打开：

```text
http://localhost:8080
```

如果图标没立刻变化，按：

```text
Ctrl + F5
```

或者用无痕窗口查看。

确认没问题后：

```text
Ctrl + P → Git: Commit-and-sync
```

---

# 二十七、添加 Google Analytics 访问统计

## 27.1 打开 Google Analytics

打开：

```text
https://analytics.google.com/
```

创建账号和媒体资源。

如果它问商家信息：

```text
行业类别：互联网与电信
业务规模：小型 - 1 至 10 名员工
```

选择数据来源时选择：

```text
网站 Web
```

网站网址填写注意：

```text
左边选择 https://
右边只填 你的用户名.github.io
```

例如：

```text
mooi-max.github.io
```

不要在右边再写 http://​ 或 https://​。

数据流名称可以写：

```text
Mooi Blog
```

创建完成后，复制：

```text
衡量 ID / Measurement ID
```

格式是：

```text
G-XXXXXXXXXX
```

## 27.2 修改 Quartz 配置

打开：

```text
quartz.config.ts
```

找到：

```ts
analytics: {
  provider: "plausible",
},
```

或者：

```ts
analytics: null,
```

改成：

```ts
analytics: {
  provider: "google",
  tagId: "G-XXXXXXXXXX",
},
```

把 G-XXXXXXXXXX​ 换成你自己的衡量 ID。

本地测试：

```bash
npx quartz build --serve
```

没报错后同步：

```text
Ctrl + P → Git: Commit-and-sync
```

等 GitHub Actions 部署成功后，打开网站，再去 Google Analytics 的实时报告查看是否有访问记录。

---

# 二十八、SEO 优化

## 28.1 站点标题

在 quartz.config.ts​ 中设置：

```ts
pageTitle: "Mooi 的网络安全与技术笔记",
```

## 28.2 baseUrl

确认：

```ts
baseUrl: "你的用户名.github.io",
```

例如：

```ts
baseUrl: "mooi-max.github.io",
```

## 28.3 首页描述

打开：

```text
content/index.md
```

顶部写：

```markdown
---
title: 首页
description: Mooi 的个人技术笔记，记录 CTF、网络安全、Linux、Docker、数据库、工具教程和学习复盘。
---
```

## 28.4 文章描述

每篇文章顶部建议写：

```markdown
---
title: Nmap常用命令
description: 记录 Nmap 在 CTF 和靶机测试中的常用扫描命令、参数说明和实战用法。
date: 2026-04-29
tags:
  - CTF
  - Nmap
  - 信息收集
---
```

## 28.5 图片 alt

不要写：

```markdown
![](assets/1.png)
```

建议写：

```markdown
![Nmap 扫描结果示例](assets/nmap-scan-result-01.png)
```

---

# 二十九、代码块样式优化

打开：

```text
quartz/styles/custom.scss
```

保留：

```scss
@use "./base.scss";

// put your custom CSS here!
```

在底部添加：

```scss
/* ==============================
   Code Block Style
   简洁代码块样式
   ============================== */

:not(pre) > code {
  padding: 0.18rem 0.42rem;
  margin: 0 0.08rem;
  border-radius: 6px;
  font-size: 0.88em;
  font-family:
    "JetBrains Mono",
    "Cascadia Code",
    "Fira Code",
    "Consolas",
    "Menlo",
    monospace;
  background: color-mix(in srgb, var(--secondary) 12%, transparent);
  color: var(--secondary);
  border: 1px solid color-mix(in srgb, var(--secondary) 18%, transparent);
  white-space: break-spaces;
}

pre {
  position: relative !important;
  margin: 1.35rem 0;
  padding: 1.15rem 3.4rem 1.15rem 1.15rem !important;
  min-height: 3.2rem;
  border-radius: 14px;
  overflow-x: auto;
  overflow-y: visible !important;
  font-size: 0.92rem;
  line-height: 1.7;
  font-family:
    "JetBrains Mono",
    "Cascadia Code",
    "Fira Code",
    "Consolas",
    "Menlo",
    monospace;
  background: #1f2933 !important;
  color: #e5e7eb;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

pre code {
  display: block;
  padding: 0 !important;
  margin: 0 !important;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  background: transparent !important;
  color: inherit;
  border: none !important;
  white-space: pre;
  tab-size: 2;
}

pre span {
  font-family: inherit;
}

pre::-webkit-scrollbar {
  height: 8px;
}

pre::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 999px;
}

pre::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.48);
  border-radius: 999px;
}

pre::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.78);
}
```

以后写代码块时建议写语言名：

````markdown
```bash
nmap -sC -sV 192.168.56.105
```

```sql
select * from student;
```

```python
print("hello")
```
````

---

# 三十、网站背景优化

继续修改：

```text
quartz/styles/custom.scss
```

在底部添加：

```scss
/* ==============================
   Mooi Blog - Simple Background
   暗色：科技赛博朋克
   亮色：明亮暖白
   ============================== */

html,
body {
  min-height: 100%;
}

body {
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center top;
}

/* 暗色模式：深蓝黑 + 蓝紫科技光晕 */
:root[saved-theme="dark"] body {
  background:
    radial-gradient(circle at 15% 10%, rgba(34, 211, 238, 0.18), transparent 28rem),
    radial-gradient(circle at 85% 12%, rgba(168, 85, 247, 0.2), transparent 30rem),
    radial-gradient(circle at 50% 105%, rgba(59, 130, 246, 0.12), transparent 32rem),
    linear-gradient(135deg, #050816 0%, #08111f 45%, #111827 100%);
}

/* 亮色模式：明亮暖白，不带蓝色光感 */
:root[saved-theme="light"] body {
  background:
    radial-gradient(circle at 16% 10%, rgba(255, 255, 255, 0.95), transparent 28rem),
    radial-gradient(circle at 86% 12%, rgba(255, 247, 237, 0.55), transparent 30rem),
    radial-gradient(circle at 50% 105%, rgba(250, 250, 250, 0.92), transparent 32rem),
    linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f6f6f4 100%);
}

/* 暗色模式：正文区域轻微玻璃卡片感 */
:root[saved-theme="dark"] article {
  background: rgba(8, 13, 28, 0.56);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22);
}

/* 亮色模式：正文区域干净白色卡片感 */
:root[saved-theme="light"] article {
  background: rgba(255, 255, 255, 0.78);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
}

/* 暗色模式：标题轻微科技光效 */
:root[saved-theme="dark"] article h1 {
  text-shadow: 0 0 22px rgba(34, 211, 238, 0.12);
}

/* 亮色模式：标题保持清爽 */
:root[saved-theme="light"] article h1 {
  text-shadow: none;
}
```

保存后本地测试：

```bash
npx quartz build --serve
```

---

# 三十一、图片管理规范

建议：

```text
1. 图片尽量压缩
2. 文件名用英文或拼音
3. 不要用空格和特殊符号
4. 每个目录使用 assets 文件夹
```

推荐：

```text
content/CTF/assets/nmap-scan-01.png
content/Docker/assets/docker-network-01.png
content/Linux/assets/linux-permission-01.png
```

不推荐：

```text
截图 2026-04-29 这个很重要！！！.png
```

---

# 三十二、自定义域名说明

不买域名也可以正常使用：

```text
https://你的用户名.github.io/
```

如果以后想买域名，域名不能只叫：

```text
mooi
```

必须是完整域名，例如：

```text
mooi.top
mooi.icu
mooi.dev
mooi.blog
```

如果买的是根域名，例如：

```text
mooi.top
```

需要在 GitHub Pages 填写 Custom domain，并在域名服务商添加 DNS 解析。

如果使用子域名，例如：

```text
blog.mooi.top
```

DNS 中添加 CNAME 指向：

```text
你的用户名.github.io
```

---

# 三十三、常见问题排查

## 33.1 首页 404

检查是否存在：

```text
content/index.md
```

如果是：

```text
content/index.md.md
```

改成：

```text
index.md
```

## 33.2 GitHub Pages 没更新

检查：

```text
1. GitHub Actions 是否绿色成功
2. Pages Source 是否为 GitHub Actions
3. 浏览器是否需要 Ctrl + F5 强制刷新
4. 是否访问了正确的网址
```

## 33.3 Actions 报 v4 不允许部署

解决：

```text
Settings → Environments → github-pages
```

允许 v4​ 分支部署。

## 33.4 Obsidian Git 显示 no change to commit

这不是错误。

意思是：

```text
没有新改动需要提交
没有本地提交需要推送
```

修改一篇文章后再执行：

```text
Git: Commit-and-sync
```

## 33.5 push 失败 remote unpack failed

执行：

```bash
git push --no-thin -u origin v4
```

## 33.6 图片不显示

检查：

```text
1. 图片路径是否正确
2. 图片文件是否真的存在
3. 图片是否提交到了 GitHub
4. 文件名是否有特殊符号
```

## 33.7 Google Analytics 没数据

检查：

```text
1. tagId 是否是 G- 开头
2. GitHub Actions 是否部署成功
3. 是否打开的是线上网站
4. 是否用了广告拦截插件
5. 是否查看的是实时报告
```

---

# 三十四、日常使用流程

以后每天写博客只需要：

```text
1. 打开 Obsidian
2. 在 content 里写文章
3. 插入图片
4. 等 Git 插件自动同步
5. 或手动执行 Git: Commit-and-sync
6. GitHub Actions 自动部署
7. 网站自动更新
```

如果你改了配置文件或样式文件，建议先本地测试：

```bash
npx quartz build --serve
```

确认没问题，再同步到 GitHub。

---

# 三十五、最终推荐项目结构

```text
myblog/
├── content/
│   ├── index.md
│   ├── CTF/
│   │   ├── index.md
│   │   ├── Nmap常用命令.md
│   │   └── assets/
│   ├── Linux/
│   │   └── index.md
│   ├── Docker/
│   │   └── index.md
│   ├── 数据库/
│   │   └── index.md
│   ├── 工具教程/
│   │   └── index.md
│   └── 随笔/
│       └── index.md
├── quartz/
├── quartz.config.ts
├── quartz.layout.ts
├── quartz/
│   └── static/
│       └── icon.png
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
└── package.json
```

到这里，你已经拥有一个完整的个人技术笔记博客：

```text
Obsidian 写作
GitHub 保存
Quartz 构建
GitHub Pages 发布
Obsidian Git 自动同步
Google Analytics 访问统计
favicon 网站图标
SEO 基础优化
代码块样式优化
背景样式优化
```

后面只需要持续写文章即可。