import Message from 'shared_components/message';
import { API_POST_METHOD, apiPatient } from 'global_config/constant-global';
import { axiosLabAPI } from '../axios';

export default async function createPatientInfo(personalInfo) {
	let createdPatient;
	try{
		const content = {
			method: API_POST_METHOD,
			url: apiPatient.url,
			data: personalInfo
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		createdPatient = data;
	}
	catch(error) {
		if(error && error.response && error.response.data) {
			const { errors } = error.response.data;
			Object.keys(errors).forEach(key => { Message.error(errors[key]); });
		}

		createdPatient = null;
	}

	return createdPatient;
}