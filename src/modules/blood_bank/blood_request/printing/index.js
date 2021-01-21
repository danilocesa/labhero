import React from 'react';
import PageTitle from 'shared_components/page_title'
import { Form,Input,Radio,Row,Col,Typography,Divider, Table   } from 'antd';
const { Title } = Typography;

const dataSource = [
  {
    name: 'Dugo',
    age: 32,
  },
  {
    name: 'John',
    age: 42,
  },
];

const columns = [
  {
    title: 'PRODUCT',
    dataIndex: 'name',
  },
  {
    title: 'QUANTITY',
    dataIndex: 'age',
  }
];

class BloodRequestPrinting extends React.Component{
  render(){
    return(
      <div>
        <PageTitle pageTitle="BLOOD REQUEST FORM"  />
        <Divider orientation="left" style={{color:'black'}}>
         <Title level={3}>PERSONAL INFORMATION</Title>
        </Divider>
        <Form
          layout="horizontal"
        >
          <Row>
            <Col span={6}>
              <Form.Item
                label="First Name"
                name="first_name"
              >
                <Input bordered={false} disabled={true} defaultValue="Harry"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Middle Name"
                name="middle_name"
              >
                <Input bordered={false} disabled={true} defaultValue="Calandingan"/>
               </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Last Name"
                name="last_name"
              >
                <Input bordered={false} disabled={true} defaultValue="Santos"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Suffix"
                name="suffix"
              >
                <Input bordered={false} disabled={true} defaultValue="III"/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                label="Date Of Birth"
                name="date_of_birth"
              >
                <Input bordered={false} disabled={true} defaultValue="1999-09-09"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Age"
                name="age"
              >
                <Input bordered={false} disabled={true} defaultValue="20"/>
               </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Gender"
                name="gender"
              >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="M" disabled>MALE</Radio.Button>
                <Radio.Button value="F" disabled>FEMALE</Radio.Button>
              </Radio.Group>
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Contact Details"
                name="contact_detail"
              >
                <Input bordered={false} disabled={true} defaultValue="09123456789"/>
               </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                label="Blood Group"
                name="blood_group"
              >
                <Input bordered={false} disabled={true} defaultValue="AB+"/>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Province"
                name="province"
              >

               </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="City"
                name="city"
              >
              
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Barangay"
                name="barangay"
              >

               </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                label="Hospital"
                name="hospital"
              >
                <Input bordered={false} disabled={true} defaultValue="AB+"/>
              </Form.Item>
            </Col>
            <Col span={6}>
            <Form.Item
              label="Physician"
              name="physician"
            >
              <Input bordered={false} disabled={true} defaultValue="Dr. Harry Santos"/>
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Date Needed"
                name="date_needed"
              >
            </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Purpose"
                name="purpose"
              >
                
               </Form.Item>
            </Col>
          </Row>
        </Form>
        <Divider orientation="left" style={{color:'black'}}>
         <Title level={3}>PRODUCT REQUEST</Title>
        </Divider>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
        />
      </div>
    );
  }
}

export default BloodRequestPrinting;