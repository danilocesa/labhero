import React, { Component } from 'react'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import fetchBloodGroupItems from 'services/blood_bank/blood_group'
//import fetchBloodTypes from 'services/blood_bank/blood_types'
import TablePager from 'shared_components/table_pager';
import { Table,Drawer,Row,Col,Button,Input,Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from '../form'

const { Search } = Input;
//const { Title } = Typography;

const { Option } = Select;
const columns = [
  {
    title: 'BLOOD TYPE',
    dataIndex: 'blood_type',
    key: '1',
    sorter: (a, b) => a.blood_type_id - b.blood_type_id,
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'blood_desc',
    key: 3,
  },
  
];

export default class BloodTypesTable extends Component {
  constructor(props) {
		super(props);
			this.state = {
				drawerTitle:"",
        actionType:'add',
        //loading:false,
				isDrawerVisible	: false,
        Data: [],
        bloodtypeData:[],
        dropdownvalues:'',
        drawerButton:'',
        //loading:false,
        //tableData:[],
        AddButton:true,
        selectedBloodGroup:{},
        selectedBloodTypes:{},
        Searchbutton:true,
        disableddata:true,
			}
	}

  async componentDidMount(){
    const apiResponseBloodType = await fetchBloodGroupItems();
    this.setState({
      Data:apiResponseBloodType,
      pagination: apiResponseBloodType.length,
    })
  }

  showDrawer = (record) => {
    //const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: `ADD BLOOD TYPE `, //${dropdownvalues}
			drawerButton: "ADD",
      actionType : 'add',
      selectedBloodGroup: record,
      selectedBloodTypes: record,

		});
	};

  displayDrawerUpdate = (record) => {
    //const {dropdownvalues} =this.state
		this.setState({
			isDrawerVisible: true,
			drawerTitle:`UPDATE BLOOD TYPES `, // ${dropdownvalues}
			drawerButton: "UPDATE",
      actionType:'update',
      selectedBloodGroup:record,
      selectedBloodTypes:record
		});
	}

 
  onChangedata =  (value) => { 
    console.log("🚀 ~ file: index.js ~ line 100 ~ BloodTypesTable ~ onChangedata= ~ value", value)
    // const ResponseBloodType = await fetchBloodGroupItems(value)
    // this.setState({ 
    //   bloodtypeData:null,
    //   usersRef:null,
    //   dropdownvalues:value,
    //   AddButton:false,
    //   Searchbutton:false,
    //   disabledata:false
    // }) 
	}

  handleChange = (value) =>{
    // eslint-disable-next-line react/no-access-state-in-setstate
		const pagination = {...this.state.pagination};
		// eslint-disable-next-line radix
		pagination.pageSize = parseInt(value);
		this.setState({ pagination });
  }

  // onSearch = (value) => {
	// 	const searchedVal = value.toLowerCase();
	// 	const { usersRef } = this.state;

	// 	const filtered = usersRef.filter((item) => {
	// 		// eslint-disable-next-line camelcase
	// 		const { blood_type } = item;
	// 		return (
	// 			this.containsString(blood_type, searchedVal)
	// 		);
	// 	});
	// 	this.setState({ 
	// 		bloodtypeData: filtered 
	// 	});
	// };

	// onChangeSearch = (event) => {
	// 	const { usersRef } = this.state;
	// 	if (event.target.value === "") this.setState({ bloodtypeData: usersRef });
	// };

	containsString = (searchFrom, searchedVal) => {
		if (searchFrom === null || searchFrom === "") return false;
		return searchFrom.toString().toLowerCase().includes(searchedVal);
	};

  onClose = () => {
		this.setState({
			isDrawerVisible: false,
		});
	};

  onDisable = () => {
    this.setState({
      disabled:false
    })
  } 


  render() {
    const {
      drawerTitle,
      isDrawerVisible,
      Data,
      drawerButton, 
      actionType,
      AddButton,
      dropdownvalues, 
      pagination,
      selectedBloodTypes,
      selectedBloodGroup,
      Searchbutton,
      // bloodtypeData
    } = this.state

    const BloodGroupOption = Data.map((item,i) => {
      return (
      <Option key={i} value={item.blood_type_id}>
        {item.blood_group}
      </Option>)
    });

    return ( 
      <>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '8vh'}}>
          <Row  gutter={[24, 8]}>
            <Col span={10} pull= {1}>
            <h4>BLOOD GROUP</h4>
            </Col>
            <Col span={12} pull= {2} >
              <Select style={{ width: 155, textTransform: 'uppercase' }} onChange={this.onChangedata} placeholder="Blood Group">
                {BloodGroupOption}
              </Select>
            </Col>
          </Row>
        </div>
        <Row style={{marginTop:3}}>
          <Col span={12}>
            <Search
              
              placeholder="Search By Blood Type"
							allowClear
							onSearch={(value) => this.onSearch(value)}
							onChange={this.onChangeSearch}
							style={{ width: 300 }}
              disabled={Searchbutton}
							//className="panel-table-search-input"
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
          
          //loading={loading}
          style={{marginTop:10, textTransform: 'uppercase'}}
          // dataSource={bloodtypeData} 
          columns={columns} 
          pagination={pagination}
          rowKey={record => record.userID}
          onRow={(record) => ({
            onDoubleClick: () => { 
              this.displayDrawerUpdate(record);
            },
          })}
          // onRow={(record) => {
          //   return {     
          //     onDoubleClick: () => {
          //       this.displayDrawerUpdate(record);
          //     }
          //   }
          // }}
        />
        <Drawer
          title={drawerTitle}
          visible={isDrawerVisible}
          onClose={this.onClose}
          onChange={this.onDisable}
          width="30%"
          destroyOnClose
				>
          <Form 
            drawerButton={drawerButton} 
            dropdownvalues={dropdownvalues}
            actionType={actionType}
            selectedBloodTypes={selectedBloodTypes}
            selectedBloodGroup={selectedBloodGroup} 
            onClose={this.onClose}
          />
				</Drawer>
        </DndProvider>
      </>
    )
  }
}
