/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchPatients(patientName, patientID, pageSize, page) {
  let patients = [];
  try {
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: ( patientID 
        ? `bloodbank/extraction/manual_search/list/?donor_id=${patientID}` 
        : `bloodbank/extraction/manual_search/list/?search=${patientName}&page=${page}&page_size=${pageSize}`
      ) 
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
      method: API_POST_METHOD,
      url: `bloodbank/extraction/create/`,
      data: payload
		}).then(response => {
      return response;
    });

    // @ts-ignore
    result = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
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

export async function fetchPatientsNext(url) {
  let patients = [];
  try {
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: url 
    });

    const { data } = await response;

    patients = data;
  }
  catch(error) {
    Message.error();
  }

  return patients;
} 