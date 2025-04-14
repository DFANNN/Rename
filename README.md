<p align="center">
  <img src="./build/icon.png" width="120" alt="Logo">
</p>
<h1 align="center">DFAN Rename</h1>

<p align="center">
  一个为 Emby / Jellyfin / Plex 等媒体服务器量身打造的影视重命名工具，<br>
  让你的本地视频库刮削更精准，管理更轻松。
</p>

<p align="center">
  <a href="https://github.com/your-username/media-renamer/releases">
    <img src="https://img.shields.io/github/v/release/your-username/media-renamer.svg?style=flat-square" alt="Release">
  </a>
  <a href="https://github.com/your-username/media-renamer/issues">
    <img src="https://img.shields.io/github/issues/your-username/media-renamer.svg?style=flat-square" alt="Issues">
  </a>
  <a href="https://github.com/your-username/media-renamer">
    <img src="https://img.shields.io/github/downloads/your-username/media-renamer/total?style=flat-square" alt="Downloads">
  </a>
</p>

## 📝 简介

**DFAN Rename** 是一个桌面应用程序，旨在帮助用户将本地影视文件按照 Emby、Jellyfin、Plex 等媒体服务器所推荐的命名规范进行快速重命名，提高媒体刮削的准确性和自动化程度。

> 支持电视剧模式、批量替换、插入文本三种重命名方式。

## 🚀 功能特性

- ✅ 支持电视剧命名格式（如：`剧名 S01E01.mkv`）
- 🔁 支持批量替换文件名中的指定文本
- ✏️ 支持在文件名前后插入自定义文本
- 🎯 支持文件拖拽排序，手动调整文件顺序
- 🖥️ 图形化界面，操作简洁直观
- 🔄 预览修改结果，防止误操作
- 💻 跨平台支持：Windows / macOS / Linux

## 📥 下载与使用

你可以在 [Releases 页面](https://github.com/your-username/media-renamer/releases) 下载适用于你操作系统的最新版本，安装后即可使用：

| 系统平台   | 安装包下载地址                                                                  |
| ---------- | ------------------------------------------------------------------------------- |
| 🪟 Windows | [下载 EXE](https://github.com/your-username/media-renamer/releases/latest)      |
| 🍎 macOS   | [下载 DMG](https://github.com/your-username/media-renamer/releases/latest)      |
| 🐧 Linux   | [下载 AppImage](https://github.com/your-username/media-renamer/releases/latest) |

### 或者，你也可以自行构建和运行开发版本：

#### 1. 克隆项目

```bash
git clone https://github.com/your-username/media-renamer.git
cd media-renamer
```

#### 2. 安装依赖

```bash
pnpm install
```

#### 3. 启动开发环境

```bash
pnpm dev
```

#### 4. 构建生产版本

根据你的操作系统选择对应命令：

```bash
# Windows
pnpm build:win

# macOS
pnpm build:mac

# Linux
pnpm build:linux
```

## 📚 使用说明

### 📺 电视剧模式

> 将文件命名为标准的剧集格式，如 `剧名 S01E01.mkv`，方便媒体服务器自动识别。

#### 操作步骤：

1. 点击“选择文件夹”，选中包含剧集的视频文件夹。
2. 若你已知剧名、季数和起始集数，可直接填写；
3. 如果不确定剧集名称或季数，点击 **“TMDB 搜索”** 按钮，输入关键词即可快速搜索对应剧集，系统会自动获取准确的剧名和季数，避免命名错误；
4. 点击“预览修改结果”查看重命名后的文件格式；
5. 确认无误后点击“执行重命名”即可完成操作。

> 💡 使用 TMDB 搜索功能，可大幅提升命名准确率，刮削更顺利！

### 🔁 替换文本模式

> 替换文件名中指定的旧文本为新文本

#### 操作步骤：

1. 选择目标文件夹。
2. 输入旧文本与新文本。
3. 点击“预览修改结果”。
4. 满意后点击“执行重命名”。

### ✏️ 插入文本模式

> 在文件名前或后插入指定文本

#### 操作步骤：

1. 选择目标文件夹。
2. 输入要插入的文本，选择插入位置（开头/结尾）。
3. 预览修改结果。
4. 执行重命名操作。

## ⚠️ 注意事项

- 重命名前请务必备份重要文件，避免无法恢复。
- 本工具不会对视频内容做任何更改，仅修改文件名。

## 🙌 特别感谢

感谢 **小薯条** 提供的 Logo、想法与 UI 建议，为本项目注入了极大的灵感和美感提升！<br>
感谢你使用 **DFAN Rename**，希望它能帮助你更好地管理本地媒体库！
