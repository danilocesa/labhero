// @ts-nocheck
// CUSTOM MODULES
import {apiUrlCheckInSpecimen, apiPostMethod} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

async function patientPhleboCheckInSpecimensAPI(payload) {
  let sampleSpecimen = [];
  try{
    const axiosResponse = await axiosLabAPI({
      method: apiPostMethod,
      url: apiUrlCheckInSpecimen,
      data: payload
    // eslint-disable-next-line func-names
    }).then(function(response){
      return response;
    });
    sampleSpecimen = axiosResponse;
  } 
  catch(e) {
    console.log("TCL: patientPhleboCheckInSpecimensAPI -> e", e); 
    HttpCodeMessage({status: sampleSpecimen.status});
  }
  return sampleSpecimen;
}

export default patientPhleboCheckInSpecimensAPI;