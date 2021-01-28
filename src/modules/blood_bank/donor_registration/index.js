// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Steps,
  Typography,
  Empty ,
  Form
} from "antd";

// ICON
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined, ContainerOutlined, MedicineBoxOutlined } from '@ant-design/icons';

// CUSTOM MODULES
import { RegexInput } from 'shared_components/pattern_input';
import PageTitle from 'shared_components/page_title'
import TablePager from "shared_components/table_pager"
import Message from 'shared_components/message'
import { fetchPatients } from 'services/blood_bank/donor_registration'

const { Step } = Steps
const { Text } = Typography
const columns = [
  {
    title: "DONOR'S ID",
    dataIndex: "donor_id",
    key: 1
  },
  {
    title: "LAST NAME",
    dataIndex: "last_name",
    key: 2
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
    key: 3
  },
  {
    title: "MIDDLE NAME",
    dataIndex: 'middle_name',
    key: 4
  },
  {
    title: "GENDER",
    dataIndex: "gender",
    key: 5
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: 'birth_date',
    key: 6
  },
  {
    title: "ADDRESS",
    dataIndex: 'barangay_name',
    key: 7
  },
  {
    title: "BLOOD TYPE",
    dataIndex: 'blood_type',
    key: 8
  },
  {
    title: "LAST EXTRACTED",
    dataIndex: 'last_extracted',
    key: 9
  },
];

class DonorRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Item: [],
      record:{},
      ExpandedRow:false,
      //pageSize:null
      length:1
    };
    this.formRef = React.createRef();
  } 

  componentDidMount(){
    const {Item} = this.state
    //this.setState({ length: Item.length});
  }

  handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}   

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
		const { patientName,donor_id } = getFieldsValue();
		this.setState({ loading: true });
    const patients = await fetchPatients(patientName, donor_id); 
    console.log("Patients", patients)
    this.setState({ 
        loading: false,
        Item: patients ,
        length:0
    });

		if(patients.length <= 0) 
      Message.info('No results found');
  }
  
  NextStep = () => {
    this.props.history.push("/bloodbank/donor_registration/step/2",{label: "SUBMIT"});
  } 

  DoubleClick = (record) => {
    record.data = {record}
    record.label = "UPDATE"
    this.props.history.push("/bloodbank/donor_registration/step/2",record);
    this.setState({
      record:record
    })
  }

  ExpandedRow = () => {

    const columns2 = [
      {
        title: "CONTACT NUMBER",
        dataIndex: "mobile_no",
        key: 9,
        width: 150
      },
      {
        title: "ADDRESS",
        dataIndex: "unit_house_no",
        key: 10,
        width: 250
      },
    ];

    return <Table columns={columns2} pagination={false} dataSource={this.state.Item} />
  }

  clearInputs = async () => {
    window.location.reload(false);
  }
  

  render() {
    const { Item,loading,pageSize,length } = this.state
    console.log(length,"length")
    return (
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
          <Steps size="small" current={0} style={{marginTop:20,paddingRight:200,paddingLeft:200}} labelPlacement="vertical">
            <Step title="Search Donor" icon={<SearchOutlined />}  />
            <Step title="Fill Up" icon={<ContainerOutlined />} />
            <Step title="Health Information" icon={<MedicineBoxOutlined />} />
          </Steps>
        <Row>
          <Col span={24}>
            <Col span={12} style={{ textAlign: "center", marginTop:30, marginLeft:50}}>
              <Form 
                className="search-patient-form" 
                onFinish={this.handleSubmit} 
                ref={this.formRef}
                layout="vertical"
              >
                <Row justify="center">
                  {/* Search Input */}
                  <Col>
                      <Row>
                        <Col span={9}>
                          <Form.Item label="DONOR'S ID" name="donor_id" style={{marginLeft:30}}>
                            <RegexInput 
                              style={{width:200}}
                              regex={/[A-Za-z0-9, -]/} 
                              maxLength={100}
                              placeholder="Donor's ID"
                            />
                          </Form.Item>
                        </Col>
                        <Text strong style={{marginTop:20, marginLeft:10}}>OR</Text>
                        <Col span={9}>
                          <Form.Item label="DONOR'S NAME" name="patientName" style={{marginLeft:10}}>
                            <RegexInput 
                              style={{width:350}}
                              regex={/[A-Za-z0-9, -]/} 
                              maxLength={100}
                              placeholder="Lastname, Firstname"
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                  </Col>
                  {/* Buttons */}
                  <Col style={{marginTop:18, marginRight:-450}}>
                    <Form.Item shouldUpdate> 
                    {({ getFieldsValue }) => {
                      const { donor_id, patientName } = getFieldsValue();
                      const disabled = !(donor_id || (patientName && patientName.length > 0));
                      return (
                        <Row>
                          <Button 
                            className="form-button"
                            shape="round" 
                            style={{ width: 120, marginLeft:10 }}
                            onClick={this.clearInputs} 
                          >
                            CLEAR
                          </Button>
                          <Button 
                            loading={loading}
                            className="form-button"
                            shape="round" 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: 120 }}
                            disabled={disabled}
                          >
                            SEARCH
                          </Button>
                        </Row>
                      )
                    }}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
            {/* Table Header */}
            <Row style={{marginTop:-80}}>
              <Col span={12} style={{ textAlign: "Left", marginTop:100 }}>
                <div className="table-title">
                  <div>
                    <Text strong>SEARCH RESULTS</Text>
                  </div>
                    <div className="left">
                  <Text>Showing {pageSize} items out of results {Item.length} </Text>
                    </div>
                </div>
              </Col>
              <Col span={12} style={{ textAlign: "right", marginTop:140 }}>
                <TablePager handleChange={this.handleChangeSize} />
              </Col>
            </Row> 
            {/* Table */}
            <Table 
              style={{textTransform: 'uppercase'}}
              dataSource={Item}
              expandableRowIcon={<text type="right" />}
              columns={columns} 
              pagination={{pageSize}}
              rowKey={record => record.donor_id}
              locale={{
                emptyText: 
                (<div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    {length <= 0? (	
                      <Button 
                        className="form-button"
                        shape="round" 
                        onClick={this.NextStep}
                        type="link"
                        htmlType="submit" 
                        style={{ width: 120, marginTop:-10 }}
                        >
                        REGISTER
                      </Button>
                      )
                      :null
                    }
                 </div>)
              }} 
              onRow={(record) => {
                return {     
                  onDoubleClick: () => {
                    this.DoubleClick(record)
                  }
                }
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DonorRegistration;

