/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

export default async function fetchPatients(patientName, patientID) {
  let patients = [];
  try {
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
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

export async function createExtraction(payload) {
  let result = null;
  
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `bloodbank/extraction/create/`,
      data: payload
		});

    const response = await axiosResponse;

    result = response;
  } 
  catch(e) {
    result = false;
	}

	return result;
}

export async function fetchHeaderData(ID) {
  let patients = [];
 
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/bloodbank/screen_extract/by_donor_id/${ID}/` 
    });
    const { data } = await response;
    patients = data
  }
  catch(error) {
    Message.error();
  }
  return patients;
} 

export async function fetchExtractionById(extractionId) {
  let extractionDetail = {};
 
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/bloodbank/extraction/${extractionId}/` 
    });

    const { data } = await response;

    extractionDetail = data
  }
  catch(error) {
    extractionDetail = null;
  }

  return extractionDetail;
} 
