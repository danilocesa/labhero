/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod,apiPostMethod,apiPutMethod } from 'global_config/constant-global';


export async function fetchDonor() {
	let inventoryItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: 'bloodbank/donor/'
		});
		
		const { data } = response;
    inventoryItems = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return inventoryItems;
}

export async function fetchPatients(patientName, patientID) {
  let patients = [];
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: (patientID ? `bloodbank/extraction/search/by_id/${patientID}` : `bloodbank/extraction/search/?search=${patientName}`) 
    });
    const { data } = await response;
    patients = data;
  }
  catch(error) {
    Message.error();
  }
  return patients;
} 


