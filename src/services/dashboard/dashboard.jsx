import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';
import { API_GET_METHOD } from 'global_config/constant-global';


async function fetchKPIs(requestDate) {
	let KPIs = [];
	
  try{
    const response = await axiosLabAPI({
      method: API_GET_METHOD,
      url: `lab/Dashboard/RequestToCheckin/${requestDate}`
		});
		
		const { data } = response;
    KPIs = data || [];
  } 
  catch(e) {
    Message.error();
	}
	
  return KPIs;
}

export default fetchKPIs;