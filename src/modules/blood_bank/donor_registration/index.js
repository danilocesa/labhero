// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import { Redirect } from 'react-router-dom';
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
    key: "donor_id"
  },
  {
    title: "LAST NAME",
    dataIndex: "last_name",
    key: "last_name"
  },
  {
    title: "FIRST NAME",
    dataIndex: "first_name",
    key: "first_name"
  },
  {
    title: "MIDDLE NAME",
    dataIndex: 'middle_name',
    key: 'middle_name'
  },
  {
    title: "GENDER",
    dataIndex: "gender",
    key: "gender"
  },
  {
    title: "DATE OF BIRTH",
    dataIndex: 'date_of_birth',
    key: 'date_of__birth'
  },
  {
    title: "BLOOD TYPE",
    dataIndex: 'blood_type',
    key: 'blood_type'
  },
  {
    title: "LAST EXTRACTED",
    dataIndex: 'last_extracted',
    key: 'last_extracted'
  },
];

const columns2 = [
  {
    title: "CONTACT NUMBER",
    dataIndex: "mobile_no",
    key: "mobile_no",
    width: 150
  },
  {
    title: "ADDRESS",
    dataIndex: "unit_house_no",
    key: "unit_house_no",
    width: 250
  },
];

class DonorRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerButton: '',
      loading: false,
      Item: []
    };

    this.formRef = React.createRef();
  } 

	async componentDidMount() {
		const response = await fetchPatients();
		console.log(response)
  }

  handleSubmit = async () => {
    const { getFieldsValue } = this.formRef.current;
		const { patientName } = getFieldsValue();
    let patients = [];
    
		this.setState({ loading: true });
		patients = await fetchPatients(patientName); 
    this.setState({ 
        loading: false,
        Item: patients  
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
  }

  ExpandedRow = () => {
    return <Table columns={columns2} pagination={false} dataSource={this.state.Item} />
  }

  clearInputs = async () => {
		const { populatePatients } = this.props;
		const { setFieldsValue } = this.formRef.current;
		let patients = [];
		setFieldsValue({ patientName: '' });
		patients = []; 
		populatePatients(patients);
	}

  render() {
    const { Item,loading } = this.state
    return (
      <div>
        <PageTitle pageTitle="DONOR REGISTRATION"  />
        <Steps size="small" current={0} style={{marginTop:50,paddingRight:200,paddingLeft:200}}>
          <Step title="Search Donor"  />
          <Step title="Fill Up" />
          <Step title="Health Information" />
        </Steps>
        <Row>
          <Col span={24}>
            <div>
              <Row>
                <Col span={12} style={{ textAlign: "center", marginTop:50, marginLeft:300}}>
                <Form 
                  className="search-patient-form" 
                  onFinish={this.handleSubmit} 
                  ref={this.formRef}
                  layout="vertical"
                >
                  <Row justify="center">
                    <Col span={10}>
                      <Form.Item label="PATIENT NAME" name="patientName">
                        <RegexInput 
                          regex={/[A-Za-z0-9, -]/} 
                          maxLength={100}
                          onFocus={this.handleFocus}
                          placeholder="Lastname, Firstname"
                        />
                      </Form.Item>
                    </Col>
                    {/* Buttons */}
                    <Col span={11} style={{marginTop:20}}>
                      <Form.Item>
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
                          >
                            SEARCH
                          </Button>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                </Col>
              </Row>
              <Row style={{marginTop:-80}}>
                <Col span={12} style={{ textAlign: "Left", marginTop:100 }}>
                  <div className="table-title">
                    <div>
                      <Text strong>SEARCH RESULTS</Text>
                    </div>
                      <div className="left">
                        <Text>Showing  items out of results</Text>
                      </div>
                  </div>
                </Col>
                <Col span={12} style={{ textAlign: "right", marginTop:140 }}>
                  <TablePager handleChange={this.handleSelectChange} />
                </Col>
              </Row>
            </div> 

            {Item.length <= 0? (		
              <Table
              columns={columns}
              locale={{
                  emptyText: 
                  (<div>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      <Button 
                      className="form-button"
                      shape="round" 
                      onClick={this.NextStep}
                      type="primary" 
                      htmlType="submit" 
                      style={{ width: 120, marginTop:-10 }}
                      >
                      ADD DONOR
                      </Button>
                   </div>)
                }} 
              /> 
            )	
						: (
              <Table 
                dataSource={Item}
                expandedRowRender={this.ExpandedRow}
                columns={columns} 
                pagination={this.state.pagination}
                rowKey={record => record.userID}
                onRow={(record) => {
                  return {     
                    onDoubleClick: () => {
                      this.DoubleClick(record)
                    }
                  }
                }}
              />              
          )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default DonorRegistration;

