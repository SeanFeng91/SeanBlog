import asyncio
import json
import sqlite3
import os
from datetime import datetime, timedelta
from crawl4ai import AsyncWebCrawler
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy

# 创建数据库连接和表（如果不存在）
def create_database():
    conn = sqlite3.connect('/SeanBlog/src/lib/news_teasers.db')
    cursor = conn.cursor()
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS news_teasers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        headline TEXT,
        publication_date TEXT,
        content TEXT
    )
    ''')
    conn.commit()
    return conn

async def extract_news_teasers(start_id):
    schema = {
        "name": "AIbase News Article",
        "baseSelector": "div.pb-32",
        "fields": [
            {
                "name": "headline",
                "selector": "h1",
                "type": "text",
            },
            {
                "name": "publication_date",
                "selector": "div.flex.flex-col > div.flex.flex-wrap > span:nth-child(6)",
                "type": "text",
            },
            {
                "name": "content",
                "selector": "div.post-content",
                "type": "text",
            },
        ],
    }

    extraction_strategy = JsonCssExtractionStrategy(schema, verbose=True)

    conn = create_database()
    if not conn:
        print("无法创建数据库连接，程序退出")
        return

    cursor = conn.cursor()

    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            current_id = start_id
            today = datetime.now().date()
            
            while True:
                url = f"https://www.aibase.com/zh/news/{current_id}"
                try:
                    result = await crawler.arun(
                        url=url,
                        extraction_strategy=extraction_strategy,
                        bypass_cache=True,
                    )

                    if not result.success:
                        print(f"爬取页面 {url} 失败，跳过")
                        current_id -= 1
                        continue

                    news_teasers = json.loads(result.extracted_content)
                    
                    if not news_teasers:
                        print(f"页面 {url} 没有提取到新闻摘要，可能是无效页面，跳过")
                        current_id -= 1
                        continue

                    teaser = news_teasers[0]
                    
                    # 检查是否已存在相同标题的新闻
                    cursor.execute("SELECT * FROM news_teasers WHERE headline = ?", (teaser['headline'],))
                    if cursor.fetchone():
                        print(f"发现重复新闻：{teaser['headline']}，停止爬取")
                        break

                    # 解析并检查日期
                    pub_date = datetime.strptime(teaser['publication_date'], "%Y年%m月%d号 %H:%M").date()
                    if pub_date < today:
                        print(f"日期已经变为昨天（{pub_date}），停止爬取")
                        break

                    # 插入数据
                    cursor.execute('''
                    INSERT INTO news_teasers (headline, publication_date, content)
                    VALUES (?, ?, ?)
                    ''', (teaser['headline'], teaser['publication_date'], teaser['content']))
                    
                    conn.commit()
                    print(f"成功爬取并存储新闻：{teaser['headline']}")

                except Exception as e:
                    print(f"处理 {url} 时发生错误：{e}")

                current_id -= 1

    except Exception as e:
        print(f"爬取过程中发生错误: {e}")
    finally:
        if conn:
            conn.close()
    
    print("爬取完成")

if __name__ == "__main__":
    start_id = 12621  # 设置起始ID
    asyncio.run(extract_news_teasers(start_id))
