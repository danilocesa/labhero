// @ts-nocheck

import React from 'react';
import PropTypes from 'prop-types';
import {  Drawer, Form, Button } from 'antd';
import { RegexInput } from 'shared_components/pattern_input';
import { FIELD_RULES } from './constants';
import ModuleForm from './module_form';
import useFormDrawerHook from './form_drawer_hook';
import './style.css';

function FormDrawer({ onClose, visible, id = null, refreshTableData }) {
  const { onSubmit, formRef } = useFormDrawerHook(id, refreshTableData, onClose);
  const actionType = id ? 'UPDATE' : 'ADD';

  return (
    <Drawer
      title={`${actionType} USER TYPE`}
      width="30%"
      placement="right"
      closable
      onClose={onClose}
      visible={visible}
    >
      <Form 
        className="settings-user-right-drawer-form"
        onFinish={onSubmit}
        layout="vertical"
        ref={formRef}
        style={{paddingBottom:40}}
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
            name="typeDescription"
            label="DESCRIPTION"
            // rules={FIELD_RULES.description}
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
              loading={false}
              style={{ margin: 10, width: 120 }}
            >
              {actionType}
            </Button>
          </div>
        </section>
      </Form> 
    </Drawer>
  );
}

FormDrawer.propTypes = {
  id: PropTypes.number,
  refreshTableData: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	visible: PropTypes.bool.isRequired,
};


export default FormDrawer;