import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import { LabExamRequestIcon, UserMaintenanceIcon } from "images";
import SettingsCard from './settings_card'

import './setting-menu.css';


const settingsItemData = [
	{
		image: LabExamRequestIcon,
		link: '/settings/exam-items',
		label: 'Exam Items',
		offset: 4
	},
	{
		image: LabExamRequestIcon,
		link: '/settings/exam-request',
		label: 'Exam Request'
	},
	{
		image: LabExamRequestIcon,
		link: '../settings/panel-exam',
		label: 'Panel Exam'
	},
	{
		image: UserMaintenanceIcon,
		link: '/settings/user-maintenance',
		label: 'User Maintenance'
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