import Message from 'shared_components/message';
import axiosCall from './axiosCall';


async function hospitalLocationAPI() {
	let hospitalLocations = [];
	
  try{
    const response = await axiosCall({
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