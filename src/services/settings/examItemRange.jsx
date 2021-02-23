import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export async function createExamItemRage(payload) {
	let createdItemRange = null;

	try{
		const content = {
			method: API_POST_METHOD,
			url: `/lab/ExamItemRange`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		createdItemRange = data;
	}
	catch(error) {
		if(error.response.status === 400 && error.response.data.examItemID)
			Message.error('Normal values already exist');
		else
			Message.error();
	}

	return createdItemRange;
}

export async function updateExamItemRage(payload) {
	let isSuccess = null;

	try{
		const content = {
			method: API_PUT_METHOD,
			url: `/lab/ExamItemRange`,
			data: payload
		}

		const response = await axiosLabAPI(content);

		isSuccess = response.status === 200;
	}
	catch(error) {
		Message.error();
	}

	return isSuccess;
}


export async function getAnalyzers() {
	let analyzers = [];

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/ExamItemRange/Settings/Analyzers`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		analyzers = data || [];
	}
	catch(error) {
		Message.error();
	}

	return analyzers;
}


export async function getAllItemRanges(ExamItemID) {
	let examItemRanges = [];

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/ExamItemRange/Settings/ExamItemID/${ExamItemID}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		examItemRanges = data || [];
	}
	catch(error) {
		Message.error();
	}

	return examItemRanges;
}
