import React from 'react'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PlusOutlined } from '@ant-design/icons';
import StorageForm from '../storageForm'
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer } from 'antd';
import fetchBloodStorage from 'services/blood_inventory/blood_storage';

const { Search } = Input;

const columns = [
	{
		title: 'STORAGE',
		dataIndex: 'storage_name',
		key: '1',
		width: 200,
		sorter: (a, b) => a.blood_storage_id - b.blood_storage_id,
	},
	{
		title: 'DESCRIPTION',
		dataIndex: 'storage_desc',
		key: '3',
	},
];

class StorageTable extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			isDrawerVisible	: false,
      bloodStorageItem: [],
      actionType:'add',
			drawerTitle: '',
			loading:false,
			drawerButton: '',
      selectedBloodStorage:{},
		}
	}

  async componentDidMount() {
		this.setState({loading:true});
		const response = await fetchBloodStorage();
    console.log("🚀 ~ file: index.js ~ line 44 ~ StorageTable ~ componentDidMount ~ response", response)
		
		this.setState({ 
			bloodStorageItem: response,
			usersRef:response,
			pagination: response.length,
			loading:false
		});
	}

  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  showDrawer = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "ADD STORAGE",
      drawerButton: 'ADD',
			actionType : 'add',
      selectedBloodStorage: record,
		});
	}


  displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "UPDATE STORAGE",
			drawerButton: 'UPDATE',
			actionType:'update',
      selectedBloodStorage: record
		});
	}

  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;
    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { storage_name } = item;

      return (
        this.containsString(storage_name, searchedVal)
      );
    });
		this.setState({ bloodStorageItem: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ bloodStorageItem: usersRef });
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

  // onDrawerClose = () => {
	// 	this.setState({
	// 		visible: false,
	// 	});
	// };
  
  

  render() {
    //const { loading = false } = this.props;
    const { 
      isDrawerVisible, 
      actionType, 
      drawerTitle,
      drawerButton, 
      bloodStorageItem,
      patientInfo,
      loading,
      pagination,
      selectedBloodStorage

    } = this.state;
  

    return (
      <div>
        <Row style={{ marginBottom: 10 }}>
          <Col span={12} >
          <Search
							placeholder="Search By Storage Name"
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
              onClick={this.showDrawer}
              style={{ marginRight: '15px' }} 
              icon={<PlusOutlined />}
            >
              ADD STORAGE
            </Button >
            <TablePager handleChange={this.handleSelectChange}/>
          </Col>
				</Row>
        <DndProvider backend={HTML5Backend}>
        <Table  
          style={{textTransform:'uppercase'}}
          loading={loading}
          columns={columns}
          dataSource={bloodStorageItem} 
          pagination={pagination}
          onRow={(record) => {
            return {     
              onDoubleClick: () => {
                this.displayDrawerUpdate(record);
              }
            }
          }}/>
        <Drawer
          title={drawerTitle}
          width="30%"
          visible={isDrawerVisible}
          onClose={this.onClose}
          destroyOnClose
        >
          <StorageForm 
          selectedBloodStorage={selectedBloodStorage} 
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

export default StorageTable;