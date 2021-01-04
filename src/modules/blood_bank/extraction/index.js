// @ts-nocheck
/* eslint-disable react/prop-types */
// LiBRARY
import React from "react";
import {
  Row ,
  Col ,
  Table,
  Input,
  Button,
  Typography,
  Form
} from "antd";

// CUSTOM MODULES
import { RegexInput } from 'shared_components/pattern_input';
import { fetchPatients } from 'services/blood_bank/extraction'
import PageTitle from 'shared_components/page_title'
import Message from 'shared_components/message'
import TablePager from "shared_components/table_pager"

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
  }
];

const columns2 = [
  {
    title: "CONTACT NUMBER",
    dataIndex: "contact_number",
    key: "contact_number",
    width: 150
  },
  {
    title: "ADDRESS",
    dataIndex: "address",
    key: "address",
    width: 250
  },
];

const expandedRow = row => {
  console.log(row);
  return <Table columns={columns2} pagination={false} />;
};

class Extraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Item: [],
      loading: false,
    };
    this.formRef = React.createRef();
  }
  
  handleSubmit = async () => {  
		const { getFieldsValue } = this.formRef.current;
    const { patientID, patientName } = getFieldsValue()
    let patients = [];
    this.setState({ loading: true });
    patients = await fetchPatients(patientName, patientID);  
    
    this.setState({ 
        loading: false,
        Item: patients  
    });

    if(patients.length <= 0) 
      Message.info('No results found');
  }

  handleChangeSize = (pageSize) => {
		this.setState({pageSize});
	}  

  NextStep = (record) => {
    console.log("Extraction -> NextStep -> record", record)
    record.data = {record}
    this.props.history.push("/bloodbank/extraction/screening/step/1",record);
  }

  render() {
    const { Item,loading,pageSize } = this.state
    const items = Item.length > pageSize ? pageSize : Item.length;
    return (
      <div>
       <PageTitle pageTitle="EXTRACTION/SCREENING"  />
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
                        <Form.Item label="DONOR'S ID" name="patientID" style={{marginLeft:30}}>
                          <RegexInput 
                            style={{width:200}}
                            regex={/[A-Za-z0-9, -]/} 
                            maxLength={100}
                            onFocus={this.handleFocus}
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
                            onFocus={this.handleFocus}
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
                    const { patientID, patientName } = getFieldsValue();
                    const disabled = !(patientID || (patientName && patientName.length > 1));
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
              expandedRowRender={expandedRow}
              style={{ textTransform: "uppercase" }}
              dataSource={Item}
              pagination={{ pageSize }}
              loading={this.state.loading}
              columns={columns}
              rowKey={record => record.userID}
              onRow={(record) => {
                return {     
                  onDoubleClick: () => {
                    this.NextStep(record)
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

export default Extraction;
