import errorMessage from 'global_config/error_messages';

export const FIELD_RULES = {
	bloodType: [
		{ required: true, message: errorMessage.required },
	],
	status: [
    { required: true, message: errorMessage.required },
  ],
  bagID: [
    { required: true, message: errorMessage.required },
  ],
  storage: [
    { required: true, message: errorMessage.required },
  ],
  extracted_date: [
    { required: true, message: errorMessage.required },
  ],
  expiry_date: [
    { required: true, message: errorMessage.required },
  ]
};




