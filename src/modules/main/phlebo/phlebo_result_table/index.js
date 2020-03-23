// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table as AntTable, Spin as AntSpin } from 'antd';
import { globalTableSize } from 'global_config/constant-global';

// CSS
import './phlebo_result_table.css';

class SearchPatientTable extends React.Component {
	/**
   * @param {{ dateCreated: any; addressID: any; }} record
   */
	handleDoubleClick = (record) => {
		// eslint-disable-next-line react/prop-types
		const { drawer } = this.props;
		drawer(record);
	} 
	
	render() {
		const { data, pageSize, loading } = this.props;
		
		const getSorter = (myDataSource, columnName) => {
			// @ts-ignore
			if(myDataSource === undefined || myDataSource.length === 0 ){
				return false;
			}
			
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
				title: 'REQUEST ID',
				dataIndex: 'requestID',
				sorter: getSorter(data, 'requestID'),
				width: 150
			},
			{
				title: 'REQUEST DATE',
				dataIndex: 'requestDateTime',
				sorter: getSorter(data, 'requestDateTime'),
				width: 150
			},
			{
				title: 'PATIENT ID',
				dataIndex: 'patientID',
				sorter: getSorter(data, 'patientID'),
				width: 130
			},
			{
				title: 'LAST NAME',
				dataIndex: 'lastName',
				sorter: getSorter(data, 'lastName'),
				width: 190
			},
			{
				title: 'FIRST NAME',
				dataIndex: 'givenName',
				sorter: getSorter(data, 'givenName'),
				width: 190
			},
			{
				title: 'MIDDLE NAME',
				dataIndex: 'middleName',
				sorter: getSorter(data, 'middleName'),
				width: 190
			}, 
			{
				title: 'DATE OF BIRTH',
				dataIndex: 'dateOfBirth',
				sorter:  getSorter(data, 'dateOfBirth'),
				width: 150
			},
			{
				title: 'GENDER',
				dataIndex: 'sex',
				sorter:  getSorter(data, 'sex'),
				width: 110
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
			<AntSpin spinning={loading} tip="Loading...">
				<div>
					<AntTable 
						pagination={{pageSize}} 
						size={globalTableSize}
						// @ts-ignore
						columns={columns} 
						dataSource={data} 
						scroll={{ x: 1500, y: 260 }}
						rowKey={record => record.requestID}
						onRow={(record) => {
							return { 
								onDoubleClick: () => {
									// @ts-ignore
									this.handleDoubleClick(record)
								}
							};
						}}
					/>
				</div>
			</AntSpin>
		);
	}
}

SearchPatientTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		givenName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.string.isRequired,
		sex: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired
};

export default withRouter(SearchPatientTable);