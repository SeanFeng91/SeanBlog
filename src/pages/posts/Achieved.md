---
layout: ../../layouts/MarkdownPostLayout.astro
title: '我已经实现的功能'
author: 'Sean Feng'
description: "以下列出了我目前逐渐通过学习在我的blog上实现的功能，我可以在日志中简化记录过程，对于专项实现的功能可以在这篇日志中记载，这样就不会出现两边都有记录的情况"
image:
  url: "https://docs.astro.build/default-og-image.png"
  alt: "The word astro against an illustration of planets and stars."
pubDate: 2024-07-11
tags: ["astro", "successes", "astro"]
---
## 实现了首页导入所有blog
## 实现了blog点击标题转跳具体页面
## 实现了grid系统
## 实现了box阴影功能、边框功能
## 实现了单选框list功能，并且可以保留选中项
## 改善working on事项添加方案，同样可以采用md文件模式 
## 滚动条设置统一的样式

        [&::-webkit-scrollbar]:w-2
		[&::-webkit-scrollbar-track]:rounded-full
		[&::-webkit-scrollbar-track]:bg-gray-100
		[&::-webkit-scrollbar-thumb]:rounded-full
		[&::-webkit-scrollbar-thumb]:bg-gray-300
		dark:[&::-webkit-scrollbar-track]:bg-neutral-700
		dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500

## 右侧滚动条占位
首页和博客页会因为有无最右侧滚动条而有差别，做到首页显示-隐藏滚动条
通过对html的overflow-y-scroll始终显示占位解决@20240712

## 右侧导航栏根据当前文档变化

    {allPosts.map((post, index) => {
            let currentPath = Astro.url.pathname;
              if (currentPath.endsWith('index.html')) {
                currentPath = currentPath.slice(0, -'index.html'.length);
              }
              if (currentPath.endsWith('/')) {
                currentPath = currentPath.slice(0, -1);
              }
            if (post.url === currentPath){
              const headings = post.getHeadings();
              return headings.map((heading, headingIndex) => (
              <Headingsofblog 
                url={`#${heading.slug}`} 
                getHeadings={heading.text} 
              />
            ))
            };         
          })} 

### · 通过条件函数实现目录分级
不能直接使用if函数，而要这样：

    {condition ? (
      <p>Condition is true</p>
    ) : (
      <p>Condition is false</p>
    )}

所以，我在HeadingsofBlog中增加了这样的判断

    {(depth === 1) ? (
      <li><a href={url}><span>{getHeadings}</span></a></li>
    ) : (depth ===2)?(
      <li><a href={url}><span class="pl-2">{getHeadings}</span></a></li>
    ) : (<li><a href={url}><span class="pl-6">{getHeadings}</span></a></li>
    )}


