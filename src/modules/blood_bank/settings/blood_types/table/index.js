import React, { Component } from 'react'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import fetchBloodGroupItems from 'services/blood_bank/blood_group'
//import fetchBloodTypes from 'services/blood_bank/blood_types'
import TablePager from 'shared_components/table_pager';
import { Table,Drawer,Row,Col,Button,Input,Divider,Select} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from '../form'

const { Search } = Input;




const columns = [
  {
    title: 'BLOOD TYPE',
    dataIndex: 'blood_type',
    key: 'blood_type',
    //sorter: (a, b) => a.blood_type_id - b.blood_type_id,
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'blood_desc',
    key: 'blood_desc',
  },
  
];

export default class BloodTypesTable extends Component {
  constructor(props) {
		super(props);
			this.state = {
				drawerTitle:"",
        actionType:'add',
        loading:false,
				isDrawerVisible	: false,
        Data: [],
        dropdownvalues:'',
        drawerButton:'',
        loading:false,
        //tableData:[],
        AddButton:true,
        selectedBloodGroup:{},
        selectedBloodTypes:{},
			}
	}

  async componentDidMount(){
    this.setState({loading:true});
    const apiResponse = await fetchBloodGroupItems();
    //this.setState({loading:true});
    //const apiResponseBloodType = await fetchBloodTypes();

    this.setState({
      Data:apiResponse,
      //tableData:apiResponseBloodType,
      pagination: apiResponse.length,
      usersRef:apiResponse,
      loading:false
    
    })
  }

  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  showDrawer = (record) => {
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: `ADD BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "ADD",
      actionType : 'add',
      selectedBloodGroup: record,
      selectedBloodTypes: record,

		});
	};

  handleChange = (value) =>{
    this.setState({
      dropdownvalues:value,
      AddButton:false
    })
    // eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
  }

  onSearch = (value) => {
		const searchedVal = value.toLowerCase();
		const { usersRef } = this.state;

		const filtered = usersRef.filter((item) => {
			// eslint-disable-next-line camelcase
			const { blood_type } = item;
			return (
				this.containsString(blood_type, searchedVal)
			);
		});
		this.setState({ 
			Data: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ Data: usersRef });
	};

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};

  displayDrawerUpdate = (record) => {
    console.log (record)
    const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true,
			drawerTitle:`UPDATE BLOOD TYPES - ${dropdownvalues}`,
			buttonNames: "UPDATE",
      actionType:'update',
      selectedBloodGroup:record,
      selectedBloodTypes:record
		});
	}



  render() {
    const {
      drawerTitle,
      isDrawerVisible,
      Data,
      buttonNames, 
      //tableData,
      loading, 
      actionType,
      AddButton,
      patientInfo,
      dropdownvalues, 
      pagination,
      selectedBloodTypes,
      selectedBloodGroup,
    } = this.state
    const BloodGroupOption = Data.map((item,i) => {
      return (<option key={i} value={item.blood_group}>{item.blood_group}</option>)
    });


    return (
      <div>
        <Divider orientation="center" align = "middle">
          <Row >
            <Col span={12}>
              <Select style={{ width: 200}} onChange={this.handleChange} placeholder="Blood Group">
                {BloodGroupOption}
              </Select>
            </Col>
          </Row>
        </Divider>
        <Row style={{marginTop:10}}>
          <Col span={12}>
            <Search
              placeholder="Search By Blood Type"
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
              disabled={AddButton }
            >
              ADD BLOOD TYPE
            </Button>
            <TablePager handleChange={this.handleChange}/>
          </Col>
        </Row>
        <DndProvider backend={HTML5Backend}>
        <Table 
          loading={loading}
          style={{marginTop:10}}
          dataSource={Data} 
          pagination={pagination}
          columns={columns} 
          rowKey={record => record.userID}
          onRow={(record) => ({
            onDoubleClick: () => { 
              this.displayDrawerUpdate(record);
            },
          })}
        />
        <Drawer
          title={drawerTitle}
          visible={isDrawerVisible}
          onClose={this.onClose}
          width="30%"
          destroyOnClose
				>
          <Form 
            buttonNames={buttonNames} 
            dropdownvalues={dropdownvalues}
            patientInfo={patientInfo}
            actionType={actionType}
            selectedBloodTypes={selectedBloodTypes}
            selectedBloodGroup={selectedBloodGroup} 
            onClose={this.onClose}
          />
				</Drawer>
        </DndProvider>
      </div>
    )
  }
}
