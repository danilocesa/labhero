import Message from 'shared_components/message';
import { axiosLabAPI  } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export async function fetchPanelList(payload) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/PanelExamRequesting/SectionSpecimen`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}