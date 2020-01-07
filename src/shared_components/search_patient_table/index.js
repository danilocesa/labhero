/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Table as AntTable, Spin } from 'antd';
import { 
	CLR_STEP_PROGRESS, 
	CLR_SEARCHED_ID,
	CLR_SEARCHED_NAME,
	REQUEST_TYPE,
	MODULE_PROFILE
} from 'modules/main/lab_request/steps/constants'; 
import {globalTableSize} from '../../global_config/constant-global';

// CSS
import './table.css';

class SearchPatientTable extends React.Component {
	handleDoubleClick = (record, redirect) => {
		// eslint-disable-next-line react/prop-types
		const { history, drawer, SearchedPatientId, SearchedPatientName } = this.props;
		if(redirect) {
			// Strip some properties in the record object coz we dont need it
			delete record.dateCreated;
			delete record.addressID;

			sessionStorage.setItem(CLR_STEP_PROGRESS, String(2));
			sessionStorage.setItem(CLR_SEARCHED_ID, SearchedPatientId);
			sessionStorage.setItem(CLR_SEARCHED_NAME, SearchedPatientName);
			sessionStorage.setItem(REQUEST_TYPE, this.props.requestType);
			sessionStorage.setItem(MODULE_PROFILE, this.props.moduleProfile);

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
				title: 'PATIENT ID',
				dataIndex: 'patientID',
				sorter: getSorter(data, 'patientID'),
				width: '10%'
			},
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				sorter: getSorter(data, 'lastName'),
				width: '10%'
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				sorter: getSorter(data, 'givenName'),
				width: '10%'
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				sorter: getSorter(data, 'middleName'),
				width: '10%'
			}, 
			{
				title: 'DATE OF BIRTH',
				dataIndex: 'dateOfBirth',
				sorter:  getSorter(data, 'dateOfBirth'),
				width: '10%'
			},
			{
				title: 'GENDER',
				dataIndex: 'sex',
				sorter:  getSorter(data, 'sex'),
				width: '10%'
			},
			{
				title: 'ADDRESS',
				dataIndex: 'address',
				sorter:  getSorter(data, 'address'),
				render: (text,row) => <p>{`${text}, ${row.townName}, ${row.cityMunicipalityName}, ${row.provinceName}`}</p>
			},
		];

		return (
			<Spin spinning={loading} tip="Loading...">
				<div className="search-patient-table">
					<AntTable 
						size={globalTableSize}
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
		contactNo: PropTypes.string,
		emailAdd: PropTypes.string
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	redirectUrl: PropTypes.string.isRequired,
	SearchedPatientId: PropTypes.string,
	SearchedPatientName: PropTypes.string,
	requestType: PropTypes.string,
	moduleProfile: PropTypes.string
	// moduleProfile: PropTypes.string.isRequired
};

SearchPatientTable.defaultProps = {
	SearchedPatientId: '',
	SearchedPatientName: '',
	requestType: '',
	moduleProfile: ''
}

export default withRouter(SearchPatientTable);