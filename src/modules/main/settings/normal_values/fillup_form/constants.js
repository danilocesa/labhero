import errorMessage from 'global_config/error_messages';

export const fieldRules = {
	sex: [
		{ required: true, message: errorMessage.required },
	],
	analyzerID: [],
	ageBracket: [],
	rangeLabel: [],
	displayValue: [],
	rangeLow: [],
	rangeHigh: [],
	rangeLowFlagDisplay: [],
	rangeHighFlagDisplay: [],
	canRelease: [],
	autoRelease: [],
};


export default fieldRules;