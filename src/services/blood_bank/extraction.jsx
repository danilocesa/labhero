/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status'

export default async function fetchPatients(patientName, patientID) {
  let patients = [];
  try {
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

export async function createExtraction(payload) {
  let result = [];
  
  try{
    const axiosResponse = await axiosPhase2API({
      method: apiPostMethod,
      url: `bloodbank/extraction/create/`,
      data: payload
		});

    const { data } = await axiosResponse;

    result = data;
  } 
  catch(e) {
    HttpCodeMessage({ status: 500, message: e });
	}

	return result;
}

export async function fetchHeaderData(ID) {
  let patients = [];
 
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
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
      method: apiGetMethod,
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
