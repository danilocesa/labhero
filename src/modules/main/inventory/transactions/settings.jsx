import vdltnMessage from 'global_config/error_messages';


export const fieldRules = {
	section: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	item_code: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) }
	],
	item_name: [
		{ required: true, message: vdltnMessage.required },
		{ max: 100, message: vdltnMessage.maxLength(100) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	unit: [
		{ required: true, message: vdltnMessage.required },
		{ max: 10, message: vdltnMessage.maxLength(10) },
		{ min: 2, message: vdltnMessage.minLength(2) }
	],
	threshold: [
		{ required: true, message: vdltnMessage.required },
		{ max: 12, message: vdltnMessage.maxLength(12) },
		{ min: 3, message: vdltnMessage.minLength(2) }
    ],
    thresholds: [
		{ required: true, message: vdltnMessage.required },
		{ max: 12, message: vdltnMessage.maxLength(12) },
		{ min: 3, message: vdltnMessage.minLength(2) }
	],
	supply: [
		{ required: true, message: vdltnMessage.required },
		{ max: 12, message: vdltnMessage.maxLength(12) },
		{ min: 3, message: vdltnMessage.minLength(2) }
	],
};