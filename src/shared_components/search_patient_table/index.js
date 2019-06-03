/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Table as AntTable, Spin } from 'antd';

// CSS
import './table.css';

// CONSTANTS
const columns = [
	{
		title: 'LAST NAME',
		dataIndex: 'lastName',
		sorter: (a, b) => a.lastName.localeCompare(b.lastName),
		width: '15%'
	},
	{
		title: 'FIRST NAME',
		dataIndex: 'givenName',
		sorter: (a, b) => a.givenName.localeCompare(b.givenName),
		width: '15%'
	},
	{
		title: 'MIDDLE NAME',
		dataIndex: 'middleName',
		sorter: (a, b) => a.middleName.localeCompare(b.middleName),
		width: '12%'
	},
	{
		title: 'DATE OF BIRTH',
		dataIndex: 'dateOfBirth',
		sorter: (a, b) => a.dateOfBirth.localeCompare(b.dateOfBirth),
		width: '15%'
	},
	{
		title: 'GENDER',
		dataIndex: 'sex',
		sorter: (a, b) => a.sex.localeCompare(b.sex),
		width: '8%'
	},
	{
		title: 'ADDRESS',
		dataIndex: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
	},
];

class SearchPatientTable extends React.Component {
	handleDoubleClick = (record, redirect) => {
		const { history, drawer } = this.props;
		if(redirect) {
			// Strip some properties in the record object coz we dont need it
			delete record.dateCreated;
			delete record.addressID;
			history.push(redirect, { record });
		}
		else  {
			drawer(record);
		}
	}
	
	render() {
		const { data, pageSize, loading, redirectUrl } = this.props;

		console.log(data);

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
		sex: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	redirectUrl:PropTypes.string.isRequired,
};

export default withRouter(SearchPatientTable);