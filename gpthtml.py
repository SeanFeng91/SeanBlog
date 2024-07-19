import openai

# 配置OpenAI API
openai.api_key = 'your_api_key_here'
base_url = "https://api.moonshot.cn/v1"

def generate_chat_html():
    response = openai.ChatCompletion.create(
        model="moonshot-v1-8k",
        messages=[
            {"role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手..."},
            {"role": "user", "content": "你好，我叫李雷，1+1等于多少？"}
        ],
        temperature=0.3
    )

    answer = response['choices'][0]['message']['content']

    html_content = f"""
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">与AI聊天</h1>
        <div class="flex flex-col gap-4">
            <input
                type="text"
                id="user-input"
                placeholder="输入你的消息..."
                class="p-2 border rounded"
            />
            <button id="send-button" class="bg-blue-500 text-white p-2 rounded">发送</button>
        </div>
        <div id="chat-response" class="mt-4 p-4 border rounded">
            <p>用户: 你好，我叫李雷，1+1等于多少？</p>
            <p>AI: {answer}</p>
        </div>
    </div>
    """

    with open("output/chat.html", "w", encoding="utf-8") as file:
        file.write(html_content)

if __name__ == "__main__":
    generate_chat_html()
