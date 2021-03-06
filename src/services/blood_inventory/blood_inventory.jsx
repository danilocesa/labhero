import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_PUT_METHOD } from 'global_config/constant-global';

export async function searchInventoryAvailableAPI(payload) {
  const blood_types = payload.blood_type
  const DecodeBloodTypes = encodeURIComponent(blood_types);
  const BloodComponents = payload.blood_comp_code === undefined ? '' : payload.blood_comp_code
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/dashboard/available/?blood_type_name=${DecodeBloodTypes}&status_name=${payload.actionType}&blood_product_code=${BloodComponents}`,
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}

export async function searchInventoryNearExpiryAPI(payload) {
  const blood_types = payload.blood_type
  const DecodeBloodTypes = encodeURIComponent(blood_types);
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/dashboard/near_expiry/?blood_type_name=${DecodeBloodTypes}&is_near_expiry=True`,
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}

export async function searchInventoryAPI(payload) {
  const DecodeBloodTypes = payload.blood_type === undefined ? ' ' :encodeURIComponent(payload.blood_type);
  const Storage = payload.storage === undefined ? ' ' : payload.storage
  const BagID = payload.bag_id === undefined? ' ' : payload.bag_id
	let bloodinventory = [];
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/search/?blood_type_name=${DecodeBloodTypes}&storage_name=${Storage}&blood_bag=${BagID}`,
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}

export async function fetchDashboardItem() {
	let DashboardItem = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/dashboard/`,
		});
		
		const { data } = response;
    DashboardItem = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return DashboardItem;
}


// FOR TABS 
export async function fetchPerTabsItem(payload) {
  const DecodeBloodTypes = encodeURIComponent(payload);
	let PerTabsItem = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/summary/?blood_type=${DecodeBloodTypes}`,
		});
		
		const { data } = response;
    PerTabsItem = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return PerTabsItem;
}

export async function tabSearch(payload) {
	let tabItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_inventory/per_tab/?blood_product_code=${payload}`,
		});
		
		const { data } = response;
    tabItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return tabItems;
}

export async function getInventoryById(id) {
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_inventory/blood_inventory/${id}`,
		});
		
		const { data } = response;
    bloodinventory = data;

    console.log(bloodinventory)
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}

export async function updateInventory(payload) {
  try{
    const response = await axiosPhase2API({
      method: API_PUT_METHOD,
			url: `blood_inventory/blood_inventory/update/${payload.id}/`,
      data: payload
		});
		
		const { data } = response;
    console.log(data)
    return data;
  } 
  catch(e) {
    Message.error();
    return false;
 	}
}