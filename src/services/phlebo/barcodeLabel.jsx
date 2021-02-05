import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function printBarcodeLabel(specimenID) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/BarcodeLabel/reprintlabel/${specimenID}`,
		}

		const response = await axiosLabAPI(content);

		return response
	}
	catch(error) {
		Message.error();
		return false;
	}
}


