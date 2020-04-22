// @ts-nocheck
import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import { BBdonorRegIcon, BBaddBloodReqIcon, BBrecipientIcon, BBsearchDonorIcon } from 'images';
import BloodBankCard from './bloodbank_card';


import './bloodbank-menu.css';


const settingsItemData = [
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/donor_registration',
		label: 'DONOR REGISTRATION',
		offset: 2
	},
	{
		image: BBaddBloodReqIcon,
		link: '/bloodbank/blood_request',
		label: 'ADD BLOOD BANK REQUEST'
	},
	{
		image: BBrecipientIcon,
		link: '../bloodbank/blood_recipient',
		label: 'BLOOD RECIPIENT'
	},
	{
		image: BBsearchDonorIcon,
		link: '/bloodbank/search_donor',
		label: 'SEARCH DONOR'
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/settings',
		label: 'SETTINGS',
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