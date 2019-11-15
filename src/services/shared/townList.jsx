/* eslint-disable func-names */
import {apiGetMethod, apiAddress} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

async function townListAPI(cityCode) {
  let townList = [];
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
      url: `${apiAddress.getTown}${cityCode}`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    townList = data;
  } 
  catch(e) {
    Message.error();
    console.log("TCL: townListAPI -> e", e); 
  }
  return townList;
}

export default townListAPI;