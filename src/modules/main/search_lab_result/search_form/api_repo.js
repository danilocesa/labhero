import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiPostMethod } from 'shared_components/constant-global';

export default async function fetchLabResult(payload) {
	let labResults = null;

	try{
		const content = {
			method: apiPostMethod,
			url: `/lab/Result/searchresult`,
			data: payload
		}

		const response = await axiosCall(content);
		const { data } = await response;

		labResults = data;
	}
	catch(error) {
		Message.error();
	}

	return labResults;
}

