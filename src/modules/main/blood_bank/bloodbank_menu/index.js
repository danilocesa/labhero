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
		label: 'Donor Registration',
		offset: 4
	},
	{
		image: BBdonorRegIcon,
		link: '/bloodbank/settings',
		label: 'Settings',
	},
	{
		image: BBaddBloodReqIcon,
		link: '/bloodbank/blood_request',
		label: 'Add Blood Request'
	},
	{
		image: BBrecipientIcon,
		link: '../bloodbank/blood_recipient',
		label: 'Blood Recipient'
	},
	{
		image: BBsearchDonorIcon,
		link: '/bloodbank/search_donor',
		label: 'Seach Donor'
	}
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
				<Row gutter={30} style={{paddingTop: '20px'}}>
					{rowItems}
				</Row>
			</div>
		);
	}
}


export default BloodBankMenu;