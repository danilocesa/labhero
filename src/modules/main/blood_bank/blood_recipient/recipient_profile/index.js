// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Spin as AntSpin, Drawer as AntDrawer } from 'antd';
import { withRouter } from 'react-router-dom';
import RecipientInfo from '../recipient_info';

// @ts-ignore
// import { Table as AntTable, Spin as AntSpin } from 'antd';

// CSS
// import './table.css';
import ReactDOM from 'react-dom';

class RecipientList extends React.Component {
	
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
				title: 'ID NO.',
				dataIndex: 'id',
				width: '14%'
			},
		];

		const data = [
			{
			  key: '1',
			  lastName: 'DOE',
			  givenName: 'JOHN',
			  middleName: 'GREEN',
			  id: '000000',
			},
			{
				key: '2',
				lastName: 'DOE',
				givenName: 'JANE',
				middleName: 'SMITH',
				id: '000000',
			},
			{
				key: '3',
				lastName: 'DOE',
				givenName: 'JANE',
				middleName: 'SMITH',
				id: '000000',
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
						title="RECIPIENT INFORMATION"
						onClose={this.onClosePatientInfoDrawer}
						width="80%"
						visible={this.state.showPatientInfo}
					>
						<RecipientInfo /> 
					</AntDrawer>
				</div>
		);
	}
}

RecipientList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		lastName: PropTypes.string.isRequired,
		givenName: PropTypes.string.isRequired,
		middleName: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	})).isRequired,
	pageSize: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired
};

export default withRouter(RecipientList);
