import Message from 'shared_components/message';
import { API_GET_METHOD } from 'global_config/constant-global';
import { axiosLabAPI } from '../axios';

export default async function fetchSection() {
	let sections = [];

	try {
		const url = `lab/Section`;

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;

		sections = data || [];
	} catch (e) {
		Message.error();
	}

	return sections;
}