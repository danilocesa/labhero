// @ts-nocheck
import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import { InvList,InvListLots,InvRestock,InvSettings,InvTakeout,InvTransaction } from 'images';
import InventoryCard from './inventory_card';


import './inventory_menu.css';


const settingsItemData = [
	{
		image: InvList,
		link: '/bloodbank/blood_request',
		label: 'Donor Registration',
		offset: 2
	},
	{
		image: InvListLots,
		link: '/bloodbank/blood_request',
		label: 'Add Blood Request'
	},
	{
		image: InvRestock,
		link: '../bloodbank/blood_recipient',
		label: 'Blood Recipient'
	},
	{
		image: InvSettings,
		link: '/bloodbank/search_donor',
		label: 'Seach Donor'
	},
	{
		image: InvTakeout,
		link: '/bloodbank/settings',
		label: 'Settings',
	},
	{
		image: InvTransaction,
		link: '/bloodbank/settings',
		label: 'Settings',
	},
]

class BloodBankMenu extends React.Component {
	render() {
		const rowItems = settingsItemData.map((el) => {
			return (
				<InventoryCard 
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