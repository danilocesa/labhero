import {apiUrlPanelExamRequestSettings, apiPutMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';


async function updatePanelListAPI(payload) {
	let updatedPanel = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiPutMethod,
      url: apiUrlPanelExamRequestSettings,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    updatedPanel = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return updatedPanel;
}

export default updatePanelListAPI;