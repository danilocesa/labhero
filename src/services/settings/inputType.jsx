import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiGetMethod } from 'global_config/constant-global';

export default async function getInputTypeCode() {
	let inputTypeCodes;

	try{
		const content = {
			method: apiGetMethod,
			url: 'api/InputType/ExamItems/Settings',
		}

		const response = await axiosCall(content);
		const { data } = await response;

		inputTypeCodes = data;
	}
	catch(error) {
		Message.error();
	}

	return inputTypeCodes;
}