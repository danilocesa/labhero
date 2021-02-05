import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_POST_METHOD, API_GET_METHOD } from 'global_config/constant-global';



export async function fetchExtracReqByPatientID({ requestDate, patientID }) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/SpecimenTracking/phlebo/requestdate/${requestDate}/patientid/${patientID}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}

export async function fetchExtracReqByPatientName({ requestDate, patientName }) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/SpecimenTracking/phlebo/requestdate/${requestDate}/patientname/${patientName}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}

export async function fetchExtracReqByDate({ requestDate }) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/SpecimenTracking/phlebo/requestdate/${requestDate}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}


export async function fetchRequestSpecimenToProcess(requestID) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/SpecimenTracking/phlebo/requestid/${requestID}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}

export async function checkinSpecimen(payload) {
	try{
		const content = {
			method: API_POST_METHOD,
      url: `/lab/SpecimenTracking/phlebo/checkinspecimen`,
      data: payload
		}

		const response = await axiosLabAPI(content);
		
		return response;
	}
	catch(error) {
		Message.error();
		return false;
	}
}


