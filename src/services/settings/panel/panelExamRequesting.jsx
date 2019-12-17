import {
	apiUrlPanelExamRequestSettings, 
	apiUrlGetPanelInfoByID, 
	apiGetMethod, 
	apiPostMethod, 
	apiPutMethod
} from 'shared_components/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import axiosCall from 'services/axiosCall';

export async function panelListAPI() {
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

export async function getPanelInfoAPI(panelID) {
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

export async function createdPanelAPI(payload) {
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

export async function updatePanelListAPI(payload) {
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
