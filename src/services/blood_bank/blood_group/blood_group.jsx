import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';


async function fetchInventoryItems() {
	let inventoryItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: 'inventory/items/'
		});
		
		const { data } = response;
    inventoryItems = data;
  } 
  catch(e) {
    Message.error();
	}
  
  
  return inventoryItems;
}

export default fetchInventoryItems;