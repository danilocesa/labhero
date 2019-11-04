import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';

export async function fetchSections() {
	let sections = [];

	try {
		const url = `lab/Section`;

		const response = await axiosCall({ method: 'GET', url });
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

		const response = await axiosCall({ method: 'GET', url });
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

		const response = await axiosCall({ method: 'GET', url });
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

		const response = await axiosCall({ method: 'GET', url });
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
			method: 'POST',
			url: 'lab/ExamItem',
			data: examItem
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

export async function updateExamItem(examItem) {
	let updatedExamItem;

	try{
		const content = {
			method: 'PUT',
			url: 'lab/ExamItem',
			data: examItem
		}

		const response = await axiosCall(content);
		const { data } = await response;

		updatedExamItem = data;
	}
	catch(error) {
		Message.error();
	}

	return updatedExamItem;
}

export async function getUnitOfMeasures() {
	let units;

	try{
		const content = {
			method: 'GET',
			url: 'api/UnitOfMeasure/ExamItems/Settings',
		}

		const response = await axiosCall(content);
		const { data } = await response;

		units = data;
	}
	catch(error) {
		Message.error();
	}

	return units;
}

export async function getInputTypeCode() {
	let inputTypeCodes;

	try{
		const content = {
			method: 'GET',
			url: 'api/InputType/ExamItems/Settings',
		}

		const response = await axiosCall(content);
		const { data } = await response;

		inputTypeCodes = data;
	}
	catch(error) {
		Message.error();
	}

	return inputTypeCodes;
}