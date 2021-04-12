/* eslint-disable camelcase */
/* eslint-disable func-names */
import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD } from 'global_config/constant-global';

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