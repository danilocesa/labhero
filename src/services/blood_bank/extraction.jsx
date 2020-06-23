import Message from 'shared_components/message'
import { axiosPhase2API } from 'services/axios'
import { apiGetMethod,apiPostMethod,apiPutMethod } from 'global_config/constant-global'

export default async function fetchPatients(patientName) {
  let patients = [];
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
      url: `bloodbank/extraction/search/?search=${patientName}`
    });
    const { data } = await response;
    patients = data;
  }
  catch(error) {
    Message.error();
  }
  return patients;
} 