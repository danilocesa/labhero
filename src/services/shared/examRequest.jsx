import Message from 'shared_components/message';
import { API_GET_METHOD, API_PUT_METHOD, API_POST_METHOD } from 'global_config/constant-global';
import { axiosLabAPI } from '../axios';


export async function fetchPerSpecimens(selectedSection) {
	let specimens = [];

	try {
		const url = `lab/ExamRequest/ids/${selectedSection}`;

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;

		specimens = data[0].perSpecimen;
	} catch (e) {
		Message.error();
	}

	return specimens;
}

export async function fetchExamRequests(sectionId, specimenId) {
	let examRequests = [];

	try {
		const url = `lab/ExamRequest/Settings/SectionID/${sectionId}/SpecimenID/${specimenId}`;
		
		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;
		
		examRequests = data || [];
		
	} catch (e) {
		Message.error();
	}

	return examRequests;
}

export async function fetchSelectedExamList(secID, specID, erID) {
	let examList = [];

	try{
		const content = {
			method: 'GET',
			url: `lab/ExamRequest/Settings/SectionID/${secID}/SpecimenID/${specID}/ExamRequestID/${erID}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;
		
		examList = data.examRequestItems || [];
	}
	catch(error) {
		Message.error();
	}

	return examList;
}

export async function fetchExamRequestList() {
	let data = null;
	
  try{
    const resp = await axiosLabAPI({
      method: API_GET_METHOD,
      url: 'lab/ExamRequest/Settings/'
		});
		
    data = resp;
  } 
  catch(e) {
    Message.error();
  }
  return data;
} 

export async function	updateExamRequest(examRequest) {
	let updatedExamRequest = null;

	try{
		const content = {
			method: API_PUT_METHOD,
			url: 'lab/ExamRequest',
			data: examRequest
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		updatedExamRequest = data;
	}
	catch(error) {
		Message.error();
	}

	return updatedExamRequest;
}

export async function createExamRequest(examItem) {
	let createdExamItem = null;

	try{
		const content = {
			method: API_POST_METHOD,
			url: 'lab/ExamRequest',
			data: { ...examItem }
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

