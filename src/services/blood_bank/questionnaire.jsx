import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { apiGetMethod, apiPostMethod, apiPutMethod } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';


export default async function fetchQuestionnareList() {
	let QuestionnareItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: apiGetMethod,
			url: `/bloodbank/questionnare/`,
		});
		
		const { data } = response;
    QuestionnareItems = data;
  } 
  catch(e) {
    Message.error();
 	}
  return QuestionnareItems;
}

export async function createQuestionnareAPI(payload) {
	let createQuestionnare = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: apiPostMethod,
      url: `/bloodbank/questionnare/create/`,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    createQuestionnare = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	return createQuestionnare;
}

export async function updateQuestionnareAPI(payload) {
  let updateQuestionnare = [];
  const QuestionnareId = payload.questionnare_id;

  try{
    const content = {
            method: apiPutMethod,
            url:`/bloodbank/questionnare/update/${QuestionnareId}/`,
      data: payload
    }
    const response = await axiosPhase2API(content);
    // @ts-ignore
    updateQuestionnare = await response;
  }
  catch(error) {
    Message.error();  
  }
  return updateQuestionnare;
}