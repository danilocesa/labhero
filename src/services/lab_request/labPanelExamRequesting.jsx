import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

export default async function fetchPanel() {
	let panels = [];

	try {
		const url = `lab/PanelExamRequesting`;

		const response = await axiosCall({ method: 'GET', url });
		const { data } = await response;

		panels = data;
	} catch (e) {
		Message.error();
	}

	return panels;
}

