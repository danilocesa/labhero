/* eslint-disable func-names */
import {apiGetMethod, apiAddress} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

async function provinceListAPI() {
  let provinceList = [];
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
      url: apiAddress.getProvince
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    provinceList = data;
  } 
  catch(e) {
    Message.error();
    console.log("TCL: provinceListAPI -> e", e); 
  }
  return provinceList;
}

export default provinceListAPI;