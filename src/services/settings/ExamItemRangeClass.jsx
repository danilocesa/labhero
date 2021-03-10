import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export async function createRangeClass(payload) {
	let createdRangeClass = null;

	try{
		const content = {
			method: API_POST_METHOD,
			url: `/lab/ExamItemRangeClass`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		createdRangeClass = data;
	}
	catch(error) {
    if(error.response && error.response.status === 400) {
			Message.error(error.response.data.error);
		}
		else { 
			Message.error(); 
		}
	}

	return createdRangeClass;
}

export async function updateRangeClass(payload) {
	let updatedRangeClass = null;

	try{
		const content = {
			method: API_PUT_METHOD,
			url: `/lab/ExamItemRangeClass`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		updatedRangeClass = data;
	}
	catch(error) {
    if(error.response && error.response.status === 400) {
			Message.error(error.response.data.error);
		}
		else { 
			Message.error(); 
		}
	}

	return updatedRangeClass;
}

export async function getAllRangeClass(payload) {
	let rangeClass = [];

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/ExamItemRangeClass`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		rangeClass = data;
	}
	catch(error) {
    Message.error();
	}

	return rangeClass;
}
