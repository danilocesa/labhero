export const moduleURI = {
	dashboard: {
		key: 1,
		link: '/',
	},
	createLabReq: {
		key: 2,
		link: '/request/create/step/1',
	},
	editLabReq: {
		key: 3,
		link: '/request/edit/step/1',
	},
	phlebo: {
		key: 4,
		link: '/phlebo/result',
	},
	editLabResult: {
		key: 5,
		link: '/lab/result/edit',
	},
	printLabResult: {
		key: 6,
		link: '/lab/result/print',
	},
	searchPatient: {
		key: 7,
		link: '/patient/search',
	},
	settings: {
		key: 8,
		link: '/settings',
	},
	inventory: {
		key: 9,
		link: '/inventory',
		sub: {
			stocks: {
				key: 10,
				link: '/inventory/stocks',
			},
			transaction: {
				key: 11,
				link: '/inventory/transaction',
			},
			restock: {
				key: 12,
				link: '/inventory/restock',
			},
			takeout: {
				key: 13,
				link: '/inventory/takeout',
			},
			notifications: {
				key: 14,
				link: '/inventory/notifications',
			},
			itemsetup: {
				key: 15,
				link: '/inventory/itemsetup',
			},
			settings: {
				key: 16,
				link: '/inventory/settings',
			},
		}
	},
	bloodbank: {
		key: 17,
		link: '/bloodbank',
	},
	cashier: {
		key: 18,
		link: '/cashier',
	}
};

export default moduleURI;