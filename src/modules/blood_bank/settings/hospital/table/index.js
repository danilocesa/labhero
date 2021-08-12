import React from 'react'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { PlusOutlined } from '@ant-design/icons';
import HospitalForm from '../hospitalForm'
import {getHospitalList} from 'services/blood_bank/hospital';
// import getHospitalList from 'services/blood_bank/hospital';
import TablePager from 'shared_components/table_pager';
import { Row, Col, Table, Button, Input, Drawer } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'HOSPITAL ID',
    dataIndex: 'hospital_id',
    sorter: (a, b) => a.hospital_id - b.hospital_id,
  },
  
  {
    title: 'HOSPITAL',
    dataIndex: 'hospital_name',
  },

  {
    title: 'LOCATION',
    dataIndex: 'hospital_location',
  },
  
];

class HospitalTable extends React.Component {
  constructor(props) {
		super(props);
		this.state = { 
      isDrawerVisible: false,
      HospitalList: [],
      actionType:'add',
			drawerTitle: '',
			loading:false,
			drawerButton: '',
      selectedData:{},
    }
	}

  async componentDidMount() {
		this.setState({loading:true});
		const response = await getHospitalList();
		
		this.setState({ 
			HospitalList: response,
			usersRef: response,
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
			drawerTitle: "ADD HOSPITAL",
      drawerButton:"ADD",
      actionType : 'add',
      selectedData: record
		});
	}


  displayDrawerUpdate = (record) => {
		this.setState({
			isDrawerVisible: true,
			drawerTitle: "UPDATE HOSPITAL",
      drawerButton:"UPDATE",
      actionType:'update',
      selectedData:record,
		});
	}


  onSearch = (value) => {
    const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;
    const filtered = usersRef.filter((item) => {
      // eslint-disable-next-line camelcase
      const { hospital_name } = item;

      return (
        this.containsString(hospital_name, searchedVal)
      );
    });
		this.setState({ HospitalList: filtered });
  };

  onChangeSearch = (event) => {
    const { usersRef } = this.state;
    if (event.target.value === "") this.setState({ HospitalList: usersRef });
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
  

  render() {
    const { 
      isDrawerVisible, 
      actionType, 
      drawerTitle,
      drawerButton,  
      HospitalList,
      loading   ,
      pagination,
      patientInfo,
			selectedData,

    } = this.state


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
              ADD HOSPITAL
            </Button >
            <TablePager handleChange={this.handleSelectChange}/>
          </Col>
				</Row>
        <DndProvider backend={HTML5Backend}>
        <Table  
          style={{textTransform:'uppercase'}}
          loading={loading}
          dataSource={HospitalList} 
          pagination={pagination}
          columns={columns} 
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
          <HospitalForm  
          selectedData={selectedData}
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


export default HospitalTable;