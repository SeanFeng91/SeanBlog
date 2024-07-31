import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import dagre from 'dagre';

const NetworkChart = () => {
  const svgRef = useRef();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    let isComponentMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch('../../../public/2024plan_processed_no_notes.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!isComponentMounted) return;

        // 数据预处理
        const startNode = { 
          id: 'start', 
          name: '开始', 
          start: new Date(Math.min(...data.map(task => new Date(task.Start)))),
          end: new Date(Math.min(...data.map(task => new Date(task.Start))))
        };
        const nodes = [startNode, ...data.map((task, index) => ({
          id: (index + 1).toString(),
          name: task.Name.trim(),
          start: new Date(task.Start),
          end: new Date(task.Finish),
          duration: task["Duration (days)"] || 1,
          critical: task.Critical
        }))];

        const links = data
          .filter(task => task.Predecessor !== null && task.Predecessor !== "")
          .map(task => ({
            source: Math.floor(task.Predecessor).toString(),
            target: nodes.findIndex(node => node.name === task.Name.trim()).toString()
          }))
          .filter(link => link.source !== '-1' && link.target !== '-1' && link.source !== link.target);

        // 添加从开始节点到没有前置任务的节点的连接
        const nodesWithoutPredecessor = nodes.filter(node => !links.some(link => link.target === node.id));
        nodesWithoutPredecessor.forEach(node => {
          if (node.id !== 'start') {
            links.push({ source: 'start', target: node.id });
          }
        });

        setDebugInfo(`节点数量: ${nodes.length}, 连接数量: ${links.length}`);

        if (nodes.length === 0 || links.length === 0) {
          throw new Error('没有找到有效的节点或连接');
        }

        // 创建SVG
        const margin = { top: 100, right: 50, bottom: 50, left: 100 };
        const width = 2500 - margin.left - margin.right;
        const height = 1500 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .html('') // 清除之前的内容
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        // 创建时间比例尺
        const timeScale = d3.scaleTime()
          .domain([d3.min(nodes, d => d.start), d3.max(nodes, d => d.end)])
          .range([0, width]);

        // 使用 dagre 进行布局计算
        const g = new dagre.graphlib.Graph();
        g.setGraph({ rankdir: 'LR', nodesep: 80, ranksep: 120 });
        g.setDefaultEdgeLabel(() => ({}));

        nodes.forEach(node => {
          g.setNode(node.id, { 
            label: node.name, 
            width: 250, 
            height: 60,
            x: timeScale(node.start) // 设置 x 坐标与时间对应
          });
        });

        links.forEach(link => {
          g.setEdge(link.source, link.target);
        });

        dagre.layout(g);

        // 更新节点位置
        nodes.forEach(node => {
          const nodeWithPos = g.node(node.id);
          node.x = nodeWithPos.x;
          node.y = nodeWithPos.y;
        });

        // 设置开始节点位置
        nodes.find(n => n.id === 'start').x = 0;
        nodes.find(n => n.id === 'start').y = height / 2;

        // 绘制连接线
        svg.append('g')
          .selectAll('line')
          .data(links)
          .enter()
          .append('line')
          .attr('x1', d => nodes.find(n => n.id === d.source).x)
          .attr('y1', d => nodes.find(n => n.id === d.source).y)
          .attr('x2', d => nodes.find(n => n.id === d.target).x)
          .attr('y2', d => nodes.find(n => n.id === d.target).y)
          .attr('stroke', '#999')
          .attr('stroke-opacity', 0.6)
          .attr('stroke-width', 1);

        // 绘制节点
        const node = svg.append('g')
          .selectAll('g')
          .data(nodes)
          .enter()
          .append('g')
          .attr('transform', d => `translate(${d.x},${d.y})`);

        const currentDate = new Date();

        node.append('rect')
          .attr('width', 250)
          .attr('height', 60)
          .attr('x', -125)
          .attr('y', -30)
          .attr('rx', 5)
          .attr('ry', 5)
          .attr('fill', d => {
            if (d.id === 'start') return '#4a4a4a';
            if (d.end < currentDate) return '#2ecc40'; // 已完成
            if (d.start <= currentDate && d.end >= currentDate) {
              const progress = (currentDate - d.start) / (d.end - d.start);
              return d3.interpolateRgb('#0074d9', '#2ecc40')(progress);
            }
            return 'white'; // 未开始
          })
          .attr('stroke', d => d.id === 'start' ? 'none' : '#0074d9')
          .attr('stroke-width', 2);

        node.append('text')
          .attr('dy', '-0.5em')
          .attr('text-anchor', 'middle')
          .text(d => d.name)
          .attr('font-size', '14px')
          .attr('fill', d => d.id === 'start' || d.end < currentDate || (d.start <= currentDate && d.end >= currentDate) ? 'white' : 'black')
          .call(wrap, 240);

        node.append('text')
          .attr('dy', '1.5em')
          .attr('text-anchor', 'middle')
          .text(d => {
            if (d.id === 'start') return '';
            return `${d.start.toLocaleDateString()} - ${d.end.toLocaleDateString()}`;
          })
          .attr('font-size', '12px')
          .attr('fill', d => d.id === 'start' || d.end < currentDate || (d.start <= currentDate && d.end >= currentDate) ? 'white' : 'black');

        // 添加时间轴
        const timeAxis = d3.axisTop(timeScale)
          .ticks(d3.timeMonth.every(1))
          .tickFormat(d3.timeFormat("%Y-%m"));

        svg.append("g")
          .attr("class", "time-axis")
          .attr("transform", `translate(0, -40)`)
          .call(timeAxis)
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em");

        // 添加缩放功能
        const zoom = d3.zoom()
          .scaleExtent([0.1, 4])
          .on('zoom', (event) => {
            svg.attr('transform', event.transform);
          });

        d3.select(svgRef.current).call(zoom);

        setIsLoading(false);
      } catch (error) {
        console.error("获取或处理数据时出错:", error);
        if (isComponentMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // 文本换行函数
    function wrap(text, width) {
      text.each(function() {
        let text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }

    return () => {
      isComponentMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div>
      <h2>网络图</h2>
      <p>{debugInfo}</p>
      <svg ref={svgRef} style={{width: '100%', height: '1000px', border: '1px solid #ccc'}}></svg>
    </div>
  );
};

export default NetworkChart;