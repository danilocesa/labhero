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

export async function fetchSelectedExamList(secID, specID, erID) {
	let examList = null;

	try{
		const content = {
			method: 'GET',
			url: `lab/ExamRequest/Settings/SectionID/${secID}/SpecimenID/${specID}/ExamRequestID/${erID}`,
		}

		const response = await axiosCall(content);
		const { data } = await response;
		
		examList = data.examRequestItems || [];
	}
	catch(error) {
		Message.error();
	}

	return examList;
}

export async function	updateExamRequest(examRequest) {
	let updatedExamRequest = null;

	try{
		const content = {
			method: 'PUT',
			url: 'lab/ExamRequest',
			data: examRequest
		}

		const response = await axiosCall(content);
		const { data } = await response;

		updatedExamRequest = data;
	}
	catch(error) {
		Message.error();
	}

	return updatedExamRequest;
}

