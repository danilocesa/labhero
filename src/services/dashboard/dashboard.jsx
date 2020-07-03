import Message from 'shared_components/message';
import { axiosLabAPI } from 'services/axios';


async function fetchKPIs(requestDate) {
	let KPIs = [];
	
  try{
    const response = await axiosLabAPI({
      method: 'GET',
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