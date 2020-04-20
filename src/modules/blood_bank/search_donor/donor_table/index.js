/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Spin as AntSpin, Drawer as AntDrawer } from 'antd';
import { withRouter } from 'react-router-dom';

// @ts-ignore
// import { Table as AntTable, Spin as AntSpin } from 'antd';

import UpdatePatientForm from '../edit_donor_info';

// CSS
// import './table.css';
import ReactDOM from 'react-dom';

class SearchDonorTable extends React.Component {
	
	state = {
		showPatientInfo: false,
		// eslint-disable-next-line react/no-unused-state
		showLoading: true,
		isLoading: false
	};
	
	// Custom function
	onSampleIDClick = () => {
		this.setState({
		  showPatientInfo: true,
		});
	  }

	  onClosePatientInfoDrawer = () => {
		this.setState({
		  showPatientInfo: false,
		});
	  }

	// @ts-ignore
	render() {
		const { pageSize, loading } = this.props;
		//CONSTANTS
		const columns = [
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				width: '15%'
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				width: '15%'
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				width: '15%'
			}, 
			{
				title: 'DATE OF BIRTH',
				dataIndex: 'dateOfBirth',
				width: '14%'
			},
			{
				title: 'GENDER',
				dataIndex: 'gender',
				width: '12%'
			},
			{
				title: 'ADDRESS',
				dataIndex: 'address',
			},
		];

		const data = [
			{
			  key: '1',
			  lastName: 'DOE',
			  givenName: 'JOHN',
			  middleName: 'GREEN',
			  dateOfBirth: '10/02/1997',
			  gender: 'Male',
			  address: 'Quezon City',
			},
			{
				key: '2',
				lastName: 'DOE',
				givenName: 'JANE',
				middleName: 'SMITH',
				dateOfBirth: '10/03/1997',
				gender: 'Female',
				address: 'Quezon City',
			},
			{
				key: '3',
				lastName: 'DOE',
				givenName: 'JANE',
				middleName: 'SMITH',
				dateOfBirth: '10/03/1997',
				gender: 'Female',
				address: 'Quezon City',
			},
		  ];
		  
		return (
				<div className="search-patient-table">
					<AntTable 
						pagination={{pageSize}} 
						// @ts-ignore
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						onRow={(record, rowIndex) => {
							return {
							  onDoubleClick: this.onSampleIDClick, // double click row
							};
						}}
					/>
					<AntDrawer
						title="DONOR'S INFORMATION"
						onClose={this.onClosePatientInfoDrawer}
						width="80%"
						visible={this.state.showPatientInfo}
					>
						<UpdatePatientForm /> 
					</AntDrawer>
				</div>
		);
	}
}

SearchDonorTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		lastName: PropTypes.string.isRequired,
		givenName: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.string.isRequired,
		gender: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired
};

export default withRouter(SearchDonorTable);
