import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

export default async function fetchSpecimens() {
	let specimens = [];

	try {
		const url = `lab/Specimen`;

		const response = await axiosLabAPI({ method: 'GET', url });
		const { data } = await response;

		specimens = data || [];
	} catch (e) {
		Message.error();
	}

	return specimens;
}