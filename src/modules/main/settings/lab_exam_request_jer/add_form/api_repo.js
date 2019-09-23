import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';

export async function fetchExamList(sectionId, specimenId) {
	let examList = null;

	try{
		const content = {
			method: 'GET',
			url: `lab/ExamItem/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`,
		}

		const response = await axiosCall(content);
		const { data } = await response;

		examList = data;
	}
	catch(error) {
		Message.error();
	}

	return examList;
}

export async function createExamRequest(examItem) {
	console.log("TCL: createExamRequest -> examItem", examItem)
	// eslint-disable-next-line no-throw-literal
	// throw 'test';

	let createdExamItem = null;

	try{
		const content = {
			method: 'POST',
			url: 'lab/ExamRequest',
			data: { ...examItem }
		}

		const response = await axiosCall(content);
		const { data } = await response;

		createdExamItem = data;
	}
	catch(error) {
		Message.error();
	}

	return createdExamItem;
}