import Message from 'shared_components/message';
import { axiosPhase2API } from 'services/axios';
import { API_GET_METHOD, API_POST_METHOD, API_PUT_METHOD } from 'global_config/constant-global';
import HttpCodeMessage from 'shared_components/message_http_status';


export default async function fetchItems() {
	let Items = [];
	
  try{
    const response = await axiosPhase2API({
      method: API_GET_METHOD,
			url: `/bloodbank/ques_type/list/`,
		});
		
		const { data } = response;
    Items = data;
  } 
  catch(e) {
    Message.error();
 	}
  
  return Items;
}

export async function createData(payload) {
	let createData = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_POST_METHOD,
      url: `/bloodbank/questionnare/create/`,
      data: payload
		}).then(response => {
      return response;
    });
    // @ts-ignore
    createData = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	return createData;
}

export async function fetchItemsperQuestionTypes(payload) {
	let QuestionTypes = [];
  try{
    const axiosResponse = await axiosPhase2API({
      method: API_GET_METHOD,
      url: `/bloodbank/questionnare/search/by_quest_types/?search=${payload}`,
		}).then(response => {
      return response;
    });
    // @ts-ignore
    QuestionTypes = axiosResponse;
  } 
  catch(e) {
    HttpCodeMessage({status: 500, message: e});
	}
	return QuestionTypes;
}

export async function updateData(payload) {
  let updateData = [];
  const ID = payload.questionnare_id;
try{
  const content = { 
    method: API_PUT_METHOD,
    url:`/bloodbank/questionnare/update/${ID}/`,
    data: payload
  }
  const response = await axiosPhase2API(content);
  // @ts-ignore
  updateData = await response;
}
catch(error) {
  Message.error();
}

return updateData;
}
