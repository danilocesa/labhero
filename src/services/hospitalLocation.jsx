import axiosCall from './axiosCall';

async function hospitalLocationAPI() {
  let data = null;
  try{
    const resp = await axiosCall({
      method: 'GET',
      url: 'lab/HospitalLocation'
    });
    data = resp;
  } 
  catch(e) {
    console.log("TCL: hospitalLocationAPI -> e", e); 
  }
  return data;
}

export default hospitalLocationAPI();