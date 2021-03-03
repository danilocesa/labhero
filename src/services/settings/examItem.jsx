import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export default async function fetchExamList(sectionId, specimenId) {
	let examList = null;

	try{
		const content = {
			method: API_GET_METHOD,
			url: `lab/ExamItem/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		examList = data;
	}
	catch(error) {
		Message.error();
	}

	return examList;
}

export async function fetchSections() {
	let sections = [];

	try {
		const url = `lab/Section`;

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;

		sections = data;
	} catch (e) {
		Message.error();
	}

	return sections;
}

export async function fetchSpecimens() {
	let specimens = [];

	try {
		const url = `lab/Specimen`;

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;

		specimens = data;
	} catch (e) {
		Message.error();
	}

	return specimens;
}

export async function fetchExamitems(sectionId, specimenId) {
	let examItems = [];

	try {
		const url = `lab/ExamItem/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`; 

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;
	
		examItems = data || [];
	} catch (e) {
		Message.error();
	}

	return examItems;
}

export async function fetchExamItem(scid, spid, emid) {
	let examItem = null;

	try {
		const url = `/lab/ExamItem/Settings/SectionID/${scid}/SpecimenID/${spid}/ExamItemID/${emid}`; 

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;
	
		examItem = data || null;
	} catch (e) {
		Message.error();
	}

	return examItem;
}

export async function createExamItem(examItem) {
	let createdExamItem;

	try{
		const content = {
			method: API_POST_METHOD,
			url: 'lab/ExamItem',
			data: examItem
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		createdExamItem = data;
	}
	catch(error) {
		Message.error();
	}

	return createdExamItem;
}

export async function updateExamItem(examItem) {
	let updatedExamItem;

	try{
		const content = {
			method: API_PUT_METHOD,
			url: 'lab/ExamItem',
			data: examItem
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		updatedExamItem = data;
	}
	catch(error) {
		Message.error();
	}

	return updatedExamItem;
}



