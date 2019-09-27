/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Table as AntTable, Spin } from 'antd';

import { CLR_STEP_PROGRESS } from 'modules/main/lab_request/create/steps/constants'; 

// CSS
import './table.css';

// CONSTANTS
// const columns = [
// 	{
// 		title: 'LAST NAME',
// 		dataIndex: 'lastName',
// 		sorter: (a, b) => a.lastName.localeCompare(b.lastName),
// 		width: '15%'
// 	},
// 	{
// 		title: 'FIRST NAME',
// 		dataIndex: 'givenName',
// 		sorter: (a, b) => a.givenName.localeCompare(b.givenName),
// 		width: '15%'
// 	},
// 	{
// 		title: 'MIDDLE NAME',
// 		dataIndex: 'middleName',
// 		sorter: (a, b) => a.middleName.localeCompare(b.middleName),
// 		width: '15%'
// 	}, 
// 	{
// 		title: 'DATE OF BIRTH',
// 		dataIndex: 'dateOfBirth',
// 		sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
// 		width: '14%'
// 	},
// 	{
// 		title: 'GENDER',
// 		dataIndex: 'sex',
// 		sorter: (a, b) => a.sex.localeCompare(b.sex),
// 		width: '12%'
// 	},
// 	{
// 		title: 'ADDRESS',
// 		dataIndex: 'address',
// 		sorter: (a, b) => a.address.localeCompare(b.address),
// 	},
// ];

// console.log(columns[0]);

// getSorter = (data) => data.length > 0 ? (a, b) => a.lastName.localeCompare(b.lastName) : false;

class SearchPatientTable extends React.Component {
	handleDoubleClick = (record, redirect) => {
		// eslint-disable-next-line react/prop-types
		const { history, drawer } = this.props;
		if(redirect) {
			// Strip some properties in the record object coz we dont need it
			delete record.dateCreated;
			delete record.addressID;

			sessionStorage.setItem(CLR_STEP_PROGRESS, String(2));
			history.push(redirect, { record });
		}
		else  {
			drawer(record);
		}
	} 
	
	render() {
		const { data, pageSize, loading, redirectUrl } = this.props;

		const getSorter = (myDataSource, columnName) => {
			if(myDataSource.length > 0) {
				const columnSorter = (a, b) => {
					if(a[columnName] !== null) {
						return a[columnName].localeCompare(b[columnName])
					}
					return 1;
				};
				
				return columnSorter;
			} 
			return false;
		};

		// CONSTANTS
		const columns = [
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				sorter: getSorter(data, 'lastName'),
				width: '15%'
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				sorter: getSorter(data, 'givenName'),
				width: '15%'
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				sorter: getSorter(data, 'middleName'),
				width: '15%'
			}, 
			{
				title: 'DATE OF BIRTH',
				dataIndex: 'dateOfBirth',
				sorter:  getSorter(data, 'dateOfBirth'),
				width: '14%'
			},
			{
				title: 'GENDER',
				dataIndex: 'sex',
				sorter:  getSorter(data, 'sex'),
				width: '12%'
			},
			{
				title: 'ADDRESS',
				dataIndex: 'address',
				sorter:  getSorter(data, 'address'),
			},
		];

		return (
			<Spin spinning={loading} tip="Loading...">
				<div className="search-patient-table">
					<AntTable 
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.patientID}
						onRow={(record) => {
							return { 
								onDoubleClick: () => {
									this.handleDoubleClick(record,redirectUrl)
								}
							};
						}}
          
					/>
				</div>
			</Spin>
		);
	}
}

SearchPatientTable.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({
		givenName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.string.isRequired,
		sex: PropTypes.string.isRequired,
		contactNo: PropTypes.string.isRequired,
		emailAdd: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	redirectUrl:PropTypes.string.isRequired,
};

export default withRouter(SearchPatientTable);