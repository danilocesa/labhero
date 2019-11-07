import {apiUrlPanelExamRequestSettings} from 'shared_components/constant-global';
import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';


async function createdPanelAPI(apiData) {
	let createdPanel = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: 'POST',
      url: apiUrlPanelExamRequestSettings,
      data: apiData
		}).then(function(response){
      return response;
    });
    console.log("TCL: panelListAPI -> response", axiosResponse)
    createdPanel = axiosResponse;
  } 
  catch(e) {
    Message.error();
	}
	
  return createdPanel;
}

export default createdPanelAPI;