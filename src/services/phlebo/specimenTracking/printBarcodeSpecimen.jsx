// CUSTOM MODULES
import {apiUrlprintBarcodeSpecimen, apiGetMethod} from 'global_config/constant-global';
import { axiosLabAPI } from 'services/axios';

async function printBarcodeSpecimenAPI(specimenID) {
  let printBarcode = [];
  try{
    const response = await axiosLabAPI({
      method: `${apiGetMethod}`,
      url: `${apiUrlprintBarcodeSpecimen}${specimenID}`
    }).then(function(response){
      return response;
    });
   
    printBarcode = response;
  } 
  catch(e) {
    console.log("TCL: printBarcodeSpecimenAPI -> e", e); 
  }
  return printBarcode;
}

export default printBarcodeSpecimenAPI;


