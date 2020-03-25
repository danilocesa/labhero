import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';

export async function fetchAgeBracketList() {
	let ageBrackList = null;

	try{
		const content = {
			method: apiGetMethod,
			url: `lab/AgeBracket`,
		}

		const response = await axiosCall(content);
		const { data } = await response;

		ageBrackList = data;
	}
	catch(error) {
		Message.error();
	}

	return ageBrackList;
}


export async function createAgeBracket(payload) {
	let createdAgeBracket;

	try{
		const content = {
			method: apiPostMethod,
			url: '/lab/AgeBracket',
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		createdAgeBracket = data;
	}
	catch(error) {
		if(error.response && error.response.status === 400) {
			Message.error(error.response.data.error);
		}
		else { 
			Message.error(); 
		}
	}

	return createdAgeBracket;
}

export async function updateAgeBracket(payload) {
	let createdAgeBracket;

	try{
		const content = {
			method: apiPutMethod,
			url: '/lab/AgeBracket',
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		createdAgeBracket = data;
	}
	catch(error) {
		if(error.response && error.response.status === 400) {
			Message.error(error.response.data.error);
		}
		else { 
			Message.error(); 
		}
	}

	return createdAgeBracket;
}
