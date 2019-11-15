import {globalTablePageSize} from 'shared_components/constant-global';

// constant variables, titles strictly implemented and shared within the module.

// SearchPatient Variables
export const moduleTitle = 'SEARCH PATIENT';
export const tablePageSize = globalTablePageSize;

// SearchPatientForm variables
export const drawerUpdateTitle = 'UPDATE PATIENT INFORMATION';
export const drawerSubmitButton = 'SUBMIT';
export const drawerCancelButton = 'CANCEL';
export const formLabels = {
    lastName: 'LAST NAME', 
    firstName: 'FIRST NAME', 
    middleName:'MIDDLE NAME',
    suffix: 'SUFFIX',
    gender: 'GENDER',
    dateOfBirth: 'DATE OF BIRTH',
    age: 'AGE',
    city: 'CITY',
    barangay: 'BARANGAY',
    unitNo: 'HOUSE NO./UNIT/FLOOR NO., BLDG NAME, BLK OR LOT NO.',
    contactNumber: 'MOBILE NO.',
    emailAddress: 'EMAIL ADDRESS'
};
export const selectDefaultOptions = "PLEASE SELECT";
export const genderOptions = {
    male: 'MALE',
    female: 'FEMALE'
};

export const errorMessages = {
    requiredField : 'This is a required field.',
    password : {
        doesNotMatch : 'Password and Repeat Password does not match!',
    },
};

export const successMessages = {
    update : 'Changes successfully saved!'
};