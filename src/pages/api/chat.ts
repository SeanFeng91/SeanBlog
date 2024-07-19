import type { APIRoute } from 'astro';
import OpenAI from 'openai';

const apiKey = process.env.MOONSHOT_API_KEY;

console.log("读取到的API Key:", apiKey); // 打印API密钥

const client = new OpenAI({
    apiKey,
    baseURL: 'https://api.moonshot.cn/v1',
});

export const post: APIRoute = async ({ request }) => {
    const { message } = await request.json();

    console.log("接收到的消息:", message); // 打印接收到的消息

    try {
        const completion = await client.chat.completions.create({
            model: 'moonshot-v1-8k',
            messages: [
                { 
                    role: 'system', 
                    content: '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。'
                },
                { 
                    role: 'user', 
                    content: message 
                }
            ],
            temperature: 0.3,
        });

        console.log("API返回的结果:", completion.data.choices[0].message.content); // 打印API返回的结果

        return new Response(JSON.stringify({ reply: completion.choices[0].message.content }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("API调用错误:", error); // 打印错误信息
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
