import Message from 'shared_components/message';
import { axiosLabAPI } from '../axios';
import { API_GET_METHOD } from 'global_config/constant-global';

export default async function fetchPanel() {
	let panels = [];
	try {
		const response = await axiosLabAPI({ 
			method: API_GET_METHOD, 
			url:`lab/PanelExamRequesting`
		});
		const { data } = await response;

		panels = data;
	} catch (e) {
		Message.error();
	}
  
	return panels;
}


export async function fetchPanellist() {
	let panels = [];
	
  try{
    const response = await axiosLabAPI({
      method: API_GET_METHOD,
			url: `lab/PanelExamRequesting`,
		});
		
		const { data } = response;
    panels = data;
  } 
  catch(e) {
    Message.error();
 	}
  return panels;
}