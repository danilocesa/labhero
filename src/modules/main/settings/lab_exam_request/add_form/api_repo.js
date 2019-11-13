import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiGetMethod, apiPOSTMethod, apiExamRequest } from 'shared_components/constant-global';

export async function fetchExamList(sectionId, specimenId) {
	let examList = null;

	try{
		const content = {
			method: apiGetMethod,
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