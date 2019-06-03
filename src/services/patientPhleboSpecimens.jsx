// CUSTOM MODULES
import {apiUrlPhleboRequestID} from 'shared_components/constant-global';
import axiosCall from './axiosCall';

async function patientPhleboSpecimensAPI(requestID) {
  let data = null;
  try{
    const resp = await axiosCall({
      method: 'GET',
      url: `${apiUrlPhleboRequestID}${requestID}`
    });
    data = resp;
  } 
  catch(e) {
    console.log("TCL: patientPhleboSpecimensAPI -> e", e); 
  }
  return data.data;
}

export default patientPhleboSpecimensAPI;