import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export async function fetchProvincesItems() {
	let ProvincesItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/provinces/`,
		});
		
		const { data } = response;
    ProvincesItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return ProvincesItems;
}

export async function createProvincesItems(payload) {
	let ProvincesItems = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/provinces/create/`,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    ProvincesItems = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return ProvincesItems;
}

export async function updateProvincesItems(payload) {
  let ProvincesItems = [];
  const province_id = payload.province_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/general_settings/provinces/update/${province_id}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    ProvincesItems = await response;
  }
  catch(error) {
    Message.error();
  }

  return ProvincesItems;
}


export async function fetchCityItems() {
	let CityItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/cities/`,
		});
		
		const { data } = response;
    CityItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return CityItems;
}

export async function updateCityItems(payload) {
  let CityItems = [];
  const city_id = payload.city_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/general_settings/cities/update/${city_id}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    CityItems = await response;
  }
  catch(error) {
    Message.error();
  }

  return CityItems;
}


export async function createCityItems(payload) {
	let CityItems = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/cities/create/`,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    CityItems = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return CityItems;
}

export default async function fetchBarangayItems() {
	let BarangayItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/barangays/`,
		});
		
		const { data } = response;
    BarangayItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return BarangayItems;
}

export async function createBarangayItems(payload) {
	let BarangayItems = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/barangays/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    BarangayItems = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return BarangayItems;
}

export async function updateBarangayItems(payload) {
  let BarangayItems = [];
  const barangay_id = payload.barangay_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/general_settings/barangays/update/${barangay_id}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    BarangayItems = await response;
  }
  catch(error) {
    Message.error();
  }

  return BarangayItems;
}

