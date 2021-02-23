import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export async function fetchAgeBracketList() {
	let ageBrackList = null;

	try{
		const content = {
			method: API_GET_METHOD,
			url: `lab/AgeBracket`,
		}

		const response = await axiosLabAPI(content);
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
			method: API_POST_METHOD,
			url: '/lab/AgeBracket',
			data: payload
		}

		const response = await axiosLabAPI(content);
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
			method: API_PUT_METHOD,
			url: '/lab/AgeBracket',
			data: payload
		}

		const response = await axiosLabAPI(content);
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
