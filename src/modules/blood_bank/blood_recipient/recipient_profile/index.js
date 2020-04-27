// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Table as AntTable, Drawer as AntDrawer,Row , Col, Button, Icon, Input} from 'antd';
import { withRouter } from 'react-router-dom';
import RecipientInfo from '../recipient_info'

import TablePager from 'shared_components/table_pager';

const { Search } = Input;

class RecipientList extends React.Component {
	
	state = {
		showPatientInfo: false,
		// eslint-disable-next-line react/no-unused-state
		showLoading: true,
	};
	
	// Custom function
	showDrawer = () => {
		this.setState({
			showPatientInfo: true,
			drawerTitle: "ADD BLOOD RECIPIENT",
			drawerButton: "ADD",
			actionType : 'add',
			patientInfo: [],
		});
	};

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
	const { pageSize } = this.props;
		const columns = [
			{
				title: 'ID NO.',
				dataIndex: 'id',
				width: '14%'
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
			
			<div>
				<div className="settings-user-table-action">
						<Row>
							<Col span={12}>
							<Search
								placeholder="input search text"
								onSearch={value => console.log(value)}
								style={{ width: 200 }}
							/>
							</Col>
							<Col span={12} style={{ textAlign: 'right' }}>
								<Button 
									type="primary" 
									shape="round" 
									style={{ marginRight: '15px' }} 
									onClick={this.showDrawer}
								>
									<Icon type="plus" /> ADD BLOOD RECIPIENT
									
								</Button>
								<TablePager handleChange={this.handleSelectChange} />
							</Col>
						</Row>
				</div>

				<div className="search-patient-table">
					<AntTable 
						pagination={{pageSize}} 
						columns={columns} 
						dataSource={data} 
						scroll={{ y: 260 }}
						onRow={() => {
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
};

export default withRouter(RecipientList);
