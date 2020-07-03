import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate
} from 'bizcharts';

export default function Labelline() {
  const data = [
    { item: 'Pending', percent: 0.4 },
    { item: 'Within 2 Hours', percent: 0.21 },
    { item: 'Morethan 2 Hours', percent: 0.17 },
  ];

  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };


  return (
    <Chart height={400} data={data} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="percent"
        adjust="stack"
        color="item"
        // size={3}
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['*', {
          content: (data) => {
            return `${data.item}: ${data.percent * 100}%`;
          },
        }]}
      />
    </Chart>
  );
}