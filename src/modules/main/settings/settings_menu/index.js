import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import { LabExamRequestIcon, UserMaintenanceIcon, NormalValuesIcon } from 'images';
import SettingsCard from './settings_card'

import './setting-menu.css';


const settingsItemData = [
	{
		image: LabExamRequestIcon,
		link: '/settings/exam-items',
		label: 'EXAM ITEMS',
		offset: 2
	},
	{
		image: LabExamRequestIcon,
		link: '/settings/exam-request',
		label: 'EXAM REQUEST'
	},
	{
		image: LabExamRequestIcon,
		link: '/settings/panel-exam',
		label: 'PANEL EXAM'
	},
	{
		image: NormalValuesIcon,
		link: 'settings/normal-values',
		label: 'NORMAL VALUES'
	},
	{
		image: UserMaintenanceIcon,
		link: '/settings/user-maintenance',
		label: 'USER MAINTENANCE'
	},
	{
		image: NormalValuesIcon,
		link: 'settings/normal-values',
		label: 'NORMAL VALUES'
	}
]

class SettingsMenu extends React.Component {
	render() {
		const rowItems = settingsItemData.map((el) => {
			return (
				<SettingsCard 
					image={el.image} 
					link={el.link} 
					label={el.label} 
					offset={el.offset}
					className=""
					key={el.label}
				/>
			);
		});

		return(
			<div>
				<PageTitle pageTitle="SETTINGS" />
				<Row gutter={30} style={{paddingTop: '20px'}}>
					{rowItems}
				</Row>
			</div>
		);
	}
}


export default SettingsMenu;