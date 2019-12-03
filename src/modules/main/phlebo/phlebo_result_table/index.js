// LIBRARY
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table as AntTable, Spin as AntSpin } from 'antd';

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
			<AntSpin spinning={loading} tip="Loading...">
				<div className="search-patient-table">
					<AntTable 
						pagination={{pageSize}} 
						size="small"
						// @ts-ignore
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						rowKey={record => record.patientID}
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