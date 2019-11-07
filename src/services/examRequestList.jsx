import axiosCall from './axiosCall';

async function examRequestListAPI() {
  let data = null;
  try{
    const resp = await axiosCall({
      method: 'GET',
      url: 'lab/ExamRequest/Settings/'
    });
    data = resp;
  } 
  catch(e) {
    console.log("TCL: examRequestListAPI -> e", e); 
  }
  return data;
}

export default examRequestListAPI;