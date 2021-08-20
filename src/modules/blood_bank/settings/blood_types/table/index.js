import React, { Component } from 'react'
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import fetchBloodGroupItems from 'services/blood_bank/blood_group'
import {fetchBloodTypes} from 'services/blood_bank/blood_types'
import TablePager from 'shared_components/table_pager';
import { Table,Drawer,Row,Col,Button,Input,Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Form from '../form'
//import FormItem from 'antd/lib/form/FormItem';

const { Search } = Input;
const { Option } = Select;
//const { Title } = Typography;


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
				isDrawerVisible	: false,
        //Data: [],
        bloodtypeData:[],
        dropdownvalues:'',
        drawerButton:'',
        AddButton:true,
        selectedBloodGroup:{},
        selectedBloodTypes:{},
        Searchbutton:true,
        disableddata:true,
        Data: [{id: 1, 
              blood_group: "A"} ,
             {id: 2, blood_group: "B"},
             {id: 3, blood_group: "AB"},
             {id: 4, blood_group: "O"}],
			}
      //this.handleChange = this.handleChange.bind(this)
	}

  // async componentDidMount(){
  //   //this.setState({loading:true});
  //    const apiResponseBloodType = await fetchBloodTypes(); 
  //   this.setState({
  //     //  Data: [{"id": 1, "blood_group": "A"},
  //     //         {"id": 2, "blood_group": "B"},
  //     //         {"id": 3, "blood_group": "AB"},
  //     //         {"id": 4, "blood_group": "O"}],
  //     pagination: apiResponseBloodType.length,
  //   })
  // }

  showDrawer = (record) => {
		this.setState({
			isDrawerVisible: true ,
			drawerTitle: `ADD BLOOD TYPE `, 
			drawerButton: "ADD",
      actionType : 'add',
      Data : [],
      selectedBloodGroup: record,
      selectedBloodTypes: record,

		});
	};

  displayDrawerUpdate = (record) => {
    console.log (record)
    
		this.setState({
			isDrawerVisible: true,
			drawerTitle:`UPDATE BLOOD TYPES `,
			drawerButton: "UPDATE",
      actionType:'update',
      selectedBloodGroup:record,
      selectedBloodTypes:record,
      
      
		});
	}

  // onChangedata = async (value) => { 
  //   const ResponseBloodType = await fetchBloodTypes(value)
  //   this.setState({

  //     // dropdownvalues:[],
  //     bloodtypeData:ResponseBloodType,
  //     usersRef:[],
  //    // blood_group:value,
  //     AddButton:false,
  //     Searchbutton:false,
  //     disabledata:false,
  //     //form:false,
  //   }) 


	// }

  // handleChange(e) {
  //   this.setState({obj: this.props.listOption[e.target.value].obj})
  // }

  // handleChange = (value) =>{
  //   // eslint-disable-next-line react/no-access-state-in-setstate
	// 	const pagination = {...this.state.pagination};
	// 	// eslint-disable-next-line radix
	// 	pagination.pageSize = parseInt(value);
	// 	this.setState({ pagination });
  // }

  handleChange = async (value) =>{
    //const ResponseBloodType = await fetchBloodGroupItems();
    const ResponseBloodType = await fetchBloodTypes(value)
  
    this.setState({
     // Data:ResponseBloodType,
       bloodtypeData:ResponseBloodType,
       usersRef:[],
      dropdownvalues:value,
      AddButton:false,
      Searchbutton:false,
      disabledata:false,
      pagination: ResponseBloodType.length,
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
			bloodtypeData: filtered 
		});
	};

	onChangeSearch = (event) => {
		const { usersRef } = this.state;
		if (event.target.value === "") this.setState({ bloodtypeData: usersRef });
	};

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
      bloodtypeData,
    } = this.state

    const BloodGroupOption = Data.map((item, i ) => {
      return ( 
        <Option key={i} value={item.blood_group}> {item.blood_group}</Option>
     
      )
    });

    // const bloodtypeDatamapping = bloodtypeData.map((item,i) => {
    //   return (
    //     <option key={i} value={item.blood_type_id} >
    //       {item.blood_type}
    //     </option>
    //   )
    // });

    return (
      <div>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '8vh'}}>
          <Row  gutter={[24, 8]}>
            <Col span={10} pull= {1}>
            <h4>BLOOD GROUP</h4>
            </Col>
            <Col span={12} pull= {2} >
              <Select style={{ width: 155, textTransform: 'uppercase' }}
            onChange={this.handleChange} placeholder="Blood Group">
                {BloodGroupOption}
                {/* <Option value="A">A</Option>
                <Option value="AB">AB</Option>
                <Option value="B">B</Option>
                <Option value="0">O</Option> */}
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
          style={{marginTop:10, textTransform: 'uppercase'}}
          dataSource={bloodtypeData} 
          columns={columns} 
          pagination={pagination}
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
          onDisable={this.onDisable}
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
      </div>
    )
  }
}
