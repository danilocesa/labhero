import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';

export async function createExamItemRage(payload) {
	let createdItemRange = null;

	try{
		const content = {
			method: apiPostMethod,
			url: `/lab/ExamItemRange`,
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		createdItemRange = data;
	}
	catch(error) {
		if(error.response.status === 400 && error.response.data.examItemID)
			Message.error('Exam Item Range with same Gender and Analyzer already exist');
		else
			Message.error();
	}

	return createdItemRange;
}

export async function updateExamItemRage(payload) {
	let isSuccess = null;

	try{
		const content = {
			method: apiPutMethod,
			url: `/lab/ExamItemRange`,
			data: payload
		}

		const response = await axiosCall(content);

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
			method: apiGetMethod,
			url: `/lab/ExamItemRange/Settings/Analyzers`,
		}

		const response = await axiosCall(content);
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
			method: apiGetMethod,
			url: `/lab/ExamItemRange/Settings/ExamItemID/${ExamItemID}`,
		}

		const response = await axiosCall(content);
		const { data } = await response;

		examItemRanges = data || [];
	}
	catch(error) {
		Message.error();
	}

	return examItemRanges;
}
