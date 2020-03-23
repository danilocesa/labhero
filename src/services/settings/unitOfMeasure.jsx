import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';
import { apiGetMethod } from 'global_config/constant-global';

export default async function getUnitOfMeasures() {
	let units;

	try{
		const content = {
			method: apiGetMethod,
			url: 'api/UnitOfMeasure/ExamItems/Settings',
		}

		const response = await axiosCall(content);
		const { data } = await response;

		units = data;
	}
	catch(error) {
		Message.error();
	}

	return units;
}