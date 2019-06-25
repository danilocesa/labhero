import React from 'react';
import { Table, Row, Col } from 'antd';

import { CLR_SEL_EXAMS } from '../../constants';

import './table.css';

const columns = [
	{
		title: 'SECTION',
		dataIndex: 'section',
		width: '33%',
	},
	{
		title: 'EXAM NAME',
		dataIndex: 'exam',
		width: '33%',
		// align: 'center',
	},
	{
		title: 'SPECIMEN',
		dataIndex: 'specimen',
		width: '33%',
		// align: 'center',
	},
];

class SummaryTable extends React.Component {
	state = {
		tests: []
	}
	
	componentWillMount() {
		const tests = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));

		this.setState({ tests });
	}
	
	render() {
		const { tests } = this.state;

		return (
			<Row style={{ marginTop: 20 }}>
				<Col sm={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
					<div className="summary-step-table">
						<Table 
							dataSource={tests} 
							columns={columns} 
							pagination={false} 
							scroll={{ y: 260 }} 
						/>
					</div>
				</Col>
			</Row>
		);
	}
}

export default SummaryTable;
