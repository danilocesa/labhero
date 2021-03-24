import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export async function fetchProvincesItems() {
	let ProvincesItems = null;

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/Address/Provinces`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		ProvincesItems = data;
	}
	catch(error) {
		Message.error();
	}

	return ProvincesItems;
}

export async function fetchCityItems(provcode) {
  console.log("file: Address.jsx ~ line 29 ~ fetchCityItems ~ provcode", provcode)
	let CityItem = null;

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/Address/CityMunicipalities/provincecode/${provcode}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		CityItem = data;
	}
	catch(error) {
		Message.error();
	}

	return CityItem;
}

export default async function fetchBarangayItems(Citycode) {
	let BarangayItems = null;

	try{
		const content = {
			method: API_GET_METHOD,
			url: `/lab/Address/Towns/citymunicipalitycode/${Citycode}`,
		}

		const response = await axiosLabAPI(content);
		const { data } = await response;

		BarangayItems = data;
	}
	catch(error) {
		Message.error();
	}

	return BarangayItems;
}
