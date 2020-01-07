import errorMessage from 'global_config/error_messages';

export const REQUIRED_MESSAGE = errorMessage.required;
export const FIELD_RULES = [{ 
  required: false, 
  message: REQUIRED_MESSAGE
}];

export const LABEL_TITLE = 'PROVINCE';

export default FIELD_RULES;