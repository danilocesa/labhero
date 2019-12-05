import {apiUrlPanelExamRequestSettings, apiPostMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';

async function createdPanelAPI(payload) {
	let createdPanel = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiPostMethod,
      url: apiUrlPanelExamRequestSettings,
      data: payload
		// eslint-disable-next-line func-names
		}).then(response => {
      return response;
    });
    // @ts-ignore
    createdPanel = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return createdPanel;
}

export default createdPanelAPI;