import React, { useEffect } from 'react';

const GanttChart = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/plan_data.json');
      const data = await response.json();
      const tasks = data.map((task, index) => ({
        id: index + 1, // id should start from 1
        text: task.Name,
        start_date: new Date(task.Start).toISOString().split('T')[0], // format date
        duration: task["Duration (days)"] || 1, // set default duration to 1 if missing
        progress: 0,
        parent: task.Predecessor === null ? 0 : task.Predecessor + 1, // set root parent if null
        critical: task.Critical
      }));

      gantt.init("gantt_here");
      gantt.parse({ data: tasks });
    };

    fetchData();
  }, []);

  return <div id="gantt_here" style={{ width: '100%', height: '500px' }}></div>;
};

export default GanttChart;
