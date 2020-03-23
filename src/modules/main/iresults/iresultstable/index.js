// LIBRARY
import React from 'react';
import { Table, Card, Empty } from 'antd';

// CSS
import './iresults_table.css';

// CONSTANTS
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const currentDatetime = new Date();
const formattedDate = `${currentDatetime.getDate()} - ${months[currentDatetime.getMonth()]} - ${currentDatetime.getFullYear()} ${currentDatetime.getHours()} : ${currentDatetime.getMinutes()}`;

  

class App extends React.Component {	
  constructor(props) {
    super(props);
    this.state={
      selected:-1,
      selectedRowKeys:[],
    }
  }


	render() {
		// COLUMN HEADER
		const columnHeader = [
			{ title: 'RUN DATE', dataIndex: 'run_date', key: 'run_date', width: 150 },
			{ title: 'EXAM NAME', dataIndex: 'exam_name', key: 'exam_name',  width: 150 },
			{ title: ' ', dataIndex: 'full_exam_name', key: 'full_exam_name',  width: 200 },
			{ title: 'RESULTS', dataIndex: 'iresults_value', key: 'iresults_value',  width: 40 },
		];
      
		// COLUMN DATA
		const tableDataSource = [{
			key: 'p1',
			run_date: formattedDate,
			iresults_value: '',
			children: [
				{
					key:'c11',
					run_date: '',
					exam_name: 'hgb',
					full_exam_name: 'hemoglobin',
					iresults_value:'1',
				},
				{
					key:'c12',
					run_date: '',
					exam_name: 'hct',
					full_exam_name: 'hematocrit',
					iresults_value:'2',
				},
				{
					key:'c13',
					run_date: '',
					exam_name: 'rbc',
					full_exam_name: 'red blood cells',
					iresults_value:'3',
				},
				{
					key:'c14',
					run_date: '',
					exam_name: 'mcv',
					full_exam_name: 'mean corpuscular vol',
					iresults_value:'4',
				},
				{
					key:'c15',
					run_date: '',
					exam_name: 'mch',
					full_exam_name: 'mean corpuscular hgb',
					iresults_value:'5',
				},
				{
					key:'c16',
					run_date: '',
					exam_name: 'mchc',
					full_exam_name: 'mean corps hgb conc.',
					iresults_value:'6',
				}
			]
		},
		{
			key: 'p2',
			run_date: formattedDate,
			iresults_value: '',
			children: [
				{
					key:'c21',
					run_date: '',
					exam_name: 'sdfds',
					full_exam_name: 'hemogfsdfdsflobin',
					iresults_value:'7',
				},
				{
					key:'c22',
					run_date: '',
					exam_name: 'sdfdsfds',
					full_exam_name: 'dsfds',
					iresults_value:'8',
				},
				{
					key:'c23',
					run_date: '',
					exam_name: 'sf',
					full_exam_name: 'red dsfsdfdsfsdf cells',
					iresults_value:'9',
				},
				{
					key:'c24',
					run_date: '',
					exam_name: 'mcdsfdsfv',
					full_exam_name: 'sdfdsf corpuscular vol',
					iresults_value:'10',
        },
        {
					key:'c25',
					run_date: '',
					exam_name: 'mcdsfdsfv',
					full_exam_name: 'sdfdsf corpuscular vol',
					iresults_value:'10',
        },
			]
		}
    ];
    
  
		
		
		// EMPTY DATA
		const emptyTableData = <Card><Empty /></Card>
		return(
			<div className="iresultTable">
				<Table
					onRow={tableDataSource=>{
						return {
							onClick: () => {
								this.setState({
								selected: tableDataSource.key,
								selectedRowKeys: [(tableDataSource.key)], 
								});
							},
						};
					}}
						
					rowClassName={tableDataSource=>{
						return tableDataSource.key === this.state.selected ? 'clickRowStyl' : '';
					}}
					rowKey={tableDataSource => tableDataSource.key}
					columns={columnHeader}
					dataSource={tableDataSource || emptyTableData}
					size="small"
					scroll={{ y:300}}
					onChange={console.log(this.state.selectedRowKeys)}
				/>
			</div>
		);
	}
}

export default App;