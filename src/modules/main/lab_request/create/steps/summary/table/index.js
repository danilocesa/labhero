import React from 'react';
import { Table, Row, Col } from 'antd';

import { CLR_SEL_EXAMS } from '../../constants';

import './table.css';

const columns = [
	{
		title: 'PANEL',
		dataIndex: 'selectedPanel.panelName',
		width: '25%',
		// align: 'center',
	},
	{
		title: 'SECTION',
		dataIndex: 'selectedSection.sectionName',
		width: '25%',
	},
	{
		title: 'EXAM NAME',
		dataIndex: 'examName',
		width: '25%',
		// align: 'center',
	},
	{
		title: 'SPECIMEN',
		dataIndex: 'selectedSpecimen.specimenName',
		width: '25%',
		// align: 'center',
	}
];

class SummaryTable extends React.Component {
	state = {
		exams: []
	}
	
	UNSAFE_componentWillMount() {
		const cachedExams = JSON.parse(sessionStorage.getItem(CLR_SEL_EXAMS));
		const exams = cachedExams.map(cachedExam => ({ ...cachedExam, key: cachedExam.examID }));

		this.setState({ exams });
	}
	
	render() {
		const { exams } = this.state;

		return (
			<Row style={{ marginTop: 20 }}>
				<Col sm={{ span: 24 }} lg={{ span: 18, offset: 3 }}>
					<div className="summary-step-table">
						<Table 
							dataSource={exams} 
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
