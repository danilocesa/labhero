import axiosCall from './axiosCall';

async function panelListAPI() {
  let data = null;
  try{
    const resp = await axiosCall({
      method: 'GET',
      url: 'PanelExamRequesting/Settings/'
    });
    data = resp;
  } 
  catch(e) {
    console.log("TCL: panelListAPI -> e", e); 
  }
  return data;
}

export default panelListAPI();