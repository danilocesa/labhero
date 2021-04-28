import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export  async function getHospitalList() {
	let hospitals = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `general_settings/hospitals/`,
		});
		
		const { data } = response;
    hospitals = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return hospitals;
}


export async function createHospitalList(payload) {
	let HospitalList = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `general_settings/hospitals/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    HospitalList = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}

	return HospitalList;
}

export async function updateHospitalList(payload) {
  let HospitalList = [];
  const hospital_id = payload.hospital_id;

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`general_settings/hospitals/update/${hospital_id}/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    HospitalList = await response;
  }
  catch(error) {
    Message.error();
  }

  return HospitalList;
}