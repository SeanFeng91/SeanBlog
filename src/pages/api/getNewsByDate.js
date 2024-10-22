import { query } from '../../lib/database.js';

export async function GET({ params, request }) {
  console.log('API route called');
  console.log('Full request URL:', request.url);
  const url = new URL(request.url);
  const date = url.searchParams.get('date');
  console.log('Requested date:', date);

  if (!date) {
    console.log('Date parameter is missing');
    return new Response(JSON.stringify({ error: 'Date parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // 修改查询以匹配日期格式
    const news = await query(`
      SELECT id, headline, publication_date, content, summary
      FROM news_teasers
      WHERE substr(publication_date, 1, 11) = ?
      ORDER BY publication_date DESC
    `, [date + '年']);
    
    console.log(`Found ${news.length} news items for date ${date}`);

    return new Response(JSON.stringify(news), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
