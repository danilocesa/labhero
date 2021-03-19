import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export async function searchInventory(payload) {
	let bloodinventory = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_inventory/blood_inventory/search`,
      params: payload
		});
		
		const { data } = response;
    bloodinventory = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
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
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodinventory;
}
