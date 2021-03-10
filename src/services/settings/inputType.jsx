import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function getInputTypeCode() {
	let inputTypeCodes = [];

	try{
		const content = {
			method: API_GET_METHOD,
			url: 'api/InputType/ExamItems/Settings',
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		inputTypeCodes = data;
	}
	catch(error) {
		Message.error();
	}

	return inputTypeCodes;
}