/* eslint-disable import/prefer-default-export */


// API Methods
export const apiGetMethod = 'GET';
export const apiPOSTMethod = 'POST';
export const apiPUTMethod = 'PUT';

// API's
export const apiURL = '----------';
export const apiUrlPatientByID = "lab/Patient/id/";
export const apiUrlPatientByName = "lab/Patient/name/";
export const apiUrlPhlebo = "lab/SpecimenTracking/phlebo/"
export const apiUrlPhleboSearchPatient = `${apiUrlPhlebo}requestdate/`;
export const apiUrlPhleboRequestID = `${apiUrlPhlebo}requestid/`;
export const apiUrlCheckInSpecimen = `${apiUrlPhlebo}checkinspecimen`;
export const apiUrlPanelExamRequest = "lab/PanelExamRequesting/";
export const apiUrlPanelExamRequestSettings = `${apiUrlPanelExamRequest}Settings/`;
export const apiUrlGetPanelInfoByID = `${apiUrlPanelExamRequest}Settings/PanelID/`;

// Constants
export const CLR_SEARCHED_NAME = 'CLR_SEARCHED_NAME';
export const CLR_SEARCHED_ID = 'CLR_SEARCHED_ID';
export const SELECTED_SIDER_KEY = 'SELECTED_SIDER_KEY';
export const LOGGEDIN_USER_DATA = 'LOGGEDIN_USER_DATA';

// export const userData = sessionStorage.userData ? JSON.parse(sessionStorage.userData) : null;
