/* eslint-disable no-param-reassign */

// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { globalTableSize } from 'global_config/constant-global';
import { Table as AntTable, Spin } from 'antd';

// CSS
import './table.css';

class SearchPatientTable extends React.Component {

	
	render() {
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

		// CONSTANTS
		const columns = [
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

		return (
			<Spin spinning={loading} tip="Loading...">
				<div className="search-patient-table">
					<AntTable 
						size={globalTableSize}
						pagination={{ pageSize, showSizeChanger: false }} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.patientID}
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
		emailAdd: PropTypes.string
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	handleDoubleClick: PropTypes.func.isRequired
};

export default withRouter(SearchPatientTable);