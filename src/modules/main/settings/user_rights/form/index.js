/* eslint-disable react/prop-types */
// LIBRARY
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Form, Button } from 'antd';
import { RegexInput } from 'shared_components/pattern_input';
import { FIELD_RULES } from './constants';


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