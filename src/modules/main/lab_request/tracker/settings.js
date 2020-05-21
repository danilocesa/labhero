import React from 'react';
import { requestLinks } from 'modules/main/settings/lab_exam_request/settings';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined, FormOutlined, CheckSquareOutlined, IdcardOutlined } from '@ant-design/icons';

export const trackerSettings={
	requestTypes: {
		create: 'create'
	},
	stepItems : [
		{
			title: 'Step 1',
			description: 'Search Patient',
			icon: <SearchOutlined />
		},
		{
			title: 'Step 2',
			description: 'Fill up',
			icon: <FormOutlined />
		},
		{
			title: 'Step 3',
			description: 'Select Lab Test',
			icon: <CheckSquareOutlined />
		},
		{
			title: 'Step 4',
			description: 'Summary',
			icon: <IdcardOutlined />
		}
	],
	links: {
		createRequest : `${requestLinks.create.base}step`,
		editRequest : `${requestLinks.edit.base}step`,
	}
}

export default trackerSettings;