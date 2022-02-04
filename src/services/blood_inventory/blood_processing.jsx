import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD} from 'global_config/constant-global';

export async function fetchBloodProcessingSearch(payload) {
  const BloodTypes = payload.BLOOD_TYPES === undefined ? ' ' : encodeURIComponent(payload.BLOOD_TYPES)
  const StorageName = payload.BLOOD_STORAGE === undefined ? ' ' : payload.BLOOD_STORAGE
  const StatusName = payload.STATUS === undefined ? ' ' : payload.STATUS 
  const BloodComponents = payload.Blood_Components_Code === undefined ? 'WB' : payload.Blood_Components_Code
  
	let bloodStorage = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/blood_inventory/blood_processing/prod_listing/search?blood_type_name=${BloodTypes}&storage_name=${StorageName}&status_name=${StatusName}&blood_product_code=${BloodComponents}`,
		});
		
		const { data } = response;
    bloodStorage = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodStorage;
}
