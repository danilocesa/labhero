/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import ReactRouterPropTypes from 'react-router-prop-types';
import { requestLinks, requestTypes } from 'modules/main/settings/lab_exam_request/settings';
import { 	LR_REQUEST_TYPE , 	LR_OTHER_INFO , LR_PERSONAL_INFO , LR_STEP_PROGRESS, LR_IS_EXAM_UPDATED  } from 'modules/main/lab_request/steps/constants';
import { GLOBAL_TABLE_SIZE } from 'global_config/constant-global';
import { Table as AntTable, Spin , Button } from 'antd';

// CSS
import './table.css';

const personalInfoKeys = [
	'hospitalID',
	'patientID',
	'emailAdd',
	'givenName',
	'middleName',
	'lastName',
	'nameSuffix',
	'dateOfBirth',
	'sex',
	// 'city',
	// 'town',
	// 'provinces',
	'address',
	'addressCode',
	'contactNumber'
];

const otherInfoKeys = [
	'hospitalID',
	'patientID',
	'visit',
	'chargeSlip',
	'officialReceipt',
	'hospitalRequestID',
	'patientAge',
	'locationID',
	'bed',
	'physicianID',
	'comment'
];

class SearchPatientTable extends React.Component {

	goToNextPage = () => {
		const { history } = this.props;

		if(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create)
			history.push(requestLinks.create.step3);
		else 
			history.push(requestLinks.edit.step3);
	}

	handleSubmit = (fields) => {

		delete fields.dateCreated;
		delete fields.addressID;

		// Save personal and other info to session storage
		// for edit module
		if(fields.requestHeader) {
			const { requestHeader, ...persoInfo } = fields;
			const { userID, requestDateTime, ...otherInfo } = fields.requestHeader;

			sessionStorage.setItem(LR_PERSONAL_INFO, JSON.stringify(persoInfo));
			sessionStorage.setItem(LR_OTHER_INFO, JSON.stringify(otherInfo));
		}

		sessionStorage.setItem(LR_IS_EXAM_UPDATED, String(0));
		sessionStorage.setItem(LR_STEP_PROGRESS, String(2));
		
		const sessOtherInfo = JSON.parse(sessionStorage.getItem(LR_OTHER_INFO));
		const reqType = sessionStorage.getItem(LR_REQUEST_TYPE);


		const otherInfo = pick(fields, otherInfoKeys);
		const personalInfo = pick(fields, personalInfoKeys);
		

		// Convert each field's value to uppercase
		Object.keys(personalInfo).forEach(field => {
			if(personalInfo[field] !== undefined && personalInfo[field] !== null )
				personalInfo[field] = personalInfo[field].toUpperCase();
		});
		
		delete personalInfo.patientID;
		
		this.setState({ isLoading: true }, async() =>{

			// If form is came from edit search module, append requestID on otherInfo
			if(reqType === 'edit') {
				otherInfo.requestID = sessOtherInfo.requestID;
			}

			sessionStorage.setItem(LR_OTHER_INFO, JSON.stringify(otherInfo));
			sessionStorage.setItem(LR_PERSONAL_INFO, JSON.stringify(personalInfo));
			sessionStorage.setItem(LR_STEP_PROGRESS, String(3));

			this.setState({ isLoading: false });

			this.goToNextPage();
		});

	}

	render() {
		// CONSTANTS
		const { data, pageSize, loading, handleDoubleClick, ...rest } = this.props;
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
		
		const Createcolumns = [
			{
				title: 'PATIENT ID',
				dataIndex: 'patientID',
				sorter: getSorter(data, 'patientID'),
				width: 150
			},
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				sorter: getSorter(data, 'lastName'),
				width: 150
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				sorter: getSorter(data, 'givenName'),
				width: 150
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				sorter: getSorter(data, 'middleName'),
				width: 150
			}, 
			{
				title: 'BIRTHDATE',
				dataIndex: 'dateOfBirth',
				sorter:  getSorter(data, 'dateOfBirth'),
				width: 150
			},
			{
				title: 'GENDER',
				dataIndex: 'sex',
				sorter:  getSorter(data, 'sex'),
				width: 150
			},
			{
				title: 'ADDRESS',
				dataIndex: 'address',
				sorter:  getSorter(data, 'address'),
				render: (text, row) => {
					const { address, townName, cityMunicipalityName, provinceName } = row;

					if(row.address)
						return `${address}, ${townName}, ${cityMunicipalityName}, ${provinceName}`.toUpperCase();

					return '';
				}
			},
		];

		const Updatecolumns = [
			{
				title: 'REQUEST ID',
				sorter:  getSorter(data, 'address'),
				width: 150,
				render: (text, record) => {
					const { requestID } = record.requestHeader;
						return `${requestID}`.toUpperCase();
				}
			},
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				sorter: getSorter(data, 'lastName'),
				width: 150
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				sorter: getSorter(data, 'givenName'),
				width: 150
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				sorter: getSorter(data, 'middleName'),
				width: 150
			}, 
			{
				title: 'BIRTHDATE',
				dataIndex: 'dateOfBirth',
				sorter:  getSorter(data, 'dateOfBirth'),
				width: 150
			},
			{
				title: 'GENDER',
				dataIndex: 'sex',
				sorter:  getSorter(data, 'sex'),
				width: 150
			},
			{
				title: 'ADDRESS',
				dataIndex: 'address',
				sorter:  getSorter(data, 'address'),
				render: (text, row) => {
					const { address, townName, cityMunicipalityName, provinceName } = row;

					if(row.address)
						return `${address}, ${townName}, ${cityMunicipalityName}, ${provinceName}`.toUpperCase();

					return '';
				}
			},
			{
				title: 'ACTION',
				key: 'action',
				render: (text, record) => (
					<>
						<Button onClick={ ()=> handleDoubleClick(record) } >Edit Request </Button>
						<Button style={{marginLeft:20}} onClick={ ()=> this.handleSubmit(record) }>Edit Exam </Button>
					</>
				),
			},
		];

		return (
			<Spin spinning={loading} tip="Loading...">
				<div className="search-patient-table">
					<AntTable 
						size={GLOBAL_TABLE_SIZE}
						pagination={{ pageSize, showSizeChanger: false }} 
						columns={(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create) ? Createcolumns : Updatecolumns }
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.key}
						// expandedRowRender={(sessionStorage.getItem(LR_REQUEST_TYPE) === requestTypes.create) ? null : this.expandedRowRender }
						onRow={(record) => {
							return { 
								onDoubleClick: () => { handleDoubleClick(record) }
							};
						}}
						{...rest}
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
		emailAdd: PropTypes.string,
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	handleDoubleClick: PropTypes.func.isRequired
};

export default withRouter(SearchPatientTable);