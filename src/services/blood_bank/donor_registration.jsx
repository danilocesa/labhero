/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';


export async function fetchDonor() {
	let inventoryItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: 'bloodbank/donor/'
		});
		
		const { data } = response;
    inventoryItems = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return inventoryItems;
}

export async function createDonor(Data) {
  let createUserAccount = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `bloodbank/donor/create/`,
      data: Data
		}).then(response => {
      return response;
    });

    // @ts-ignore
    createUserAccount = axiosResponse;
  } 
  catch(e) {
   Message.error();
	}

	return createUserAccount;
}


export async function updateDonor(Data) {
  let updateBloodGroup = [];
  const bloodGroupId = Data.donor_id;
  
  try{
    const content = {
      method: API_PUT_METHOD,
      url:`bloodbank/donor/update/${bloodGroupId}/`,
      data: Data
    }
    const response = await axiosPhase2API(content);
    // @ts-ignore
    updateBloodGroup = await response;

  }
  catch(error) {
    Message.error();
  }

  return updateBloodGroup;
}

export async function searchDonors(donorName, donorId, pageSize, page) {
  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: (donorName ? `/bloodbank/donor/manual_search/list/?search=${donorName}&page=${page}&page_size=${pageSize}` : `/bloodbank/donor/manual_search/list/?donor_id=${donorId}`) 
    });
    const { data } = await response;
    Patient = data
  }
  catch(error) {
    Message.error();
  }
  return Patient;
} 

export async function fetchAdditionalFields() {
	let inventoryItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `bloodbank/health_info/initialize/`
    });
		const { data } = response;
    inventoryItems = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return inventoryItems;
}

export async function fetchBarangayList(city_id) {
  let townList = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/general_settings/barangays/by_city/${city_id}`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    townList = data || [];
  } 
  catch(e) {
    Message.error();
	}
	
  return townList;
}

export async function fetchCityList(province_id) {
  let cityList = [];

  try{
    const axiosResponse = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/general_settings/cities/by_prov/${province_id}`
    }).then(function(response){
      return response;
		});
		
    // @ts-ignore
    const { data } = axiosResponse;
    cityList = data || [];
  } 
  catch(e) {
    Message.error();
  }

  return cityList;
}

export async function fetchProvinceList() {
  let provinceList = [];

  try{
    const axiosResponse = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/general_settings/provinces/`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    provinceList = data || [];
  } 
  catch(e) {
    Message.error();
  }
  
  return provinceList;
}