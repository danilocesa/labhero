/* eslint-disable func-names */
import {apiGetMethod, apiAddress} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from '../axiosCall';

export async function cityListAPI(provinceCode) {
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

export async function provinceListAPI() {
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

export async function townListAPI(cityCode) {
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