import Message from 'shared_components/message';
import { axiosReportAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

export async function fetchXMLNames() {
	let xmlNames = [];

	try{
		const content = {
			method: API_GET_METHOD,
			url: `lab_report/templatelist.php`,
		}

		const response = await axiosReportAPI(content);
		const { data } = response;

		xmlNames = data;
	}
	catch(error) {
		Message.error();
	}

	return xmlNames;
}

export async function deleteXML(payload) {
	let response = null;

	try{
		const content = {
			method: API_POST_METHOD,
			url: `lab_report/delete.php`,
			data: payload
		}

		response = await axiosReportAPI(content);
	}
	catch(error) {
		response = error.response;
	}

	return response;
}
