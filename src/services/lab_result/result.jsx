import Message from 'shared_components/message';
import { axiosLabAPI, axiosResultReportAPI } from 'services/axios';
import { API_POST_METHOD, API_GET_METHOD } from 'global_config/constant-global';

export async function fetchLabResult(payload) {
	try{
		const content = {
			method: API_POST_METHOD,
			url: `/lab/Result/searchresult`,
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


export async function fetchLabResultExamItems(specimenId) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/Result/editresult/samplespecimenid/${specimenId}`,
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

export async function saveLabResult(payload) {

	console.log(payload)

	try{
		const content = {
			method: API_POST_METHOD,
			url: `/lab/Result/saveresult`,
			data: payload
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		if(error.response && error.response.status === 400) {
			Message.error(error.response.data.error);
		}
		else { 
			Message.error(); 
		}
		
		return false;
	}
}

export async function getPrintPreview(spcmid) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/Result/printpreview/samplespecimenid/${spcmid}`,
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

export async function getPrintPreviewV2(reqid, ssid) {
	try{
		const content = {
			method: API_GET_METHOD,
			url: `/labreport/DefaultResultReport/${reqid}?ssid=${ssid}`,
		}

		const response = await axiosResultReportAPI(content);
		const { data } = await response;

		return data || [];
	}
	catch(error) {
		Message.error();
		return false;
	}
}