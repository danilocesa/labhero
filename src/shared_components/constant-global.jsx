/* eslint-disable import/prefer-default-export */

// API's
export const apiURL = '----------';
export const apiUrlPatientByID = "lab/Patient/id/";
export const apiUrlPatientByName = "lab/Patient/name/";
export const apiUrlPhlebo = "lab/SpecimenTracking/phlebo/"
export const apiUrlPhleboSearchPatient = `${apiUrlPhlebo}requestdate/`;
export const apiUrlPhleboRequestID = "lab/SpecimenTracking/phlebo/requestid/";
export const apiUrlCheckInSpecimen = "lab/SpecimenTracking/phlebo/checkinspecimen";

export const CLR_SEARCHED_NAME = 'CLR_SEARCHED_NAME';
export const CLR_SEARCHED_ID = 'CLR_SEARCHED_ID';
export const SELECTED_SIDER_KEY = 'SELECTED_SIDER_KEY';
export const LOGGEDIN_USER_DATA = 'LOGGEDIN_USER_DATA';

// export const userData = sessionStorage.userData ? JSON.parse(sessionStorage.userData) : null;
