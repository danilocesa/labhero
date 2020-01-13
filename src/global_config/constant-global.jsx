/* eslint-disable import/prefer-default-export */


// API Methods
export const apiGetMethod = 'GET';
export const apiPostMethod = 'POST';
export const apiPutMethod = 'PUT';

// API's
export const apiURL = '----------';
// Patient
export const apiUrlPatientByID = "lab/Patient/id/";
export const apiUrlPatientByName = "lab/Patient/name/";
export const apiPatient = {
    url : 'lab/Patient/'
};
// Phlebo
export const apiUrlPhlebo = "lab/SpecimenTracking/phlebo/"
export const apiUrlPhleboSearchPatient = `${apiUrlPhlebo}requestdate/`;
export const apiUrlPhleboRequestID = `${apiUrlPhlebo}requestid/`;
export const apiUrlCheckInSpecimen = `${apiUrlPhlebo}checkinspecimen`;
export const apiUrlprintBarcodeSpecimen = "lab/BarcodeLabel/reprintlabel/";
// Panel
export const apiUrlPanelExamRequest = "lab/PanelExamRequesting/";
export const apiUrlPanelExamRequestSettings = `${apiUrlPanelExamRequest}Settings/`;
export const apiUrlGetPanelInfoByID = `${apiUrlPanelExamRequest}Settings/PanelID/`;
// User Maintenance settings
export const apiUserAccount = 'lab/UserAccount';
export const apiUserType = 'lab/UserType';
// Exam request settings
export const apiExamRequest = {
    getExamRequest : 'lab/ExamRequest/Settings',
    putExamRequest : 'lab/ExamRequest',
    postExamRequest : 'lab/ExamRequest',
};

// Address
export const apiAddress = {
    getProvince : 'lab/Address/Provinces',
    getCity     : 'lab/Address/CityMunicipalities/provincecode/',
    getTown     : 'lab/Address/Towns/citymunicipalitycode/'
};
// End API's

// Constants
export const CLR_SEARCHED_NAME = 'CLR_SEARCHED_NAME';
export const CLR_SEARCHED_ID = 'CLR_SEARCHED_ID';
export const SELECTED_SIDER_KEY = 'SELECTED_SIDER_KEY';
export const LOGGEDIN_USER_DATA = 'LOGGEDIN_USER_DATA';

// Exam Item Type Codes
export const EITC_ALPHA_NUMERIC = 'an';
export const EITC_NUMERIC = 'nu';
export const EITC_CHECKBOX = 'cb';
export const EITC_OPTION = 'op';
export const EITC_TEXT_AREA = 'ta';

// Table settings
export const globalTablePageSize = 10;
export const globalTableSize = 'small';
export const globalTableYScroll = 260;

