import React from 'react';
import { Table, Radio } from 'antd';

import './specimen.css';

const RadioButton = Radio.Button;

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

class SpecimenList extends React.Component {
  expandedRowRender = () => {
    const columns = [
      {
        dataIndex: 'SpecimenList',
        key: 'SpecimenList',
        width:'25%',
      },
    ];
    const data = [];
    const testspecimenlist = ['CBC', 'Hemoglobin', 'Hematocrit'];
    for (let i = 1; i < 4; i+=1) {
      data.push({
        SpecimenList: testspecimenlist[Math.floor(Math.random() * testspecimenlist.length)],
      });
    }

    return (
	<div className="child-no-header-table">
		<Table
			columns={columns}
			dataSource={data}
			pagination={false}
			size="small"
		/>
	</div>
    );
  };


  render() {  
    const columns = [
    { 
      title: 'SPECIMEN', 
      dataIndex: 'Specimen', 
      key: 'Specimen',
    },
    { 
      title: 'STATUS',
      dataIndex: 'StatusPending', 
      key: 'Status',
      render: button => <RadioButton onClick={onChange} style={{ float: 'right' }}>{button}PENDING</RadioButton>,
    },
      {
        dataIndex: 'StatusExtracted', 
        key: 'Status',
        render: button => <RadioButton onClick={onChange}>{button}EXTRACTED</RadioButton>,
      } 
  ];
    const data = [];
    const testspecimen = ['Blood', 'Serum'];
    for (let i = 1; i < 15; i+=1) {
        data.push({
        Specimen: testspecimen[Math.floor(Math.random() * testspecimen.length)],
      });
    }
  return (
	<div>
		<Table
			columns={columns}
			expandedRowRender={this.expandedRowRender}
			dataSource={data}
			size="small"
			scroll={{ y: 300 }}
		/>
	</div>
    );
  }
}
export default SpecimenList;