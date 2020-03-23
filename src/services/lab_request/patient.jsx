import Message from 'shared_components/message';
import { apiPostMethod, apiPatient } from 'global_config/constant-global';
import axiosCall from '../axiosCall';

export default async function createPatientInfo(personalInfo) {
	let createdPatient;
	try{
		const content = {
			method: apiPostMethod,
			url: apiPatient.url,
			data: personalInfo
		}

		const response = await axiosCall(content);
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