---
layout: ../../layouts/MarkdownPostLayout.astro
title: "创建网页问题记录"
author: Sean Feng
description: "此博客用于记录我编辑网页过程中出现的问题和进展情况，每天会进行相应的记录，尝试将最新的一篇放置在最顶端，这样可以看到最新的进展情况"
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

1. header顶部有个半透明条，初次滚动的时候好像没有，然后点击右侧导航，会出现【已经初步解决，m-4导致的】。
![alt text](./Pic-PageProblemRecord/image-1.png)

### 1.2 **Sidebar**

>现在最大难点就是导航栏实现Markdown的目录树功能。已经使用getHeadings()[0].text解决读取目录树，主要待解决问题：

- 实现目录树跟随页面滚动进度

- 目录树的anchor位置过高，于页面顶端的bug

- 读取当前blog目录树

- 左侧目录树在小屏幕情况下改为breadcrumb

- 左侧导航栏的优化

### 1.3 **Body**

1. blog页面还是存在最大高度问题。body的页面总高度大于当前可见高度。会出现额外不必要的滚动条




# CSS系列问题

1. 【问题】首页和博客页会因为有无最右侧滚动条而有差别，如何做到首页显示-隐藏滚动条

2. 【问题】顶部导航栏“首页”等颜色未根据页面切换而切换状态

3. 【尝试】在[**图册**](/SeanBlog/about/)页面尝试Grid布局


# JS系列问题

# 20240713记录
md没有办法实现标题的自动编号，所以对文章章节如果大幅度调整还需要构思一下怎么方便。
解决了以下bug：
1. 通过使用三元运算符语法jxs{condition ? trueExpression : falseExpression}而不是if语句实现了h1->h6的目录树分层



# 20240712记录
解决了以下bug：
1. 不同页面因为有无滚动条发生左右微跳的bug。在html里面overflow-y-stroll即可。这样每个页面在那个位置都会占位
2. 左侧导航栏复刻了Tailwind导航栏的样式，包含前面的|，悬浮
3. 左侧导航栏实现了选中时候状态的变化，并且想到通过打开的页面来判断的方法快速解决了什么时候该保留active状态的问题。在push到
github的时候还遇到了一点困难，因为关于pagelink判断问题，自动生成的link/和检测的link可能差了“/”导致开始没有复现local的效果
- [ ] 学些了单选框Markdown
- [x] 已经选择了
4. 通过路径判断实现了右侧导航根据当前md变化导航栏的问题，但是还没有区分不同层级的heading@Rightsidebar

# 2040711记录
今天主要解决一下几点
1. 在主页增加的grid系统，cards。card数量根据博客数量自动增加，并且每个card会读取blog的标题和描述，标题生成超链接转跳blog页面。
目前考了3列的cards，规定了每个cards的最小高度。设置了阴影等样式。

2. 顶部增加了目前待解决问题list和已经实现list。其中已经实现list采用了读取一个Achieved.md文件来实现。用了同样的读取标题目录的方法，滚动可视。

3. 尝试Blog页面问题：解决左右导航栏固定，中间Blog利用页面最右侧滚动轴翻阅。为此付出代价是左右的bar都要改成fixed。但是fixed之后就不会占据具体宽度。需要尝试固定div的宽度或者mx来解决。但是有会遇到自适应问题。尝试引入了grid-cols-3/5, cols-span-3, hidden等，都纯在一定的bug。目前暴力解决，只有lx以上才考虑两侧导航栏。【顶部增加breadcrumb解决左导航栏问题】再没有更好解决方案之前先可以不考虑隐藏后的右导航栏

>【页面宽度bug，max-w-8xl就无法正常控制总宽度】

- 彻底解决了max-w-8xl的问题，是因为tailwind的样式里面只有7xl了，没有对应的8xl。所以可以max-w-[90rem]，终于在宽度上实现了跟tailwind网页一样的效果。同时解决fixed的bug。tailwind的精准写法比sailboat的更准确。但是现在切回sailboat的sticky就不行了。anchor锚定位置过高的问题还没有很好的解决。


# 20240710记录 
今天开始通过页面记录的形式将遇到的问题和解决的方案进行记录。

>可以直接把图片复制到md文件，会生成一个链接。

    代码块没了？直接使用tab出现代码块好像有bug

实现了左侧导航栏自动读取所有博客目录，核心代码

尝试使用mdx，代码块跟之前不一样了。

>无法获取md文件的目录树

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
    