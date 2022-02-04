import React from 'react';
import { Row, Col } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
// @ts-ignore
import { LabExamRequestIcon, UserMaintenanceIcon, NormalValuesIcon, Report } from 'images';
import SettingsCard from './settings_card'

import './setting-menu.css';


const settingsItemData = [
	{
		image: LabExamRequestIcon,
		link: '/settings/exam-items',
		label: 'EXAM ITEMS'
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
		image: LabExamRequestIcon,
		link: '/settings/normal-values',
		label: 'NORMAL VALUES'
	},
	{
		image: UserMaintenanceIcon,
		link: '/settings/user-maintenance',
		label: 'USER MAINTENANCE'
	},
	{
		image: UserMaintenanceIcon,
		link: '/settings/user-rights',
		label: 'USER RIGHTS'
	},
	// {
	// 	image: UserMaintenanceIcon,
	// 	link: '/settings/address',
	// 	label: 'ADDRESS'
	// },
	// {
	// 	image: UserMaintenanceIcon,
	// 	link: '/settings/hospital',
	// 	label: 'HOSPITAL'
	// },
	{
		image: Report,
		link: '/settings/reports',
		label: 'REPORTS'
	}
]

class SettingsMenu extends React.Component {
	render() {
		const rowItems = settingsItemData.map((el) => {
			return (
				<Col xs={24} sm={24} md={4} lg={4} key={el.label}>
					<SettingsCard 
						image={el.image} 
						link={el.link} 
						label={el.label} 
					/>
				</Col>
			);
		});

		return(
			<div>
				<PageTitle pageTitle="SETTINGS" />
					<Row gutter={16} style={{ marginTop: 30 }}>
					{rowItems}
					</Row>
			</div>
		);
	}
}


export default SettingsMenu;