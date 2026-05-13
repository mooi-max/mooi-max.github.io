你后面文章会很多，所以每个目录都建议有一个 `index` 作为导航页。

比如：

```
content/
├── CTF/
│   ├── index.md
│   ├── Nmap常用命令.md
│   └── SQL注入基础.md
├── Linux/
│   ├── index.md
│   └── Linux常用命令.md
```

`CTF/index.md` 可以这样写：

```
---
title: CTF 笔记
description: 记录 CTF、靶机、Web 安全相关学习内容
tags:
  - CTF
---

# CTF 笔记

这里整理 CTF、靶机和 Web 安全相关内容。

## 信息收集

- [[Nmap常用命令]]
- [[目录扫描工具]]

## Web 安全

- [[SQL注入基础]]
- [[文件上传漏洞]]
- [[XSS基础]]

## 靶机复盘

- [[某某靶机复盘]]
```

这样文章多了以后不会乱。