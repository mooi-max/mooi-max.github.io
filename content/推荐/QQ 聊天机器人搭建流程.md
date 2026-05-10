

## 一、整体思路

最小搭建只需要 3 个东西：

1. AstrBot：机器人后台，负责接收消息、调用大模型、生成回复。
2. NapCat：QQ 协议端，负责登录机器人 QQ，收发 QQ 消息。
3. 大模型 API：例如 DeepSeek、小米 MiMo、阿里云百炼等。

消息流程可以简单理解为：

```
 你的 QQ 消息
    ↓
 机器人 QQ
    ↓
 NapCat
    ↓
 AstrBot
    ↓
 大模型 API
    ↓
 AstrBot
    ↓
 NapCat
    ↓
 机器人 QQ 回复你
```

## 二、准备工作

需要准备：

1. 一台 Windows 电脑。
2. 一个专门用来当机器人的 QQ 号。
3. Docker Desktop。
4. NapCat。
5. 一个可用的大模型 API Key。

建议新建一个专门保存 AstrBot 数据的文件夹：

```
 D:\app\Products\QQ聊天机器人\astrbot\data
```

后面 AstrBot 的配置、聊天记录、平台数据都会保存到这个目录里。

## 三、安装并启动 AstrBot

### 1. 打开 Docker Desktop

先启动 Docker Desktop，等它完全运行起来。

然后打开 CMD 或 PowerShell，输入：

```
 docker version
```

如果能看到 Docker 版本信息，说明 Docker 正常。

### 2. 创建 AstrBot 数据目录

在 Windows 上创建这个目录：

```
 D:\app\Products\QQ聊天机器人\astrbot\data
```

如果你想换成别的路径也可以，但是后面的 Docker 命令也要一起改。

### 3. 启动 AstrBot 容器

在 CMD 或 PowerShell 执行：

```
 docker run -d --name astrbot ^
   -p 6185:6185 ^
   -p 6199:6199 ^
   -v "D:\app\Products\QQ聊天机器人\astrbot\data:/AstrBot/data" ^
   m.daocloud.io/docker.io/soulter/astrbot:latest
```

参数说明：

|参数|作用|
|---|---|
|​--name astrbot​|容器名字叫 astrbot|
|​-p 6185:6185​|AstrBot 后台页面端口|
|​-p 6199:6199​|NapCat 连接 AstrBot 的通信端口|
|​-v ...:/AstrBot/data​|把 AstrBot 数据保存到 Windows 本地|
|​soulter/astrbot:latest​|AstrBot 镜像|

如果镜像下载失败，可以重新执行一次，或者换个网络再试。

### 4. 打开 AstrBot 后台

浏览器访问：

```
 http://127.0.0.1:6185
```

能打开 AstrBot 后台，说明 AstrBot 启动成功。

## 四、配置大模型

进入 AstrBot 后台后，先配置大模型。

大概位置一般是：

```
 服务提供商 / 模型配置 / Provider
```

不同版本页面名称可能有一点差别，找到“模型”“服务提供商”“Provider”相关页面即可。

### 1. 添加模型服务商

选择添加一个兼容 OpenAI 格式的模型服务商。

常见需要填写：

|配置项|填什么|
|---|---|
|API Key|你申请到的模型 API Key|
|Base URL|模型平台提供的接口地址|
|Model ID|模型名称，例如deepseek-chat​、mimo-v2.5-pro​、qwen-plus​|
|是否启用|开启|

如果你用的是小米、DeepSeek、阿里云百炼，只要平台支持 OpenAI 兼容接口，就按平台给你的地址和模型 ID 填。

### 2. 设置默认对话模型

添加模型后，要把它设置成默认对话模型。

大概位置类似：

```
 默认模型 / 默认对话模型 / LLM 默认模型
```

选择刚才添加的模型，然后保存。

### 3. 测试模型是否能回复

在 AstrBot 后台找测试聊天窗口，随便发一句：

```
 你好
```

如果能正常回复，说明模型配置成功。

如果后台测试都不能回复，先不要配置 QQ，先检查：

1. API Key 是否正确。
2. Base URL 是否正确。
3. Model ID 是否正确。
4. 是否设置了默认对话模型。
5. 账号余额或免费额度是否可用。

## 五、下载并安装 NapCat

NapCat 是用来登录机器人 QQ 的。

没有 NapCat，AstrBot 本身不能直接登录 QQ，也就不能收到 QQ 消息。

### 1. 打开 NapCat 下载页面

打开 NapCat 的 GitHub Releases 页面：

```
 https://github.com/NapNeko/NapCatQQ/releases
```

找到最新版本的 Assets 附件。

### 2. 下载 Windows 一键包

在 Assets 里下载这个文件：

```
 NapCat.Shell.Windows.OneKey.zip
```

也可以直接打开这个地址下载最新版：

```
 https://github.com/NapNeko/NapCatQQ/releases/latest/download/NapCat.Shell.Windows.OneKey.zip
```

下载完成后，把压缩包解压到一个路径简单的目录，例如：

```
 D:\app\Products\QQ聊天机器人\napcat
```

建议路径不要太复杂，也尽量不要放到系统盘权限很严格的目录里。

### 3. 运行 NapCat 安装器

进入解压后的 NapCat 目录，找到并双击运行：

```
 NapCatInstaller.exe
```

它会自动下载并准备 QQ 和 NapCat 需要的文件。

运行完成后，目录里一般会生成一个类似下面名字的文件夹：

```
 NapCat.xxxxx.Shell
```

中间的数字可能不一样，不用管，看到类似的文件夹就行。

### 4. 启动 NapCat

进入刚才生成的目录：

```
 NapCat.xxxxx.Shell
```

然后双击运行：

```
 napcat.bat
```

运行后会弹出命令行窗口。

不要关闭这个窗口，NapCat 运行时需要它一直开着。

### 5. 登录机器人 QQ

NapCat 启动后，会让你登录 QQ。

按提示操作即可，一般是扫码登录。

登录成功后，命令行里会继续输出 NapCat 日志。

只要机器人 QQ 登录成功，NapCat 这一部分就算跑起来了。

## 六、打开 NapCat WebUI

NapCat 启动后，命令行窗口里一般会出现类似这样的内容：

```
 WebUi Publish Panel Url: http://127.0.0.1:6099/webui?token=xxxxxx
```

复制这个地址到浏览器打开。

注意：

1. 你的 token 会和示例不一样。
2. 要复制你自己命令行窗口里显示的完整地址。
3. 如果浏览器打不开，先确认 napcat.bat​ 窗口没有关闭。

打开后，你就能进入 NapCat 的网页管理界面。

## 七、让 NapCat 连接 AstrBot

这一步是最关键的。

NapCat 负责收到 QQ 消息，但它要把消息转发给 AstrBot，AstrBot 才能调用模型回复。

### 1. 进入网络配置

在 NapCat WebUI 中找到：

```
 网络配置
```

然后找到类似下面的配置项：

```
 WebSocket 客户端
```

或者：

```
 反向 WebSocket
```

不同版本页面叫法可能略有差别，但关键词就是：

```
 WebSocket 客户端
```

### 2. 新增 WebSocket 客户端

新增一个 WebSocket 客户端配置。

填写：

|配置项|填写内容|
|---|---|
|名称|随便写，例如astrbot​|
|地址 / URL|​ws://127.0.0.1:6199/ws​|
|Access Token|新手先留空|
|是否启用|开启|

最重要的是地址：

```
 ws://127.0.0.1:6199/ws
```

如果这个地址不行，可以再试：

```
 ws://localhost:6199/ws
```

一般 Windows 本机运行 NapCat，Docker 运行 AstrBot，用 127.0.0.1​ 就可以。

### 3. 保存并启用

保存配置后，启用这个 WebSocket 客户端。

如果连接成功，NapCat 页面或日志里会显示 WebSocket 连接成功。

如果连接失败，先检查：

1. AstrBot 容器是否还在运行。
2. Docker 命令里有没有映射 6199​ 端口。
3. WebSocket 地址有没有写错。
4. AstrBot 里的 QQ / OneBot 平台是否已经启用。

## 八、在 AstrBot 里启用 QQ 平台

回到 AstrBot 后台，找到消息平台相关页面。

可能叫：

```
 消息平台 / 平台适配器 / Platform
```

然后添加或启用：

```
 OneBot v11 / aiocqhttp / QQ
```

常见配置如下：

|配置项|建议填写|
|---|---|
|平台类型|OneBot v11 / aiocqhttp / QQ|
|监听地址|​0.0.0.0​或保持默认|
|端口|​6199​|
|Access Token|新手先留空|
|是否启用|开启|

保存后，如果没有立即生效，可以重启 AstrBot：

```
 docker restart astrbot
```

## 九、测试能不能聊天

用你自己的 QQ 给机器人 QQ 发一句：

```
 你好
```

如果正常，流程应该是：

1. 你的 QQ 发消息给机器人 QQ。
2. NapCat 收到 QQ 消息。
3. NapCat 通过 WebSocket 把消息发给 AstrBot。
4. AstrBot 调用大模型生成回复。
5. AstrBot 把回复交给 NapCat。
6. NapCat 用机器人 QQ 发回消息。

只要机器人能回复，就说明最小搭建成功。

## 十、常见问题

### 1. AstrBot 后台打不开

先检查容器是否在运行：

```
 docker ps
```

如果看不到 astrbot​，说明容器没启动成功。

查看日志：

```
 docker logs astrbot
```

如果提示端口被占用，可以换端口，或者关掉占用端口的软件。

### 2. Docker 提示容器名已存在

如果你之前已经创建过 AstrBot 容器，再次运行 docker run​ 可能会提示名字重复。

可以先删除旧容器：

```
 docker rm -f astrbot
```

然后重新执行启动命令。

注意：只要你的数据目录还在，本地配置一般不会因为删除容器丢失。

### 3. 后台测试模型不能回复

优先检查：

1. API Key 是否正确。
2. Base URL 是否正确。
3. Model ID 是否正确。
4. 是否设置默认对话模型。
5. 平台额度是否用完。

后台模型测试不成功，QQ 端也不会正常回复。

### 4. NapCat 下载太慢或下载失败

可以多试几次 GitHub Releases 页面。

也可以换网络后重新下载。

下载文件名重点看这个：

```
 NapCat.Shell.Windows.OneKey.zip
```

不要下错成源码压缩包，例如 Source code.zip​。

### 5. NapCat 启动后找不到 WebUI 地址

看 napcat.bat​ 打开的命令行窗口。

找到类似：

```
 WebUi Publish Panel Url: http://127.0.0.1:6099/webui?token=xxxxxx
```

复制完整地址到浏览器。

如果没看到，可以往上翻命令行日志。

### 6. NapCat 显示 WebSocket 连接失败

重点检查 WebSocket 地址：

```
 ws://127.0.0.1:6199/ws
```

还要确认 AstrBot 容器启动时映射了端口：

```
 -p 6199:6199
```

如果没有映射 6199，NapCat 就连不上 AstrBot。

### 7. QQ 能收到消息，但机器人不回复

按顺序检查：

1. NapCat 是否登录了机器人 QQ。
2. NapCat WebSocket 是否连接成功。
3. AstrBot 的 QQ / OneBot 平台是否启用。
4. AstrBot 是否设置了默认对话模型。
5. AstrBot 后台测试聊天是否正常。

### 8. QQ 突然离线

一般是 QQ 登录状态失效、被挤下线，或者 NapCat / QQ 客户端异常。

处理方法：

1. 重新打开 NapCat。
2. 重新登录机器人 QQ。
3. 确认 QQ 在线后，再测试发消息。