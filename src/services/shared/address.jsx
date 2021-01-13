/* eslint-disable func-names */
import {apiGetMethod, apiAddress} from 'global_config/constant-global';
import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

export async function cityListAPI(provinceCode) {
  let cityList = [];
  try{
    const axiosResponse = await axiosLabAPI({
      method: apiGetMethod,
      url: `/cities/by_prov/${provinceCode}`
    }).then(function(response){
      return response;
		});
		
    // @ts-ignore
    const { data } = axiosResponse;
    cityList = data || [];
  } 
  catch(e) {
    Message.error();
  }
  return cityList;
}

export async function provinceListAPI() {
  let provinceList = [];
  try{
    const axiosResponse = await axiosLabAPI({
      method: apiGetMethod,
      url: `/provinces/`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    provinceList = data || [];
  } 
  catch(e) {
    Message.error();
  }
  return provinceList;
}

export async function townListAPI(cityCode) {
  let townList = [];
  try{
    const axiosResponse = await axiosLabAPI({
      method: apiGetMethod,
      url: `/barangays/by_city/${cityCode}`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    townList = data || [];
  } 
  catch(e) {
    Message.error();
	}
	
  return townList;
}