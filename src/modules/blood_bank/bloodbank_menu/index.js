// @ts-nocheck
import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import { BBdonorRegIcon, BBaddBloodReqIcon } from 'images';
import BloodBankCard from './bloodbank_card';


import './bloodbank-menu.css';


const settingsItemData = [
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/donor_registration/step/1',
		label: 'DONOR REGISTRATION',
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/extraction/search',
		label: 'EXTRACTION',
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/screening/search',
		label: 'SCREENING',
	},
	{
		image: BBaddBloodReqIcon,
		link: '/bloodbank/blood_request/search',
		label: 'ADD BLOOD BANK REQUEST'
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/settings',
		label: 'SETTINGS',
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/blood_inventory/dashboard',
		label: 'BLOOD INVENTORY',
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/PRINTING',
		label: 'PRINTING',
	},
]

class BloodBankMenu extends React.Component {
	render() {
		const rowItems = settingsItemData.map((el) => {
			return (
				<BloodBankCard 
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
				<PageTitle pageTitle="BLOOD BANK" />
				<Row gutter={20} style={{paddingTop: '10px'}}>
					{rowItems}
				</Row>
			</div>
		);
	}
}


export default BloodBankMenu;