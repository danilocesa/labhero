import vdltnMessage from 'global_config/error_messages';


export const fieldRules = {
	transaction_date: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	section: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) }
	],
	item: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	bar_code: [
		{ required: true, message: vdltnMessage.required },
		{ max: 10, message: vdltnMessage.maxLength(10) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	search: [
		{ required: true, message: vdltnMessage.required },
		{ max: 10, message: vdltnMessage.maxLength(10) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
};