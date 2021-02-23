import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';


async function fetchInventoryItems() {
	let inventoryItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
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