// @ts-nocheck
/* eslint-disable func-names */
import { API_PUT_METHOD, apiPatient } from 'global_config/constant-global';
import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';


async function updatePatientAPI(payload) {
	let updatedPatient = [];
  const { patientID } = payload;
  // eslint-disable-next-line no-param-reassign
  delete payload.patientID;
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_PUT_METHOD,
      url: `${apiPatient.url}${patientID}`,
      data: payload
		}).then(function(response){
      return response;
    });
    updatedPatient = axiosResponse;
  } 
  catch(e) {
    console.log("TCL: updatePatientAPI -> e", e);
    Message.error();
	}
	
  return updatedPatient;
}

export default updatePatientAPI;