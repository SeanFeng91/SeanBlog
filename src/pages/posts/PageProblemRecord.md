---
layout: ../../layouts/MarkdownPostLayout.astro
title: "创建网页问题记录"
author: Sean Feng
description: "此页面用于记录我编辑网页过程中出现的问题和进展情况"
pubDate: 2024-07-10
image:
    url: ''
    alt: ''
tags: ["问题记录"]
---
>我从2024年7月4日开始，在丘可乐的建议下开始用Astro搭建我的Blog。但由于Html、CSS、JS知识浅薄，所以在编辑过程中遇到了不少问题。
>居然有AI写作功能！
# 一、MarkDown语法
简单的检索了以下三个网页，可以查询丰富的Markdown语法使用。
mdx和md的语法不一样，需要再补充一下mdx的语法


[markdown](https://markdown.p2hp.com/basic-syntax/index.html)

[Markdown基本语法](https://markdown.p2hp.com/basic-syntax/index.html)
约翰·格鲁伯设计文档中概述的Markdown元素。

[Markdown 语法指南 (Basic Syntax)](https://zhuanlan.zhihu.com/p/668256808)

# 二、HTML系列问题

## 1. 页面布局

### 1.1 **Header**

1. header顶部有个半透明条
![alt text](./Pic-PageProblemRecord/image-1.png)

### 1.2 **Sidebar**

>现在最大难点就是导航栏实现Markdown的目录树功能。大量的博客网页都有目录树，但是没有找到比较成熟的方案。Astro给出的remark-toc没有成功

- 实现目录树的读取

- 实现链接转跳

- 实现页面滚动进度跟随

### 1.3 **Body**

1. blog页面还是存在最大高度问题。body的页面总高度大于当前可见高度。会出现额外不必要的滚动条

2. 页面宽度bug，max-w-8xl就无法正常控制总宽度

    `section class="pt-14 lg:pt-24"`
    `div class="mx-auto max-w-7xl px-4 lg:flex"`


# CSS系列问题

1. 【问题】首页和博客页会因为有无最右侧滚动条而有差别，如何做到首页显示-隐藏滚动条

2. 【问题】顶部导航栏“首页”等颜色未根据页面切换而切换状态

3. 【尝试】在[**图册**](/SeanBlog/about/)页面尝试Grid布局


# JS系列问题

# 20240710记录 
今天开始通过页面记录的形式将遇到的问题和解决的方案进行记录。

>可以直接把图片复制到md文件，会生成一个链接。

    代码块没了？直接使用tab出现代码块好像有bug

实现了左侧导航栏自动读取所有博客目录，核心代码

尝试使用mdx，代码块跟之前不一样了。

今天最大的成功，右侧目录树完成，并且具有anchor功能。但是还没解决根据当前文档变换。
    
    {allPosts.map((post, index) => {
        const headings = post.getHeadings();
            return headings.map((heading, headingIndex) => (
                <Headingsofblog 
                    key={`${index}-${headingIndex}`} 
                    url={`#${heading.slug}`} 
                    getHeadings={heading.text} 
                />
        ));
    })}
    
    #核心用法是getHeadings()[].text，折腾了半天，通过GPT一步步得知：
    ---
    console.log()辅助输出检查
    ---

    <Headingsofblog url={`#${heading.getHeadings()[0].slug}`} getHeadings={heading.getHeadings()[0].text}/>

并且修正了多余的右侧导航栏滚动条
    