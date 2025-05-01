import React from 'react';
import { PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


// Results Donut Chart
const COLORS = {
    win: "#4f46e5",
    loss:" #FF815D",
    draw: "#0082BC",
    dnf: "#3BA6B0",
    na: "#27187F"
  };

  const labelMap = {
    win: "Win",
    loss: "Loss",
    draw: "Draw",
    dnf: "Did Not Finish",
    na: "N/A"
  };
  
  const aggregateResults = (sessions) => {
    const resultCounts = {
      win: 0,
      loss: 0,
      draw: 0,
      dnf: 0,
      na: 0
    };
  
    sessions.forEach(session => {
      const rawResult = (session.result || "").toLowerCase();
      if (resultCounts.hasOwnProperty(rawResult)) {
        resultCounts[rawResult]++;
      } else {
        resultCounts.na++;
      }
    });
  
    return Object.keys(resultCounts)
      .filter(key => resultCounts[key] > 0)
      .map(key => ({
        name: labelMap[key],
        value: resultCounts[key],
        color: COLORS[key]
      }));
  };
  
  const ResultDonutChart = ({ sessions }) => {
    const data = aggregateResults(sessions);
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart >
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  export default ResultDonutChart;


  // Game count per month in current year
  export const GamesPerMonthChart = ({ sessions }) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const monthlyCounts = Array(12).fill(0);
  
    sessions.forEach(session => {
      const [yearStr, monthStr] = session.date.split('-'); 
      const year = parseInt(yearStr, 10);
      const month = parseInt(monthStr, 10) - 1;
    
      if (year === currentYear && month >= 0 && month <= 11) {
        monthlyCounts[month]++;
      }
    });
  
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    // Only include up to the current month
    const filteredMonthlyCounts = monthlyCounts.slice(0, currentMonth + 1);
    const filteredMonthNames = monthNames.slice(0, currentMonth + 1);

    const chartData = filteredMonthlyCounts.map((count, index) => ({
      month: filteredMonthNames[index],
      plays: count
    }));
  
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="plays" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

// Score over time line chart
export const ScoreOverTimeChart = ({ sessions }) => {
  const filtered = sessions
    .filter(session => Number.isFinite(session.score) && session.date)
    .map(session => {
      const [year, month, day] = session.date.split('-').map(Number);
      return {
        ...session,
        timestamp: new Date(year, month - 1, day).getTime()
      };
    })
    .sort((a, b) => a.timestamp - b.timestamp);

  const formatMonth = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, { month: 'short' });
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={filtered}>
        <XAxis
          dataKey="timestamp"
          type="number"
          domain={['dataMin', 'dataMax']}
          tickFormatter={formatMonth}
        />
        <YAxis allowDecimals={false} />
        <Tooltip
          labelFormatter={value =>
            new Date(value).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          }
        />
        <Line type="monotone" dataKey="score" stroke="#4f46e5" dot />
      </LineChart>
      </ResponsiveContainer>
  );
};
