import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart,
  Interval,
  Coordinate
} from 'bizcharts';
import { Empty } from 'antd';


export default function PieChart(props) {
  const cols = {
    count: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };

  return (
    <Chart 
      height={200} 
      data={props.data} 
      scale={cols} 
      width={250}
      pure
      autoFit
      placeholder={props.placeHolder || Empty}
    >
      <Coordinate type="theta" radius={0.75} />
      <Interval
        position="count"
        adjust="stack"
        color={['item', (item) => {
          
          if(item === 'Within 2 Hours')
            // #009645 - Green | #6395F9 - Blue
            return '#6395F9';

          if(item === 'Morethan 2 Hours')
            // #FFBC00- Yellow | #ff7979-  Red
            return '#ff7979';

            
          return '#CBDEFF'; 
        }]} 
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={['*', {
          content: (data) => data.count,
        }]}
      />
    </Chart>
  );
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    item: PropTypes.string,
    count: PropTypes.number
  })),
  placeHolder: PropTypes.node
};