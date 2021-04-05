import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import HttpCodeMessage from 'shared_components/message_http_status';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export default async function fetchProvinceItems() {
	let ProvinceItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/provinces/`,
		});
		
		const { data } = response;
    ProvinceItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return ProvinceItems;
}

export async function createProvinceItems(payload) {
	let ProvinceItems = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/general_settings/provinces/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    ProvinceItems = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return ProvinceItems;
}

export async function updateProvinceItems(payload) {
  let ProvinceItems = [];
  const province_id = payload.province_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/general_settings/provinces/update/${province_id}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    ProvinceItems = await response;
  }
  catch(error) {
    Message.error();
  }

  return ProvinceItems;
}

export async function fetchCityAllItems(province_id) {
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

export async function fetchCityItems(province_id) {
	let CityItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/cities/by_prov/${province_id}`,
		});
		
		const { data } = response;
    CityItems = data;
  } 
  catch(e) {
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

export async function fetchBarangayItems(city_id) {
	let CityItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/barangays/by_city/${city_id}`,
		});
		
		const { data } = response;
    CityItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return CityItems;
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