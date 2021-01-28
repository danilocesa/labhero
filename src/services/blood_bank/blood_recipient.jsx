import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';

export default async function fetchRequest(name ,request_id) {
  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: (name ? `/blood_recipient/bloodrecipient/search/?search=${name}` : `/blood_recipient/bloodrecipient/search/by_id/${request_id}/`) 
    });
    const { data } = await response;
    Patient = data
  }
  catch(error) {
    Message.error();
  }
  return Patient;
} 