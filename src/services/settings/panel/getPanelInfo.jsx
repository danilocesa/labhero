import {apiUrlGetPanelInfoByID} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';


async function getPanelInfoAPI(panelID) {
	let panelInfo = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: 'GET',
      url: apiUrlGetPanelInfoByID + panelID,
		}).then(function(response){
      return response;
    });
    console.log("TCL: panelListAPI -> response", axiosResponse)
    panelInfo = axiosResponse;
  } 
  catch(e) {
    Message.error();
	}
	
  return panelInfo;
}

export default getPanelInfoAPI;