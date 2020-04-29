import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

export default async function fetchSection() {
	let sections = [];

	try {
		const url = `lab/Section`;

		const response = await axiosLabAPI({ method: 'GET', url });
		const { data } = await response;

		sections = data || [];
	} catch (e) {
		Message.error();
	}

	return sections;
}