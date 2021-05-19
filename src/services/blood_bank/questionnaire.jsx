import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';


export default async function fetchQuestionnareList() {
	let QuestionnareItems = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/general_settings/questionnare/`,
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
      method: API_POST_METHOD,
      url: `/general_settings/questionnare/create/`,
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
      method: API_PUT_METHOD,
      url:`/general_settings/questionnare/update/${QuestionnareId}/`,
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