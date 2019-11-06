import {apiUrlPanelExamRequestSettings} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';


async function panelListAPI() {
	let panelList = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: 'GET',
      url: apiUrlPanelExamRequestSettings
		}).then(function(response){
      return response;
    });
    console.log("TCL: panelListAPI -> response", axiosResponse)
    panelList = axiosResponse;
  } 
  catch(e) {
    Message.error();
	}
	
  return panelList;
}

export default panelListAPI;