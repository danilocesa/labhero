import errorMessage from 'global_config/error_messages';

export const fieldRules = {
	sex: [
		{ required: true, message: errorMessage.required },
	],
	analyzerID: [
		{ required: true, message: errorMessage.required },
	],
	ageBracket: [
		{ required: true, message: errorMessage.required },
	],
	rangeLabel: [
		{ required: true, message: errorMessage.required },
	],
	displayValue: [
		{ required: true, message: errorMessage.required },
	],
	rangeLow: [
		{ required: true, message: errorMessage.required },
	],
	rangeHigh: [
		{ required: true, message: errorMessage.required },
	],
	rangeLowFlagDisplay: [],
	rangeHighFlagDisplay: [],
	canRelease: [],
	autoRelease: [],
};


export default fieldRules;