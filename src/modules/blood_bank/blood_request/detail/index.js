import React from 'react';
// ANT DESIGN
import { Form, Input, InputNumber , Radio  } from 'antd';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

class BloodRequestDetails extends React.Component{
  render(){
    return(
      <div>
        <Form
          {...layout}
          name="basic"
        >
          <Form.Item
            label="Request ID"
            name="req_id"
          >
            <Input bordered={false} disabled={true} defaultValue="1"/>
          </Form.Item>
          <Form.Item
            label="Date Requested"
            name="date_req"
          >
            <Input bordered={false} disabled={true} defaultValue="1999-09-09"/>
          </Form.Item>
          <Form.Item
            label="Date Needed"
            name="Date_needed"
          >
            <Input bordered={false} disabled={true} defaultValue="1999-09-09"/>
          </Form.Item>
          <Form.Item
            label="Hospital"
            name="hospital"
          >
            <Input bordered={false} disabled={true} defaultValue="Philippine General Hospital"/>
          </Form.Item>
          <Form.Item
            label="Physician"
            name="physician"
          >
            <Input bordered={false} disabled={true} defaultValue="Dr. Harry Santos"/>
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="blood_group"
          >
            <Input bordered={false} disabled={true} defaultValue="AB+"/>
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
          >
            <Input bordered={false} disabled={true} defaultValue="Santos"/>
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
          >
            <Input bordered={false} disabled={true} defaultValue="Harry"/>
          </Form.Item>
          <Form.Item
            label="Middle Name"
            name="middle_name"
          >
            <Input bordered={false} disabled={true} defaultValue="Calandingan"/>
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="M" disabled>MALE</Radio.Button>
              <Radio.Button value="F" disabled>FEMALE</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
          >
            <Input bordered={false} disabled={true} defaultValue="20"/>
          </Form.Item>
          <Form.Item
            label="Contact Details"
            name="contact_detail"
          >
            <Input bordered={false} disabled={true} defaultValue="09123456789"/>
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
          >
            <Input bordered={false} disabled={true} defaultValue="Taguig"/>
          </Form.Item>
          <Form.Item
            label="Purpose"
            name="Purpose"
          >
            <Input bordered={false} disabled={true} defaultValue="Donote"/>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default BloodRequestDetails;