import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

export default async function saveLabRequest(payload) {
	let isSuccess = false;
	
	try {
		const response = await axiosLabAPI({ 
			method: 'POST', 
			url: 'lab/Request',
			data: payload
		});

		// eslint-disable-next-line no-unused-vars
		const { data } = await response;

		isSuccess = true;
	} catch (e) {
		Message.error();
		isSuccess = false;
	}

	return isSuccess;
}

export async function fetchPatientsByDate(date) {
	let patients = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
      url: `lab/Request/editsearch/date/${date}`
		});
		
		const { data } = response;

		patients = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return patients;
}


export async function fetchPatientsById({ id, date }) {
	let patients = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
      url: `lab/Request/editsearch/pid/${id}/${date}`
		});
		
		const { data } = response;

		patients = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return patients;
}



export async function fetchPatientsByName({ name, date }) {
	let patients = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
      url: `lab/Request/editsearch/name/${name}/${date}`
		});
		
		const { data } = response;

		patients = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return patients;
}


export async function fetchExamsByReqId(id) {
	let exams = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
      url: `lab/Request/editexams/requestid/${id}`
		});
		
		const { data } = response;

		exams = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return exams;
}