import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';

export async function createRangeClass(payload) {
	let createdRangeClass = null;

	try{
		const content = {
			method: apiPostMethod,
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
			method: apiPutMethod,
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
			method: apiGetMethod,
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
