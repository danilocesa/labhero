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
		link: '/bloodbank/donor_registration',
		label: 'DONOR REGISTRATION',
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/extraction/screening',
		label: 'EXTRACTION/SCREENING',
	},
	{
		image: BBaddBloodReqIcon,
		link: '/bloodbank/blood_request',
		label: 'ADD BLOOD BANK REQUEST'
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/settings',
		label: 'SETTINGS',
	},
	{
		image: BBrecipientIcon,
		link: '/bloodbank/blood_inventory',
		label: 'BLOOD INVENTORY',
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