import errorMessage from 'global_config/error_messages';


export const FIELD_RULES = {
  userType: [
    { required: true, message: errorMessage.required }
  ],
  description: [
    { required: true, message: errorMessage.required }
  ]
};