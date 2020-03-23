// CUSTOM MODULES
import {apiUrlprintBarcodeSpecimen, apiGetMethod} from 'global_config/constant-global';
import axiosCall from 'services/axiosCall';

async function printBarcodeSpecimenAPI(specimenID) {
  let printBarcode = [];
  try{
    const response = await axiosCall({
      method: `${apiGetMethod}`,
      url: `${apiUrlprintBarcodeSpecimen}${specimenID}`
    }).then(function(response){
      return response;
    });
    console.log(response);
    printBarcode = response;
  } 
  catch(e) {
    console.log("TCL: printBarcodeSpecimenAPI -> e", e); 
  }
  return printBarcode;
}

export default printBarcodeSpecimenAPI;


