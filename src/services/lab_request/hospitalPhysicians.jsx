import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';

async function hospitalPhysiciansAPI() {
	let physicians = [];
	
  try{
    const response = await axiosLabAPI({
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