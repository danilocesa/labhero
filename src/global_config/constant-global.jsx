/* eslint-disable import/prefer-default-export */


// API Methods
export const API_GET_METHOD = 'GET';
export const API_POST_METHOD = 'POST';
export const API_PUT_METHOD = 'PUT';

// API's
export const apiURL = '----------';
// Patient
export const apiUrlPatientByID = "lab/Patient/id/";
export const apiUrlPatientByName = "lab/Patient/name/";

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
// Exam request settings
export const apiExamRequest = {
    getExamRequest : 'lab/ExamRequest/Settings',
    putExamRequest : 'lab/ExamRequest',
    postExamRequest : 'lab/ExamRequest',
};

// Address
export const ADDRESS_API_URL = {
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
export const ACCESS_MATRIX = 'ACCESS_MATRIX';

// Exam Item Type Codes
export const EITC_ALPHA_NUMERIC = 'an';
export const EITC_NUMERIC = 'nu';
export const EITC_CHECKBOX = 'cb';
export const EITC_OPTION = 'op';
export const EITC_TEXT_AREA = 'ta';

// Table settings
export const GLOBAL_TABLE_PAGE_SIZE = 10;
export const GLOBAL_TABLE_SIZE = 'middle';
export const GLOBAL_TABLE_YSCROLL = 260;

