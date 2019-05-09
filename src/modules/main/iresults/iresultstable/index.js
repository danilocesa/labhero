// LIBRARY
import React from 'react';
import { Table } from 'antd';

// CONSTANTS
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const currentDatetime = new Date();
const formattedDate = `${currentDatetime.getDate()} - ${months[currentDatetime.getMonth()]} - ${currentDatetime.getFullYear()} ${currentDatetime.getHours()} : ${currentDatetime.getMinutes()}`;

class IresultsTable extends React.Component {
	render() {
		// PARENT COLUMN HEADER
		const pColumns = [
			{ title: 'RUN DATE', dataIndex: 'run_date', key: 'run_date', width: 200 },
			{ title: 'MACHINE ID', dataIndex: 'machine_id', key: 'machine_id', width: 200 },
			{ title: 'EXAM NAME', dataIndex: 'exam_name', key: 'exam_name',  width: 200 },
			{ title: ' ', dataIndex: 'full_exam_name', key: 'full_exam_name',  width: 200 },
			{ title: 'RESULTS', dataIndex: 'results', key: 'results',  width: 200 },
		];
			
		// PARENT COLUMN HEADER
		const coldatasource = [{
			key: '1',
			run_date: formattedDate,
			machine_id: 'DXH01(-00026)',
			results: ''
		}];

		// CHILD COLUMN FUNCTION
		function expandedRowRender() {
			const cColumn = [
				{
					title: '',
					dataIndex: 'c_exam_name',
					key: 'c_exam_name'
				},
				{
					title: '',
					dataIndex: 'c_full_exam_name',
					key: 'c_full_exam_name'
				},
				{
					title: '',
					dataIndex: 'c_result',
					key: 'c_result'
				},
			];
			const data = [];
			for (let i = 0; i < 3; i += 1) {
				data.push({
					key: i,
					c_exam_name: '2014-12-24 23:12:00',
					c_full_exam_name: 'This is production name',
					c_result: 'Upgraded: 56',
				});
			}
			return (
				<Table
					columns={cColumn}
					dataSource={data}
					pagination={false}
				/>
			);
		}

		return(
			<Table 
				columns={pColumns}
				dataSource={coldatasource}
				expandedRowRender={expandedRowRender}
			/>
		);
	}
}

export default IresultsTable;