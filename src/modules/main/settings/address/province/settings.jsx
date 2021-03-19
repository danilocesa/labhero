import errorMessage from 'global_config/error_messages';
import { globalTableSize, globalTableYScroll} from 'global_config/constant-global';

export const REQUIRED_MESSAGE = errorMessage.required;
export const FIELD_RULES = [{ 
  required: false, 
  message: REQUIRED_MESSAGE
}];

export const LABEL_TITLE = 'PROVINCE';

export default FIELD_RULES;

export const buttonLabels = {
	cancel: "CANCEL"
}

export const messagePrompts = {
  successCreateUser: "Successfully created! Reloading page...",
  successUpdateUser: "Update successful! Reloading page..."
}


export const tableSize = globalTableSize;
export const tableYScroll = globalTableYScroll;

export const drawerAdd = 'ADD';
export const drawerUpdate = 'UPDATE';