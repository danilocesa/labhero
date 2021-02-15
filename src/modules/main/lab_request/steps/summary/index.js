import React from 'react';
import moment from 'moment';
import { createLabRequest, updateLabRequest } from 'services/lab_request/labRequest';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import PageTitle from 'shared_components/page_title';
import { moduleTitles, requestTypes } from 'modules/main/settings/lab_exam_request/settings';
import Restriction from 'modules/main/lab_request/steps/lr_restriction/restriction';
import Tracker from 'modules/main/lab_request/tracker';
import { 
	LR_SEL_EXAMS, 
	LR_OTHER_INFO, 
	LR_REQUEST_TYPE,
	LR_EDIT_SEL_EXAM_REF
} from 'modules/main/lab_request/steps/constants';
import SummarySection from './section';
import SummaryTable from './table';
import SummaryFooter from './footer';



class SummaryStep extends React.Component {
	state = {
		exams: [],
		otherInfo: {},
		user: {}
	}
	
	constructor(props) {
		super(props);

		// 4 is the stepnumber
		this.restriction = new Restriction(4);
	}

	async componentDidMount() {
		const exams = JSON.parse(sessionStorage.getItem(LR_SEL_EXAMS));
		const otherInfo = JSON.parse(sessionStorage.getItem(LR_OTHER_INFO));
		const user = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));
		const examRef = JSON.parse(sessionStorage.getItem(LR_EDIT_SEL_EXAM_REF));

		this.setState({ exams, user, otherInfo, examRef });
	}
	
	saveForCreate = async () => {
		const { otherInfo, exams, user } = this.state;
		const payloadExams = exams.map(exam => ({
			panelID: exam.selectedPanel ? exam.selectedPanel.panelID : 0,
			examID: exam.examID,
			priority: ''
		}));

		const payload = {
			...otherInfo,
			userID: user.userID,
			hospitalRequestID: otherInfo.hospitalID,
			exams: payloadExams,
		};
		
		return createLabRequest(payload);
	}

	saveForEdit = async () => {
		const { otherInfo, user, examRef, exams } = this.state;
		

		console.log(examRef, 'exams ref');
		console.log(exams, 'selected exams');

		const examRefIDs = examRef.map(item => item.examID);
		const selectedExamIDs = exams.map(item => item.examID);
		const newExams = [];
		const removedExams = [];

		exams.forEach(x => {
			if(examRefIDs.includes(x.examID) === false) 
				newExams.push({
					sectionID: x.selectedSection.sectionID,
					sampleID: x.selectedSpecimen ? x.selectedSpecimen.specimenID : '',
					sampleSpecimenID: x.selectedSpecimen ? x.selectedSpecimen.specimenID : '',
					panelID: x.selectedPanel ? x.selectedPanel.panelID : 0,
					examID: x.examID,
					priority: ''
				});
		});

		examRef.forEach(x => {
			if(selectedExamIDs.includes(x.examID) === false) 
				removedExams.push({
					sectionID: x.selectedSection.sectionID,
					sectionName: x.selectedSection.sectionName,
					sectionCode: x.selectedSection.sectionCode,
					specimenID: x.selectedSpecimen ? x.selectedSpecimen.specimenID : '',
					specimenName: x.selectedSpecimen ? x.selectedSpecimen.specimenName : '',
				});
		});

		const payload = {
			...otherInfo,
			requestDateTime: moment().format('yyyy-MM-DD hh:mm:ss'),
			userID: user.userID,
			exams: newExams,
			remove: removedExams,
			physicianID: otherInfo.physicianID ? otherInfo.physicianID : 0 
		};
		
		return updateLabRequest(payload);
	}

	render() {
		const { exams } = this.state;
		const { restriction } = this;
		const moduleTitle = (sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create) ? moduleTitles.create : moduleTitles.edit;

		if(restriction.hasAccess) {
			return (
				<div>
					<PageTitle pageTitle={moduleTitle} />
					<Tracker active={3} />
					<SummarySection />
					<SummaryTable exams={exams} />
					<br />
					<SummaryFooter 
						saveForCreate={this.saveForCreate} 
						saveForEdit={this.saveForEdit}
					/>
				</div>
			);
		}

		return restriction.redirect();
	}
}


export default SummaryStep;
