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
      url: (patientID ? `/bloodbank/screening/data/by_id/${patientID}` : `bloodbank/screening/search/?search=${patientName}`) 
    });

    const { data } = await response;

    patients = data;
  }
  catch(error) {
    Message.error();
  }

  return patients;
} 