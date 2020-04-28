import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';


async function hospitalLocationAPI() {
	let hospitalLocations = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
      url: 'lab/HospitalLocation'
		});
		
		const { data } = response;
    hospitalLocations = data;
  } 
  catch(e) {
    Message.error();
	}
	
  return hospitalLocations;
}

export default hospitalLocationAPI;