import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

export default async function fetchRequest(payload) {
  const patientName = payload.patientName === undefined ? '' : payload.patientName 
  const BloodTypes = payload.blood_type === undefined ? '' : encodeURIComponent(payload.blood_type)
  const requested_date = payload.requested_date === undefined ? '' : payload.requested_date // question sa api kung anong pwedeng default na pinasa sa requested_date na ma kukuwa laht ng data
  const patientID = payload.patientID === undefined ? '' : payload.patientID 
  const status = payload.status === undefined ? '' : payload.status 
  const priority = payload.priority === undefined ? '' : payload.priority 

  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/blood_recipient/bloodproductrequest/manual_search/list/?search=${patientName}&recipient_id=${patientID}&blood_type=${BloodTypes}&requested_date=${requested_date}&priority_name=${priority}&status_name=${status}`
    });
    const { data } = await response;
    Patient = data
  }
  catch(error) {
    Message.error();
 	}
  
  return Patient;
}

export async function fetchBloodRecipientById(recipientID) {
	let bloodrecipient = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `blood_recipient/bloodrecipient/search/by_id/${recipientID}`,
		});
		
		const { data } = response;
    bloodrecipient = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return bloodrecipient;
}

export async function createBloodRecipient(payload) {
	let result = null;
	
  try{
    const response = await axiosPhase2API({
      method: API_POST_METHOD,
			url: `/blood_recipient/bloodproductrequest/create/`,
      data: payload
		});
		
		result = response;
  } 
  catch(e) {
    return false;
 	}
  
  return result;
}