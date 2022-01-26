import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function fetchPriority() {
  let Priority = '';
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/blood_recipient/bloodproductrequest/priority_lov/`
    });
    const { data } = await response;
    Priority = data
  }
  catch(error) {
    Message.error();
 	}
  
  return Priority;
}

export async function fetchStatus() {
  let Status = '';
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/blood_recipient/bloodproductrequest/status_lov/`
    });
    const { data } = await response;
    Status = data
  }
  catch(error) {
    Message.error();
 	}
  
  return Status;
}