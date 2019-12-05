import {apiUrlPanelExamRequestSettings, apiGetMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';


async function panelListAPI() {
	let panelList = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
      url: apiUrlPanelExamRequestSettings
		}).then(response => {
      return response;
    });
    // @ts-ignore
    panelList = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return panelList;
}

export default panelListAPI;