/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Input, Form, Switch, Button,  Row, Col, Icon, Drawer } from 'antd';
import { DndProvider } from 'react-dnd';
import CategoriesForm from '../categories_form'
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

// CUSTOM
import { drawerUpdateTitle } from '../settings';
import DragableBodyRow from './drag_and_drop';

// CSS
import './selected_table.css';
const { Search } = Input;

const columns = [
		{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		},
		{
		  title: 'ORDER',
		  dataIndex: 'order',
		  key: 'order',
		},
		{
		  title: 'CATEGORY NAME',
		  dataIndex: 'category_name',
		  key: 'category_name',
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			key: 'description',
		},
	  ];

class SelectedTable extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				data: [
				{
					id: '1',
					order: 'John Brown',
					category_name: 32,
					description: 'New York No. 1 Lake Park',
				},
				{
					id: '2',
					order: 'Jim Green',
					category_name: 42,
					description: 'London No. 1 Lake Park',
				},
				{
					id: '3',
					order: 'Joe Black',
					category_name: 32,
					description: 'Sidney No. 1 Lake Park',
				},
				],
		isDrawerVisible	: false,
		actionType:'add',
	  }
	}
	  components = {
		body: {
		  row: DragableBodyRow,
		},
	  };

	  moveRow = (dragIndex, hoverIndex) => {
		const { data } = this.state;
		const dragRow = data[dragIndex];
	
		this.setState(
		  update(this.state, {
			data: {
			  $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
			},
		  }),
		);
	  };
	  
	  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	  };
	  showDrawer = () => {
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: "BLOOD BANK ADD",
			drawerButton: "Add",
			actionType : 'add',
		});
	};
		displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "UPDATE BLOOD GROUP",
			drawerButton: "UPDATE",
			actionType:'update',
			patientInfo: record
		});
	}
	render() {
		const { loading = false } = this.props;
		const { isDrawerVisible, actionType, drawerButton, patientInfo,drawerTitle } = this.state;
		return (
			<div >
				<div className="settings-user-table-action">
					<Row>
						<Col span={12}>
							<Search
								placeholder="input search text"
								onSearch={value => value}
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
								<Icon type="plus"/>ADD CATEGORY
							</Button>
						</Col>
					</Row>
				</div>
				<Spin spinning={loading} tip="Loading...">
				<DndProvider backend={HTML5Backend}>
					<Table
						loading={loading}
						columns={columns}
						dataSource={this.state.data}
						components={this.components}
						pagination={false} 
						onRow={(record, index) => ({
							index,
							onDoubleClick: () => { 
							this.setState({ isDrawerVisible: true });
							},
							moveRow: this.moveRow,
						})}
					/>
					<Drawer
							title={drawerTitle}
							width="30%"
							visible={isDrawerVisible}
							onClose={this.onClose}
							destroyOnClose
						>
							<CategoriesForm
								actionType={actionType}
								drawerButton={drawerButton} 
								patientInfo={patientInfo}
								onClose={this.onClose}
							/>
					</Drawer>
        
				</DndProvider>	
				</Spin>
			</div>
		);
	}
}

SelectedTable.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		examItemID: PropTypes.any.isRequired,
		examItemName: PropTypes.string.isRequired,
	})).isRequired,
	loading: PropTypes.bool.isRequired,
	onDragAndDropRow: PropTypes.func.isRequired
};

export default Form.create()(SelectedTable);


