import React from 'react';
import { Table, Row, Col } from 'antd';

import { CLR_SEL_EXAMS } from '../../constants';

const columns = [
	{
		title: 'PANEL',
		dataIndex: 'selectedPanel.panelName',
		width: 200,
		// align: 'center',
	},
	{
		title: 'SECTION',
		dataIndex: 'selectedSection.sectionName',
		width: 200,
	},
	{
		title: 'EXAM NAME',
		dataIndex: 'examName',
		width: 300,
		// align: 'center',
	},
	{
		title: 'SPECIMEN',
		dataIndex: 'selectedSpecimen.specimenName',
		// align: 'center',
	}
];

class SummaryTable extends React.Component {
	state = {
		exams: []
	}
	
	componentDidMount() {
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
							size="small"
							dataSource={exams} 
							columns={columns} 
							pagination={false}
						/>
					</div>
				</Col>
			</Row>
		);
	}
}

export default SummaryTable;
