import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export default async function printBarcodeLabel(specimenID) {
	try{
		const content = {
			method: apiGetMethod,
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


