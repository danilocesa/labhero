/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod } from 'global_config/constant-global';

export async function fetchPatients(donors_id, Blood_group,location) {
  console.log(donors_id,Blood_group,location,'INPUT DATA IN JSX')
  let Patient = '';
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: 
      (Blood_group ? `bloodbank/search_donor/by_bloodtype/${Blood_group}` : `bloodbank/search_donor/by_id/${donors_id}`) 
    });
    const { data } = await response;
    Patient = data
  }
  catch(error) {  
    Message.error();
  }
  return Patient;
} 

export async function fetchCityList() {
  let townList = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: apiGetMethod,
      url: `/general_settings/cities/city_name/list/`
    }).then(function(response){
      return response;
    });
    // @ts-ignore
    const { data } = axiosResponse;
    console.log(data)
    townList = data || [];
  } 
  catch(e) {
    Message.error();
	}
	
  return townList;
}
