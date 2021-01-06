import React from 'react' 
import Message from 'shared_components/message'
import { Form, Input, Button, Row, Col, Select,Table } from 'antd'
import { fetchPatients } from 'services/blood_bank/search_donor'
import fetchbloodgroupitems from 'services/blood_bank/blood_group';
import TablePager from 'shared_components/table_pager';

// CONSTANTS
const { Option } = Select;

const columns = [
  {
    title: 'ID',
    dataIndex: 'donor_id',
    width: '15%'
  },
  {
    title: 'LAST NAME',
    dataIndex: 'last_name',
    width: '15%'
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'first_name',
    width: '15%'
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middleName',
    width: '15%'
  }, 
  {
    title: 'DATE OF BIRTH',
    dataIndex: 'birth_date',
    width: '14%'
  },
  {
    title: 'GENDER',
    dataIndex: 'gender',
    width: '12%'
  },
  {
    title: 'ADDRESS',
    dataIndex: 'barangay',
  },
];

class Header_Search_Donor extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Item: [],
      bloodgroupItem: [],
    };
    this.formRef = React.createRef();
  } 

  async componentDidMount() {
		this.setState({loading:true});
    const response = await fetchbloodgroupitems();
    console.log("RESPONSE", response)
		this.setState({ 
			bloodgroupItem: response,
		});
  }
  

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
    const { donors_id,Blood_group } = getFieldsValue();
		this.setState({ loading: true });
    const patients = await fetchPatients(donors_id, Blood_group); 
    console.log("Patients", patients)
    this.setState({ 
        loading: false,
        Item: patients  
    });

		if(patients.length <= 0) 
      Message.info('No results found');
  }

  
  render(){
    
    const { bloodgroupItem , Item} = this.state
    let bloodgroupList = bloodgroupItem.length > 0
		&& bloodgroupItem.map((item, i) => {
		return (
			<option key={i} value={item.blood_type_id}>{item.blood_type}</option>
		)
  	}, this);

      return(
          <div>
            <Form className="search-patient-form" ref={this.formRef}  onFinish={this.handleSubmit} style={{marginLeft:150,marginTop:50}}>
              <Row gutter={16}>
                <Col span={6} order={1}>
                  <div>
                    <Form.Item label="DONOR'S I D" name='donors_id'>
                        <Input/>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={2}>
                  <div>
                    <Form.Item label="BLOOD GROUP" name='Blood_group'>
                      <Select>
                        {bloodgroupList}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={3}>
                  <div>
                    <Form.Item label="LOCATION">
                      <Select placeholder="Select your location" allowClear>
                        <Option value="Caloocan">Caloocan</Option>
                        <Option value="Las Pinas">Las Pinas</Option>
                        <Option value="Makati">Makati</Option>
                        <Option value="Malabon">Malabon</Option>
                        <Option value="Mandaluyong">Mandaluyong</Option>
                        <Option value="City of Manila">City of Manila</Option>
                        <Option value="Marikina">Marikina</Option>
                        <Option value="Muntinlupa">Muntinlupa</Option>
                        <Option value="Navotas">Navotas</Option>
                        <Option value="Parañaque">Parañaque</Option>
                        <Option value="Pasay">Pasay</Option>
                        <Option value="Pasig">Pasig</Option>
                        <Option value="Quezon City">Quezon City</Option>
                        <Option value="San Juan">San Juan</Option>
                        <Option value="Taguig">Taguig</Option>
                        <Option value="Valenzuela">Valenzuela</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={6} order={4}>
                  <div>
                    <Form.Item>
                      <Button 
                          type="primary" 
                          shape="round" 
                          htmlType="submit" 
                      > SEARCH 
                      </Button>
                    </Form.Item>
                  </div>
                </Col>
              </Row>  
            </Form>
            <div style={{marginBottom:10, marginTop:'50px' }}>
             <TablePager handleChange={this.handleSelectChange} />
            </div>
            <div className="settings-user-table">
              <Table 
                // @ts-ignore
                columns={columns} 
                scroll={{ y: 260 }}
                dataSource={Item}
              />
            </div>
        </div>
      );
  }
}

export default Header_Search_Donor;

