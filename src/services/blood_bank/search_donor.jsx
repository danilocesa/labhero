/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export async function fetchDonors(donor_id, Blood_group,location) {
  let bloodgroup = [], 
  donors_id = [], 
  city = [];
  
  if(Blood_group){ // If blood group field has value
    bloodgroup = await fetchDonorByBloodType(Blood_group);
  }
  if(donor_id){ //If donor id field has value
    donors_id = await fetchDonorByDonorId(donor_id);
    
  }
  if(location){ //If location field has value
    city = await fetchDonorByLocation(location);
  }

  const donors_result =[ ...bloodgroup, ...donors_id, ...city];
  const result = donors_result.filter((thing, index, self) => self.findIndex(t => t.donor_id === thing.donor_id) === index) 
  return result;
} 

export async function fetchDonorByBloodType(blood_group){
  let bloodGroup = null;
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `bloodbank/search_donor/by_bloodtype/${blood_group}` 
    });
    const { data } = await response;
    bloodGroup = data
  }
  catch(error) {  
    Message.error();
  }
  return bloodGroup;
}

export async function fetchDonorByDonorId(donor_id){
  let donorID = null;
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `bloodbank/search_donor/by_id/${donor_id}` 
    });
    const { data } = await response;
    donorID = data
  }
  catch(error) {  
    Message.error();
  }
  return donorID;
}

export async function fetchDonorByLocation(location){
  let locationVar = null;
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `bloodbank/search_donor/by_city/${location}` 
    });
    const { data } = await response;
    locationVar = data
  }
  catch(error) {  
    Message.error();
  }
  return locationVar;
}


export async function fetchCityList() {
  let townList = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/general_settings/cities/city_name/list/`
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
