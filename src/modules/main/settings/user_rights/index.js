// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'antd';

import TablePager from 'shared_components/table_pager';
import PageTitle from 'shared_components/page_title';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined } from '@ant-design/icons';
import Form from './form';
import UserRightsTable from './table';
import { moduleTitle, tablePageSize, buttonLabels } from './settings';

const data = [
  { userTypeID: 1, userType: 'ROOT', dateCreated: '20-SEP-2019' },
  { userTypeID: 2, userType: 'ADMIN', dateCreated: '20-SEP-2019' },
  { userTypeID: 3, userType: 'RECEPTIONIST', dateCreated: '20-SEP-2019' },
  { userTypeID: 4, userType: 'PHLEBOMIST', dateCreated: '20-SEP-2019' },
  { userTypeID: 5, userType: 'MED TECH 1', dateCreated: '20-SEP-2019' },
];

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
		pageSize: tablePageSize,
		userRights: [],
	}

  onClickAdd = () => {
    this.setState({ isDisplayAddForm: true });
  }

  onChangePager = () => {

  } 

  onDblClickTableRow = () => {
		this.setState({ isDisplayUpdateForm: true });
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
			selectedSectionId,
		} = this.state;

		const rightSection = (
			<>
				<Button 
					shape="round"
					type="primary" 
					style={{ marginRight: 10 }}
					onClick={this.onClickAdd}
					disabled={selectedSectionId === null}
				>
					<PlusOutlined /> {buttonLabels.label4}
				</Button>
				<TablePager handleChange={this.onChangePager} />
			</>
		);

		return (
			<div>
				<section style={{ textAlign: 'center', marginTop: 30 }}>
					<PageTitle pageTitle={moduleTitle} />
				</section>
				<ActionSection rightContent={rightSection} />
				<UserRightsTable 
					data={data}
					pageSize={pageSize}
					loading={isLoading}
					onRowDblClick={this.onDblClickTableRow}
				/>
				<Form 
					type="add"
          visible={isDisplayAddForm}
          onClose={this.onCloseForm}
				/>	
				<Form 
					type="update"
					visible={isDisplayUpdateForm}
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