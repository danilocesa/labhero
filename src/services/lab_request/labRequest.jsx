import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

export default async function saveLabRequest(payload) {
	let isSuccess = false;
	
	try {
		const response = await axiosCall({ 
			method: 'POST', 
			url: 'lab/Request',
			data: payload
		});

		// eslint-disable-next-line no-unused-vars
		const { data } = await response;

		isSuccess = true;
	} catch (e) {
		Message.error();
		isSuccess = false;
	}

	return isSuccess;
}