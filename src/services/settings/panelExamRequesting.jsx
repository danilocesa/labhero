import {
	apiUrlPanelExamRequestSettings, 
	apiUrlGetPanelInfoByID, 
	API_GET_METHOD, 
	API_POST_METHOD, 
	API_PUT_METHOD
} from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';
import { axiosLabAPI } from 'services/axios';

export async function panelListAPI() {
	let panelList = [];
	
  try{
    const axiosResponse = await axiosLabAPI({
      method: API_GET_METHOD,
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
    const axiosResponse = await axiosLabAPI({
      method: API_GET_METHOD,
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
    const axiosResponse = await axiosLabAPI({
      method: API_POST_METHOD,
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
    const axiosResponse = await axiosLabAPI({
      method: API_PUT_METHOD,
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
