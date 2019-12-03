// @ts-nocheck
// CUSTOM MODULES
import {apiUrlCheckInSpecimen, apiPostMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from '../../axiosCall';

async function patientPhleboCheckInSpecimensAPI(payload) {
  let sampleSpecimen = [];
  try{
    const axiosResponse = await axiosCall({
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