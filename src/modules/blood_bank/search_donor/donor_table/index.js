/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Drawer as AntDrawer,Row , Col , Button , Icon , Input } from 'antd';
import { withRouter } from 'react-router-dom';
import TablePager from 'shared_components/table_pager';

const { Search } = Input;

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
		const { pageSize, } = this.props;

		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				width: '15%'
			},
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
				id:'1',
				key: '1',
				lastName: 'DOE',
				givenName: 'JOHN',
				middleName: 'GREEN',
				dateOfBirth: '10/02/1997',
				gender: 'Male',
				address: 'Quezon City',
			},
			{
				id:'2',
				key: '2',
				lastName: 'DOE',
				givenName: 'JANE',
				middleName: 'SMITH',
				dateOfBirth: '10/03/1997',
				gender: 'Female',
				address: 'Quezon City',
			},
			{
				id:'3',
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
		<div>
				<div style={{ marginLeft:1050 , marginBottom:10, marginTop:10 }}>
				
							<TablePager handleChange={this.handleSelectChange} />
						
				</div>
				<div className="settings-user-table">
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
				</div>    	
		</div>
		);
	}
}


export default withRouter(SearchDonorTable);
