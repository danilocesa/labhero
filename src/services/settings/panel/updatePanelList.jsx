import Message from 'shared_components/message';
import axiosCall from 'services/axiosCall';


async function updatePanelListAPI(apiData) {
	let updatedPanel = [];
	
  try{
    const axiosResponse = await axiosCall({
      method: 'PUT',
      url: 'lab/PanelExamRequesting/Settings',
      data: apiData
		}).then(function(response){
      return response;
    });
    console.log("TCL: panelListAPI -> response", axiosResponse)
    updatedPanel = axiosResponse;
  } 
  catch(e) {
    Message.error();
	}
	
  return updatedPanel;
}

export default updatePanelListAPI;