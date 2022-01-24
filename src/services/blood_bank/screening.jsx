/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_PUT_METHOD, API_POST_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';

export default async function fetchPatients(patientName, patientID, pageSize, page) {
  let patients = [];
  try {
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
      url: (patientID ? `/bloodbank/screening/manual_search/by_donor/${patientID}` : `/bloodbank/screening/manual_search/list/?search=${patientName}&page=${page}&page_size=${pageSize}`) 
    });

    const { data } = await response;

    patients = data;
  }
  catch(error) {
    Message.error();
  }

  return patients;
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

export async function extractSample(payload) {
	let extractReturn = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: 'POST',
      url: `/bloodbank/screening/extract_sample/`,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    extractReturn = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	return extractReturn;
}

export async function fetchExamList() {
	let examList = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/bloodbank/screening/initialize/exams/list/`,
		});
		
		const { data } = response;
    examList = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return examList;
}

export async function fetchExamListWithId(screeningId) {
	let examListWithID = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/bloodbank/screening/initialize/exams/list/${screeningId}`,
		});
		
		const { data } = response;
    examListWithID = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return examListWithID;
}


export async function screeningResultUpdate(payload) {
  let screeningResultUpdate = [];

  try{
    const content = {
      method: API_PUT_METHOD,
      url:`/bloodbank/screening/update/save_exam_result/`,
      data: payload
    }

    const response = await axiosPhase2API(content);
    // @ts-ignore
    screeningResultUpdate = await response;
  }
  catch(error) {
    Message.error();
  }

  return screeningResultUpdate;
}