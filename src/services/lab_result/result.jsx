import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiPostMethod, apiGetMethod } from 'global_config/constant-global';

export async function fetchLabResult(payload) {
	try{
		const content = {
			method: apiPostMethod,
			url: `/lab/Result/searchresult`,
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}

export async function fetchLabResultExamItems(specimenId) {
	try{
		const content = {
			method: apiGetMethod,
			url: `/lab/Result/editresult/samplespecimenid/${specimenId}`,
		}

		const response = await axiosCall(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}

export async function saveLabResult(payload) {
	try{
		const content = {
			method: apiPostMethod,
			url: `/lab/Result/saveresult`,
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}
