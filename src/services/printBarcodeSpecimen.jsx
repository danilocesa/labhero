// CUSTOM MODULES
import {apiUrlprintBarcodeSpecimen, apiGetMethod} from 'shared_components/constant-global';
import axiosCall from './axiosCall';

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