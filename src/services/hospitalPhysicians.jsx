import Message from 'shared_components/message';
import axiosCall from './axiosCall';

async function hospitalPhysiciansAPI() {
	let physicians = [];
	
  try{
    const response = await axiosCall({
      method: 'GET',
      url: 'lab/HospitalPhysician'
		});
		
		const { data } = response;

		physicians = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return physicians;
}

export default hospitalPhysiciansAPI;