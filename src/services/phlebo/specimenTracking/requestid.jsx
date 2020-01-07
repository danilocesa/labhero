// CUSTOM MODULES
import {apiUrlPhleboRequestID, apiGetMethod} from 'global_config/constant-global';
import axiosCall from '../../axiosCall';

async function patientPhleboSpecimensAPI(requestID) {
  let data = null;
  try{
    const resp = await axiosCall({
      method: `${apiGetMethod}`,
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