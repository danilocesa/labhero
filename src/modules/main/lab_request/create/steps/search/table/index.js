import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Table as AntTable } from 'antd';

import './table.css';

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
		title: 'CITY ADDRESS',
		dataIndex: 'address',
		sorter: (a, b) => a.address.localeCompare(b.address),
	},
];


class Table extends React.Component {
	handleDoubleClick = (record) => {
		const { history } = this.props;

		history.push('/request/create/step/2', { record });
	}
	
	render() {
		const { data, pageSize } = this.props;

		return (
			<div className="search-patient-table">
				<AntTable 
					pagination={{pageSize}} 
					columns={columns} 
					dataSource={data} 
					scroll={{ y: 260 }}
					rowKey={record => record.patientID}
					onRow={(record) => {
						return { 
							onDoubleClick: () => this.handleDoubleClick(record)
						};
					}}
				/>
			</div>
		);
	}
}

Table.propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({
		givenName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired,
		dateOfBirth: PropTypes.string.isRequired,
		sex: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired
};

export default withRouter(Table);
