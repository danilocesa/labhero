// @ts-nocheck
/* eslint-disable func-names */
import {apiPutMethod, apiPatient} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';


async function updatePatientAPI(payload) {
	let updatedPatient = [];
  const { patientID } = payload;
  // eslint-disable-next-line no-param-reassign
  delete payload.patientID;
  try{
    const axiosResponse = await axiosCall({
      method: apiPutMethod,
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