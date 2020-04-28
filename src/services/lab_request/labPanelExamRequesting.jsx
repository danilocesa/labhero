import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

export default async function fetchPanel() {
	let panels = [];

	try {
		const url = `lab/PanelExamRequesting`;

		const response = await axiosLabAPI({ method: 'GET', url });
		const { data } = await response;

		panels = data;
	} catch (e) {
		Message.error();
	}

	return panels;
}

