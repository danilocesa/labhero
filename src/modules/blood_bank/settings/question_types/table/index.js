// @ts-nocheck
// LIBRARY
import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Icon, Drawer,Divider,Select 	 } from 'antd';
import fetchItems from 'services/blood_bank/question_type';


//CUSTOM
import { 
	drawerAdd, 
	drawerUpdate, 
	tableSize ,
	tableYScroll,
	tablePageSize
} from '../settings';
import BloodTypeForm from '../form';

const { Search } = Input;
const { Option } = Select;
const columns = [
	{
		title: 'QUESTION TYPE ID',
		dataIndex: 'ques_type_id',
		key: '1',
		width: 200,
		sorter: (a, b) => a.ques_type_id - b.ques_type_id,
	},
	{
		title: 'QUESTION ORDER',
		dataIndex: 'ques_order',
		key: 2,	
    width: 300,
    sorter: (a, b) => a.ques_order - b.ques_order,
	},
	{
		title: 'QUESTION TYPE NAME',
		dataIndex: 'ques_type_name',
		key: 3,
	},
];

class BloodType extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      drawerTitle: '',
			Item:[],
			loading:false,
			pagination: {
				pageSize: tablePageSize,
			},
			pagination1: 0
		}
  }
  
  async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchItems();
		console.log("Data:",response)
		this.setState({ 
			Item: response,
			usersRef:response,
			pagination: response.length,
			loading:false
		});
	}

  showDrawer = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "ADD QUESTION TYPES",
			drawerButton: 'ADD',
			actionType : 'add',
			selectedTypes: record,
		});
  };

  displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "UPDATE QUESTION TYPES",
			drawerButton: 'UPDATE',
			actionType:'update',
			selectedTypes:record
		});
	}

	onClose = () => {
		this.setState({
			visible: false,
			patientInfo: [],
		});
	};

	onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;
    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { ques_order } = item;

      return (
        this.containsString(ques_order, searchedVal)
      );
    });
		this.setState({ Item: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ Item: usersRef });
  };

  containsString = (searchFrom, searchedVal) => {
    if (searchFrom === null || searchFrom === "") return false;
    return searchFrom.toString().toLowerCase().includes(searchedVal);
  };

	handleSelectChange = (value) => {
		// eslint-disable-next-line react/no-access-state-in-setstate
		const pagination1 = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination1.pageSize = parseInt(value);
		this.setState({ pagination1 });
	};
  
	render() {
    const { 
			pagination, 
			drawerButton, 
			patientInfo, 
			visible,
			drawerTitle,
			selectedTypes, 
      actionType,
      Item,
			loading ,
			pagination1
		} = this.state;
		return(
			<div>
				<div className="settings-user-table-action">
					<Divider plain>
						<Select style={{ width: 200 }}>
							<Option value="Categories">
								Categories
							</Option>
						</Select>
					</Divider>
          <Row>
						<Col span={12}>
              <Search
                allowClear
                onSearch={(value) => this.onSearch(value)}
                onChange={this.onChangeSearch}
                style={{ width: 200 }}
                className="panel-table-search-input"
              />
						</Col>
						<Col span={12} style={{ textAlign: 'right' }}>
							<Button 
								type="primary" 
								shape="round" 
								style={{ marginRight: '15px' }} 
								onClick={this.showDrawer}
							>
								<Icon type="plus" /> ADD BLOOD GROUP
							</Button>
              <TablePager 
                handleChange={this.handleSelectChange} 
              />
						</Col>
					</Row>
				</div>
        <DndProvider backend={HTML5Backend}>
          <div className="settings-user-table">
					{
					pagination1 == 0
					? 
						(		
							<Table 
								loading={loading}
								dataSource={Item}
								columns={columns} 
								//pagination={pagination}
								rowKey={record => record.userID}
								onRow={(record) => {
									return {     
										onDoubleClick: () => {
											this.displayDrawerUpdate(record);
										}
									}
								}}
							/>
						)	
					: 
						(
							<Table 
								loading={loading}
								dataSource={Item}
								scroll={{ y: tableYScroll }}
								columns={columns} 
								rowKey={record => record.userID}
								onRow={(record) => {
									return {     
										onDoubleClick: () => {
											this.displayDrawerUpdate(record);
										}
									}
								}}
							/>
						)
				}	
          </div>    
          {/* DRAWER */}
            <Drawer
              title={drawerTitle}
              width="30%"
              visible={visible}
              onClose={this.onClose}
              destroyOnClose
            >
              <BloodTypeForm
                selectedTypes={selectedTypes} 
                actionType={actionType}
                drawerButton={drawerButton} 
                patientInfo={patientInfo}
                onClose={this.onClose}
              />
            </Drawer>
				</DndProvider>
			</div>
		)
	}
}


export default BloodType;	