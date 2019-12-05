import {apiUrlGetPanelInfoByID, apiGetMethod} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';


async function getPanelInfoAPI(panelID) {
	let panelInfo = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: apiGetMethod,
      url: apiUrlGetPanelInfoByID + panelID,
		}).then(response => {
      return response;
    });
    // @ts-ignore
    panelInfo = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	
  return panelInfo;
}

export default getPanelInfoAPI;