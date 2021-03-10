import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function fetchSpecimens() {
	let specimens = [];

	try {
		const url = `lab/Specimen`;

		const response = await axiosLabAPI({ method: API_GET_METHOD, url });
		const { data } = await response;

		specimens = data || [];
	} catch (e) {
		Message.error();
	}

	return specimens;
}