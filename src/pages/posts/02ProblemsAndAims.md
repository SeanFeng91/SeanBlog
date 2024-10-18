---
layout: ../../layouts/MarkdownPostLayout.astro
title: '我的网页待解决事项清单'
author: 'Sean Feng'
description: "这篇文章内的清单会不断更新和变化，清单会在首页的Working on板块展示，完成的事项我会放入Achieved模块。"
image:
  url: "https://docs.astro.build/default-og-image.png"
  alt: "The word astro against an illustration of planets and stars."
pubDate: 2024-07-08
tags: ["astro", "problems", "astro"]
---
主要包括以下几大板块：

1. md文章撰写格式类问题
2. Astro&TailwindCSS&JS系列问题（明确的）
3. 代码编写技术类问题（如VScode使用）
4. 不明确的难分类问题

近期待解决、研究的问题
## 尝试接入Qanything，做一个问答助手
## 修复kimi页面，保障可以做到问答和文件问答
## 整理一些好看照片，丰富相册
## 使用体验一下海螺大模型
## 

<!-- - [ ] 小屏幕模式下博客目录导航fixed无法滚动，下面的标题会显示不出来。
- [ ] 优化小屏幕模式左侧导航栏样式
- [ ] iphone平面会多一个右侧pd，不知道哪个样式带出来的，电脑看不出。
- [ ] 增加渐变色之后夜间模式有好多要修复的bug。
- [ ] 简化问题记录、日志记录、解决方案记录的模式。
- [ ] 体验astro的图片存储、使用体系。
- [ ] 侧边栏小屏幕灰色框放平面尺寸后大不消失问题好像又来了 对leftsidebar使用lg:hidden 还是不能取消灰色背景 -->


<!-- 
# 1. md文章撰写格式类问题
不对，现在是在首页靠目录记录问题，意味着我需要用四级标题简单概况问题，然后用正文具体描述问题，有点费劲

# 2. Astro&TailwindCSS&JS系列问题

## 2.1 Html's Problem

### 2.1.1 **Header**

1. header顶部有个半透明条，初次滚动的时候好像没有，然后点击右侧导航，会出现【已经初步解决，m-4导致的】。
![alt text](./Pic-PageProblemRecord/image-1.png)

### 2.1.2 **Sidebar**

>现在最大难点就是导航栏实现Markdown的目录树功能。已经使用getHeadings()[0].text解决读取目录树，主要待解决问题：

- 实现目录树跟随页面滚动进度

- 目录树的anchor位置过高，于页面顶端的bug

- 读取当前blog目录树

- 左侧目录树在小屏幕情况下改为breadcrumb

- 左侧导航栏的优化

### 2.1.3 **Body**

- blog页面还是存在最大高度问题。body的页面总高度大于当前可见高度。会出现额外不必要的滚动条
- 在[**图册**](/SeanBlog/about/)页面尝试Grid布局

- 左侧导航栏的优化：能否实现折? round-corner？色彩更一致

- 为主页添加各类功能，主要用于展示

- 未来记录文章长了还是要引入tag机制

- 设计博客页面

- 将测试页面隐藏入测试功能，并规划测试功能页面


## 2.2 CSS's Problem

-【问题】首页和博客页会因为有无最右侧滚动条而有差别，如何做到首页显示-隐藏滚动条

-【问题】顶部导航栏“首页”等颜色未根据页面切换而切换状态

-【尝试】在[**图册**](/SeanBlog/about/)页面尝试Grid布局

- 左侧目录树在小屏幕情况下改为breadcrumb


## 2.3 JS's Problem
- 读取当前blog目录树，并且实现目录树跟随页面滚动进度

# 3. 代码编写类问题
- ☆☆☆需要开始给页面的每个部分增加注释在增加新的功能之前 -->


