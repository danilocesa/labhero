import axiosCall from './axiosCall';

async function hospitalPhysiciansAPI() {
  let data = null;
  try{
    const resp = await axiosCall({
      method: 'GET',
      url: 'lab/HospitalPhysician'
    });
    data = resp;
  } 
  catch(e) {
    console.log("TCL: hospitalPhysiciansAPI -> e", e); 
  }
  return data;
}

export default hospitalPhysiciansAPI();