import React, { useState, useEffect } from 'react';

export const InteractiveCode = ({ code }) => {
  const [result, setResult] = useState('加载中...');

  useEffect(() => {
    try {
      // 使用 eval 来执行代码字符串
      // 注意：在生产环境中使用 eval 可能存在安全风险
      const output = eval(code);
      setResult(String(output));
    } catch (error) {
      setResult(`错误: ${error.message}`);
    }
  }, [code]);

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', marginTop: '10px' }}>
      <pre>{result}</pre>
    </div>
  );
};