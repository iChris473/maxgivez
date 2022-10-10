
import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function Charts() {
    const data = [
        {
          name: 'January',
          total: 400
        },
        {
            name: 'February',
            total: 600
        },
        {
            name: 'March',
            total: 800
        },
        {
            name: 'April',
            total: 300
        },
        {
            name: 'June',
            total: 400
        },
        {
            name: 'July',
            total: 500
        },
        {
            name: 'August',
            total: 800
        },
      ];
      

  return (
    <div className="p-4 mx-auto my-5 w-[98%] max-w-[700px] border rounded-md border-gray-200 shadow-md overflow-hidden">
      <h1 className="text-lg font-bold text-gray-400 mb-4">Last 6 Months (Revenue)</h1>
      <ResponsiveContainer width="100%" aspect={2/1}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
