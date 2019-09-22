import axiosCall from 'services/axiosCall';
import Message from 'shared_components/message';

export async function fetchSection() {
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

export async function fetchExamRequest(sectionId, specimenId) {
	let examRequests = [];

	try {
		const url = `lab/ExamRequest/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`;
		
		const response = await axiosCall({ method: 'GET', url });
		const { data } = await response;
		
		examRequests = data;
	} catch (e) {
		Message.error();
	}

	return examRequests;
}