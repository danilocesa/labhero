import React from 'react';
import fetchInventoryItems from 'services/blood_bank/blood_group';
import BloodGroupTable from './table';

class BloodGroup extends React.Component {
	state = {
		inventoryItem: []
	};
	
	async componentDidMount() {
		const response = await fetchInventoryItems();
		
		this.setState({ inventoryItem: response});
		console.log(response)
	}

	render() {
		const { inventoryItem } = this.state;

		return(
			<div style={{marginTop: -50}}>
				<BloodGroupTable data={inventoryItem} />
			</div>
		);
	} 
}

export default BloodGroup;