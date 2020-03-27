import errorMessage from 'global_config/error_messages';

export const fieldLabels = {
  transaction_date: "FROM DATE ~ TO DATE",
  section: "SECTION",
  transaction_type: "TRANSACTION TYPE",
  item: "ITEM"
}

export const buttonNames = {
  clear: "CLEAR",
  search : "SEARCH"
}

export const FIELD_RULES = {
	patientName: [
		{ min: 2, message: errorMessage.minLength(2) },
		{ max: 100, message: errorMessage.maxLength(100) }
	],
	patientId: [
		{ max: 20, message: errorMessage.maxLength(20) }
	],
};