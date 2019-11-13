/* eslint-disable func-names */
import {apiGetMethod, apiAddress} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

async function cityListAPI(provinceCode) {
  let cityList = [];
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
      url: `${apiAddress.getCity}${provinceCode}`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    cityList = data;
  } 
  catch(e) {
    Message.error();
    console.log("TCL: cityListAPI -> e", e); 
  }
  return cityList;
}

export default cityListAPI;