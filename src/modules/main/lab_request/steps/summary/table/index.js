import React from 'react';
import { Table, Row, Col } from 'antd';
import { globalTableSize } from 'global_config/constant-global';
import { LR_SEL_EXAMS, LR_OTHER_INFO } from 'modules/main/lab_request/steps/constants';
import { fetchExamsByReqId } from 'services/lab_request/labRequest';

import './table.css';

const columns = [
	{
		title: 'PANEL',
		dataIndex: ['selectedPanel', 'panelName'],
		width: 200,
		// align: 'center',
	},
	{
		title: 'SECTION',
		dataIndex: ['selectedSection', 'sectionName'],
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
		dataIndex: ['selectedSpecimen', 'specimenName'],
		width: 200,
		// align: 'center',
		render: text => text.toString().toUpperCase()
	}
];

class SummaryTable extends React.Component {
	state = {
		exams: []
	}
	
	async componentDidMount() {
		const sessionExams = sessionStorage.getItem(LR_SEL_EXAMS);
		// Variables for Edit Module
		const otherInfo = sessionStorage.getItem(LR_OTHER_INFO);
		const requestID = otherInfo ? JSON.parse(otherInfo).requestID : null;


		// Store selected exams from api to session storage
		// This will trigger if session exam has no value
		// and when user is in edit module.
		// Specifically when user jump to summary page using the steps link 
		if(!sessionExams && requestID) {
			const qexams = await fetchExamsByReqId(requestID);
			let zexams = [];

			qexams.forEach(tier1 => {
				tier1.contents.forEach(tier2 => {
					const tmpRoot = {};
					const tmpPanel = {};
					const tmpSpecimen = {};
					const tmpSection = {};

					tmpSpecimen.specimenID = tier1.specimenID;
					tmpSpecimen.specimenName = tier1.specimenName;

					tmpSection.sectionID = tier1.sectionID;
					tmpSection.sectionName = tier1.sectionName;
					tmpSection.sectionCode = tier1.sectionCode;

					tmpPanel.panelID = tier2.panelID;
					tmpPanel.panelName = tier2.panelName;
					tmpPanel.panelCode = tier2.panelCode;

					tmpRoot.examID = tier2.examID;
					tmpRoot.examName = tier2.examRequestName;
					tmpRoot.examCode = tier2.examRequestCode;
					tmpRoot.selectedPanel = tier2.panelID ? tmpPanel : null;
					tmpRoot.selectedSpecimen = tmpSpecimen;
					tmpRoot.selectedSection = tmpSection;
					tmpRoot.isDisabled = false;
					tmpRoot.isLocked = tier1.status !== "Open";

					zexams.push(tmpRoot);
				});
			});

			sessionStorage.setItem(LR_SEL_EXAMS, JSON.stringify(zexams));
		}

		const cachedExams = JSON.parse(sessionStorage.getItem(LR_SEL_EXAMS));
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
							size={globalTableSize}
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
