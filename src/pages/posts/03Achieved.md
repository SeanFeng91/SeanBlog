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

## MyGPT@Kimi-20240719

重点介绍了实现了页面版本kimi问答的script部分。

```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        // 页面加载时，加载历史对话记录
        loadChatHistory();

        // 为发送按钮绑定点击事件
        document.getElementById('send-button').addEventListener('click', sendMessage);

        // 为清除历史记录按钮绑定点击事件
        document.getElementById('clear-history-button').addEventListener('click', clearChatHistory);
    });

    // 加载并显示历史对话记录
    function loadChatHistory() {
        const chatBox = document.getElementById('chat-box');
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatBox.innerHTML = '';
        chatHistory.forEach(entry => {
            const messageDiv = document.createElement('div');
            messageDiv.className = entry.role === 'user' ? 'text-right text-blue-600 my-2' : 'text-left text-green-600 my-2';
            messageDiv.innerHTML = marked(entry.content); // 使用 marked 解析并渲染 Markdown
            chatBox.appendChild(messageDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动到聊天框底部
    }

    // 保存对话记录到 localStorage
    function saveChatHistory(role, content) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ role, content });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }

    // 清除 localStorage 中的对话记录，并清空聊天框内容
    function clearChatHistory() {
        localStorage.removeItem('chatHistory');
        document.getElementById('chat-box').innerHTML = '';
    }

    // 发送消息
    async function sendMessage() {
        const apiKey = document.getElementById('api-key-input').value;
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        const chatBox = document.getElementById('chat-box');

        // 检查 API 密钥和消息内容是否为空
        if (!apiKey) {
            alert("Please enter your API key.");
            return;
        }

        if (!message) {
            alert("Please enter a message.");
            return;
        }

        // 显示用户消息
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'text-right text-blue-600 my-2';
        userMessageDiv.textContent = message;
        chatBox.appendChild(userMessageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动到聊天框底部
        saveChatHistory('user', message); // 保存用户消息
        messageInput.value = ''; // 清空输入框

        // 准备请求体
        const requestBody = {
            model: "moonshot-v1-8k",
            messages: [
                { role: "system", content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。" },
                { role: "user", content: message }
            ],
            stream: true
        };

        try {
            // 发送请求到 Moonshot API
            const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            // 检查响应状态
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result = '';

            const assistantMessageDiv = document.createElement('div');
            assistantMessageDiv.className = 'text-left text-green-600 my-2';
            chatBox.appendChild(assistantMessageDiv);

            const processStream = async () => {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    // 解析并提取有用内容
                    const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
                    for (const line of lines) {
                        const jsonStr = line.replace(/^data: /, '');
                        if (jsonStr.trim() === '[DONE]') continue;
                        const parsedData = JSON.parse(jsonStr);
                        const content = parsedData.choices[0].delta.content;
                        if (content) {
                            result += content;
                            assistantMessageDiv.innerHTML = marked(result); // 解析并渲染Markdown
                            chatBox.scrollTop = chatBox.scrollHeight;  // 保持滚动到底部
                        }
                    }
                }
                saveChatHistory('assistant', result); // 保存助手消息
            };

            processStream().catch(error => {
                console.error('Error processing stream:', error);
            });

        } catch (error) {
            chatBox.textContent = `Fetch error: ${error.message}`;
        }
    }
</script>
```

### 详细解释

1. **页面加载事件处理函数**
    ```javascript
    document.addEventListener('DOMContentLoaded', () => {
        // 页面加载时，加载历史对话记录
        loadChatHistory();

        // 为发送按钮绑定点击事件
        document.getElementById('send-button').addEventListener('click', sendMessage);

        // 为清除历史记录按钮绑定点击事件
        document.getElementById('clear-history-button').addEventListener('click', clearChatHistory);
    });
    ```
    - 当页面加载完成时，执行这个函数。
    - 加载历史对话记录并显示。
    - 为发送按钮和清除历史按钮绑定点击事件。

2. **加载并显示历史对话记录**
    ```javascript
    function loadChatHistory() {
        const chatBox = document.getElementById('chat-box');
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatBox.innerHTML = '';
        chatHistory.forEach(entry => {
            const messageDiv = document.createElement('div');
            messageDiv.className = entry.role === 'user' ? 'text-right text-blue-600 my-2' : 'text-left text-green-600 my-2';
            messageDiv.innerHTML = marked(entry.content); // 使用 marked 解析并渲染 Markdown
            chatBox.appendChild(messageDiv);
        });
        chatBox.scrollTop = chatBox.scrollHeight; // 滚动到聊天框底部
    }
    ```
    - 从`localStorage`中获取历史对话记录并解析。
    - 将每条历史记录显示在聊天框中。
    - 使用`marked`解析Markdown内容。

3. **保存对话记录到 `localStorage`**
    ```javascript
    function saveChatHistory(role, content) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
        chatHistory.push({ role, content });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    ```
    - 将新的对话记录追加到现有的对话记录中，并保存回`localStorage`。

4. **清除 `localStorage` 中的对话记录，并清空聊天框内容**
    ```javascript
    function clearChatHistory() {
        localStorage.removeItem('chatHistory');
        document.getElementById('chat-box').innerHTML = '';
    }
    ```
    - 删除`localStorage`中的对话记录。
    - 清空聊天框的内容。

5. **发送消息**
```javascript
      async function sendMessage() {
          const apiKey = document.getElementById('api-key-input').value;
          const messageInput = document.getElementById('message-input');
          const message = messageInput.value.trim();
          const chatBox = document.getElementById('chat-box');

          // 检查 API 密钥和消息内容是否为空
          if (!apiKey) {
              alert("Please enter your API key.");
              return;
          }

          if (!message) {
              alert("Please enter a message.");
              return;
          }

          // 显示用户消息
          const userMessageDiv = document.createElement('div');
          userMessageDiv.className = 'text-right text-blue-600 my-2';
          userMessageDiv.textContent = message;
          chatBox.appendChild(userMessageDiv);
          chatBox.scrollTop = chatBox.scrollHeight; // 滚动到聊天框底部
          saveChatHistory('user', message); // 保存用户消息
          messageInput.value = ''; // 清空输入框

          // 准备请求体
          const requestBody = {
              model: "moonshot-v1-8k",
              messages: [
                  { role: "system", content: "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。" },
                  { role: "user", content: message }
              ],
              stream: true
          };

          try {
              // 发送请求到 Moonshot API
              const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${apiKey}`
                  },
                  body: JSON.stringify(requestBody)
              });

              // 检查响应状态
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }

              // 处理流式响应
              const reader = response.body.getReader();
              const decoder = new TextDecoder('utf-8');
              let result = '';

              const assistantMessageDiv = document.createElement('div');
              assistantMessageDiv.className = 'text-left text-green-600 my-2';
              chatBox.appendChild(assistantMessageDiv);

              const processStream = async () => {
                  while (true) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      const chunk = decoder.decode(value, { stream: true });
                      // 解析并提取有用内容
                      const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));
                      for (const line of lines) {
                          const jsonStr = line.replace(/^data: /, '');
                          if (jsonStr.trim() === '[DONE]') continue;
                          const parsedData = JSON.parse(jsonStr);
                          const content = parsedData.choices[0].delta.content;
                          if (content) {
                              result += content;
                              assistantMessageDiv.innerHTML = marked(result); // 解析并渲染Markdown
                              chatBox.scrollTop = chatBox.scrollHeight;  // 保持滚动到底部
                          }
                      }
                  }
                  saveChatHistory('assistant', result); // 保存助手消息
              };

              processStream().catch(error => {
                  console.error('Error processing stream:', error);
              });

          } catch (error) {
              chatBox.textContent = `Fetch error: ${error.message}`;
          }
      }
  </script>
```

### 关键点总结

- 页面加载时，初始化并绑定事件处理函数。
- 加载并显示历史对话记录。
- 发送消息，并在页面上显示用户和助手的消息。
- 处理流式响应，逐步解析和渲染Markdown内容。
- 保存和清除对话记录到`localStorage`。



## 右侧文章目录导航跟随文章阅读位置高亮对应目录标题
实现代码，会存在一些bug。比如现在observerOptions的rootMargin: '-20% 0px -50% 0px'，如果文章末尾有个比较短的章节，可能会无法取到。
还发现一个可以提升的就是，当目录树过长，势必需要多一个滚动，要不改成不显示滚动条的滚动？
```astro
    document.addEventListener('DOMContentLoaded', () => {
    // 实现右侧导航栏跟随文章标题联动高亮
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const rightsidebar = document.getElementById('rightsidebar');
    const rightbarLinks = rightsidebar.querySelectorAll('.rightbar-link');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -30% 0px', // 提前90%的视口高度开始检测
      threshold: 0.1, // 10%的部分进入视口即触发
    };
        // 获取链接的路径并去掉末尾的斜杠
    function getLinkPath(link) {
        // let linkPath = new URL(link.getAttribute('href'), window.location.origin).pathname;
        let linkPath = link.getAttribute('href')
        return linkPath;
        // return linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;
      }
    const observerCallback = (entries) => {
      let activeId = null;
      entries.forEach((entry) => {
        // 选择ul和所有目录项,这里处理的比较复杂，因为rightbarLinks[0]和linkPath对中文的显示不一样，
        // 只有循环里面的linkPath能跟`#${id}`比对.activeID可能也不是必须的。
        if (entry.isIntersecting) {
          activeId = entry.target.getAttribute('id');
        }
        const id = entry.target.getAttribute('id');
        const navItem = document.querySelector('a[href="#{id}"]');
        if(activeId){
            rightbarLinks.forEach(link => {
            const linkPath = getLinkPath(link);
            if (entry.isIntersecting && linkPath ===`#${id}`) {
              link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
          })
        }    
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    // 观察所有的标题
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
      observer.observe(heading);
    });
    // 初始页面加载时设置第一个标题的active状态-未实现
    });
```

## 目录树的anchor位置过高，于页面顶端的bug
## 顶部导航栏“首页”等颜色未根据页面切换而切换状态
## blog优化页面div，修复fixed遗留问题
## 实现了首页导入所有blog
## 实现了blog点击标题转跳具体页面
## 实现了grid系统
## 实现了box阴影功能、边框功能
## 实现了单选框list功能，并且可以保留选中项
## 改善working on事项添加方案，同样可以采用md文件模式 
## 滚动条设置统一的样式

```astro
    <div class="overflow-y-scroll [&::-webkit-scrollbar]:w-2
		[&::-webkit-scrollbar-track]:rounded-full
		[&::-webkit-scrollbar-track]:bg-gray-100
		[&::-webkit-scrollbar-thumb]:rounded-full
		[&::-webkit-scrollbar-thumb]:bg-gray-300
		dark:[&::-webkit-scrollbar-track]:bg-neutral-700
		dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500" />

```


## 右侧滚动条占位
首页和博客页会因为有无最右侧滚动条而有差别，做到首页显示-隐藏滚动条
通过对html的overflow-y-scroll始终显示占位解决@20240712

## 右侧导航栏根据当前文档变化
```astro
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
```

### · 通过条件函数实现目录分级
不能直接使用if函数，而要这样：
```astro
    {condition ? (
      <p>Condition is true</p>
    ) : (
      <p>Condition is false</p>
    )}

<!-- 所以，我在HeadingsofBlog中增加了这样的判断 -->

    {(depth === 1) ? (
      <li><a href={url}><span>{getHeadings}</span></a></li>
    ) : (depth ===2)?(
      <li><a href={url}><span class="pl-2">{getHeadings}</span></a></li>
    ) : (<li><a href={url}><span class="pl-6">{getHeadings}</span></a></li>
    )}
```

### · 通过js实现平滑滚动和定位偏移

```astro
    <script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // 去掉#
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
          console.error(`Element with ID ${targetId} not found`);
          return;
        }
        const header = document.getElementById('fixed-header');
        const headerHeight = 200;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerHeight;

        console.log(`Scrolling to ${targetId}`);  // 调试信息
        console.log(`Target element:`, targetElement);  // 调试信息

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
    </script>
```
