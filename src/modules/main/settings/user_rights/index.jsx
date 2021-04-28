// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

import TablePager from 'shared_components/table_pager';
import PageTitle from 'shared_components/page_title';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined } from '@ant-design/icons';
import { GLOBAL_TABLE_PAGE_SIZE } from 'global_config/constant-global';
import FormDrawerAdd from './form_drawer/index.jsx';
import FormDrawerUpdate from './form_drawer/index.jsx';
import UserRightsTable from './table';
import { getUserTypes } from 'services/settings/userType';


const ActionSection = (props) => (
	<Row style={{ marginTop: 50 }}>
		<Col span={12} offset={12} style={{ textAlign: 'right' }}>
			{props.rightContent}
		</Col>
	</Row>
);

class UserRights extends React.Component {
	state = {
    isLoading: false,
		isDisplayAddForm: false,
		isDisplayUpdateForm: false,
		pageSize: GLOBAL_TABLE_PAGE_SIZE,
		selectedId: null,
		userRights: [],
	}

	async componentDidMount() {
		await this.fetchUserTypes();
	}

	fetchUserTypes = async () => {
		this.setState({ isLoading: true });

		const response = await getUserTypes();
    console.log("file: index.jsx ~ line 43 ~ UserRights ~ fetchUserTypes= ~ response", response)
		
		// @ts-ignore
		response.status === 200 && this.setState({ userRights: response.data });

		this.setState({ isLoading: false });
	}

  onClickAdd = () => {
    this.setState({ isDisplayAddForm: true });
  }

	
  onChangePager = (size) => {

		this.setState({ pageSize: size })
  } 

  onDblClickTableRow = (record) => {
		this.setState({ isDisplayUpdateForm: true, selectedId: record.userTypeID });
  }

  onCloseForm = () => {
    this.setState({ 
			isDisplayAddForm: false,
			isDisplayUpdateForm: false, 
		});
  }


	render() {
		const { 
			pageSize, 
      isLoading,
			isDisplayAddForm,
			isDisplayUpdateForm,
			selectedId,
			userRights
		} = this.state;

		const rightSection = (
			<>
				<Button 
					shape="round"
					type="primary" 
					style={{ marginRight: 10 }}
					onClick={this.onClickAdd}
				>
					<PlusOutlined /> 
					ADD USER TYPE
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle="USER TYPES" />
				</section>
				<ActionSection rightContent={rightSection} />
				<UserRightsTable 
					data={userRights}
					pageSize={pageSize}
					loading={isLoading}
					onRowDblClick={this.onDblClickTableRow}
					componentDidMount={this.componentDidMount}
				/>
				<FormDrawerAdd 
          visible={isDisplayAddForm}
					refreshTableData={this.fetchUserTypes}
          onClose={this.onCloseForm}
				/>	
				<FormDrawerUpdate 
					id={selectedId}
          visible={isDisplayUpdateForm}
					refreshTableData={this.fetchUserTypes}
          onClose={this.onCloseForm}
				/>	
			</div>
		);
	}
}

ActionSection.propTypes = {
	rightContent: PropTypes.node.isRequired
};

export default UserRights;