import React from 'react';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import HTML5Backend from 'react-dnd-html5-backend';
import TablePager from 'shared_components/table_pager';
import { PlusOutlined } from '@ant-design/icons';
import fetchCategoriesList from 'services/blood_bank/categories';
import {  Table, Input, Button,  Row, Col,  Drawer } from 'antd';

// CUSTOM
import DragableBodyRow from './drag_and_drop'
import CategoriesForm from '../categories_form'

// CSS
import './selected_table.css';
const { Search } = Input;

const columns = [
		{
		  title: 'ID',
		  dataIndex: 'categories_id',
		  key: 'categories_id',
		},
		{
		  title: 'ORDER',
		  dataIndex: 'categories_order',
			key: 'categories_order',
		},
		{
		  title: 'CATEGORY NAME',
		  dataIndex: 'categories_name',
			key: 'categories_name',
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'categories_desc',
			key: 'categories_desc',
		},
	  ];

class SelectedTable extends React.Component {
		constructor(props) {
			super(props);
				this.state = {
					categoriesItem: [],
					isDrawerVisible	: false,
					actionType:'add',
					selectedCategories:{},
				}
		}
		
		components = {
			body: {
				row: DragableBodyRow,
			},
	  };

	  moveRow = (dragIndex, hoverIndex) => {
		const { categoriesItem } = this.state;
		const dragRow = categoriesItem[dragIndex];
			this.setState(
				update(this.state, {
					categoriesItem: {
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

	  showDrawer = (record) => {
			this.setState({
				isDrawerVisible: true ,
				drawerTitle: "ADD CATEGORY",
				drawerButton: "ADD",
				actionType : 'add',
				selectedCategories: record
			});
		};

		onSearch = (value) => {
			const searchedVal = value.toLowerCase();
			const { usersRef } = this.state;
	
			const filtered = usersRef.filter((item) => {
				// eslint-disable-next-line camelcase
				const { categories_name } = item;
	
				return (
					this.containsString(categories_name, searchedVal)
				);
			});
			this.setState({ categoriesItem: filtered });
		};

		onChangeSearch = (event) => {
			const { usersRef } = this.state;
			if (event.target.value === "") this.setState({ categoriesItem: usersRef });
		};
	
		// Private Function
		containsString = (searchFrom, searchedVal) => {
			if (searchFrom === null || searchFrom === "") return false;
			return searchFrom.toString().toLowerCase().includes(searchedVal);
		};
		
		handleSelectChange = (value) => {
			// eslint-disable-next-line react/no-access-state-in-setstate
			const pagination = {...this.state.pagination};
			// eslint-disable-next-line radix
			pagination.pageSize = parseInt(value);
			this.setState({ pagination });
		};

		displayDrawerUpdate = (record) => {
			this.setState({
				isDrawerVisible: true,
				drawerTitle: "UPDATE CATEGORY",
				drawerButton: "UPDATE",
				actionType:'update',
				selectedCategories: record
			});
		}

		async componentDidMount() {
			const response = await fetchCategoriesList();
			console.log(response,'response')
			this.setState({ 
				categoriesItem: response,
				usersRef:response,
				pagination: response.length,
				loading:false
			});
		}

	render() {
		const { 
			loading = false
		} = this.props;
		const { 
			isDrawerVisible, 
			actionType, 
			drawerButton, 
			patientInfo,
			drawerTitle,
			pagination,
			selectedCategories 
		} = this.state;
		return (
			<div>
				<div className="settings-user-table-action">
					<Row>
						<Col span={12}>
							<Search
								placeholder="Search By Category Name"
								allowClear
								onSearch={(value) => this.onSearch(value)}
								onChange={this.onChangeSearch}
								style={{ width: 300 }}
								className="panel-table-search-input"
							/>
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
								icon={<PlusOutlined />}
							>
							 ADD CATEGORY
								
							</Button>
							<TablePager handleChange={this.handleSelectChange} />
						</Col>
					</Row>
				</div>
				<DndProvider backend={HTML5Backend}>
					<Table
						style={{textTransform:'uppercase'}}
						loading={loading}
						columns={columns}
						dataSource={this.state.categoriesItem}
						components={this.components}
						pagination={pagination}
						onRow={(record, index) => ({
							index,
							onDoubleClick: () => { 
								this.displayDrawerUpdate(record);
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
							selectedCategories={selectedCategories} 
							actionType={actionType}
							drawerButton={drawerButton} 
							patientInfo={patientInfo}
							onClose={this.onClose}
						/>
					</Drawer>
				</DndProvider>	
			</div>
		);
	}
}

export default SelectedTable;

