import errorMessage from 'global_config/error_messages';

export const REQUIRED_MESSAGE = errorMessage.required;
export const FIELD_RULES = [{ 
  required: true, 
  message: REQUIRED_MESSAGE
}];

export const LABEL_TITLE = 'BARANGAY';

export default FIELD_RULES;