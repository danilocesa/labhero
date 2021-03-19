/* eslint-disable react/prop-types */
// LIBRARY
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Drawer, Form, Button, Checkbox, Collapse } from 'antd';
import { RegexInput } from 'shared_components/pattern_input';
import { CaretRightOutlined } from '@ant-design/icons';
import { FIELD_RULES } from './constants';

import './index.css';

const { Panel } = Collapse;

const modules = [
  {
    label: 'DASHBOARD',
    name: 'dashboard',
    view: true,
    create: false,
    edit: false,
    print: false,
  },
  {
    label: 'REQUEST',
    name: 'request',
    view: true,
    create: true,
    edit: true,
    print: true,
  },
  {
    label: 'PLHEBO',
    name: 'plhebo',
    view: true,
    create: false,
    edit: false,
    print: true,
  },
  {
    label: 'RESULT',
    name: 'result',
    view: true,
    create: true,
    edit: true,
    print: true,
  },
  {
    label: 'PATIENT DEMOGRAPHICS',
    name: 'demographics',
    view: true,
    create: false,
    edit: true,
    print: false,
  },
  {
    label: 'SETTINGS',
    name: 'settings',
    view: true,
    create: true,
    edit: true,
    print: true,
  },
];

function ModuleForm () {
  return (
    <Collapse 
      bordered={false}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      
      className="site-collapse-custom-collapse"
    >
      {
        modules.map((item, index) => (
          <Panel header={item.label} showArrow={false} key={index}>
            <div>
              <Row gutter={12}>
                <Col span={6}>
                  <Form.Item className="module-action-cb">
                    <Checkbox disabled={!item.view}>View</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item className="module-action-cb">
                    <Checkbox disabled={!item.create}>Create</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item className="module-action-cb">
                    <Checkbox disabled={!item.edit}>Edit</Checkbox>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item className="module-action-cb">
                    <Checkbox disabled={!item.print}>Print</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Panel>
        ))
      }
    </Collapse>
  );
};


function AddForm({ onClose, visible, type }) {
  const [isLoading, setIsLoading] = useState(false);


	function onSubmit() {
	
	}

  return (
    <Drawer
      title="ADD USER TYPE"
      width="30%"
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
    >
      <Form 
        onFinish={onSubmit}
        layout="vertical"
      >
        <section>
          <Form.Item 
            name="userType"
            label="USER TYPE"
            rules={FIELD_RULES.userType}
          >
            <RegexInput 
              regex={/[A-Za-z0-9 -]/} 
              maxLength={200} 
            />
          </Form.Item>  
          <Form.Item 
            name="description"
            label="DESCRIPTION"
            rules={FIELD_RULES.description}
          >
            <RegexInput 
              regex={/[A-Za-z0-9 -]/} 
              maxLength={200} 
            />
          </Form.Item>  
          <ModuleForm />
        </section>
        <section className="drawerFooter">
          <div>
            <Button 
              shape="round" 
              style={{ margin: 10, width: 120 }}
              onClick={onClose}
            >
              CANCEL
            </Button>
            <Button 
              shape="round" 
              type="primary" 
              htmlType="submit"
              loading={isLoading}
              style={{ margin: 10, width: 120 }}
            >
              ADD
            </Button>
          </div>
        </section>
      </Form> 
    </Drawer>
  );
}

AddForm.propTypes = {
  type: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
};


export default AddForm;