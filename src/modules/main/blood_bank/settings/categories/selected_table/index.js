/* eslint-disable react/prop-types */
// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Table, Input, Form, Switch, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import CategoriesForm from '../categories_form'
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { 
	Drawer
  } from 'antd';

// CUSTOM
import { selectedTableConst, tableSize } from '../settings';
import DragableBodyRow from './drag_and_drop';

// CSS
import './selected_table.css';

const {labels} = selectedTableConst;

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
	state = {
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
	  };
	
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


	render() {
		const { data, loading = false } = this.props;

		return (
			<div style={{ marginTop: 20 }}>
				<Spin spinning={loading} tip="Loading...">
				<DndProvider backend={HTML5Backend}>
					<Table
					columns={columns}
					dataSource={this.state.data}
					components={this.components}
					pagination={false} 
					onRow={(record, index) => ({
						index,
						moveRow: this.moveRow,
					})}
					/>
					<Drawer 
					title={this.state.drawerTitle}
					visible={this.state.isDrawerVisible}
					onClose={this.onClose}
					width="40%"
					destroyOnClose
				>
					<CategoriesForm 
						drawerButton={this.state.drawerButton} 
						panelInfo={this.state.panelInfo}
						onCancel={this.onClose}
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


