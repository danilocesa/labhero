import React from 'react';
import { Row, Col, Form, Checkbox } from 'antd';
import { capitalize } from 'utils/helper';
import { initialModules } from './constant';
import './style.css';


function ModuleForm () {

  function renderCheckboxItem(moduleName, type, isDisabled) {
    return (
      <Col>
        <Form.Item name={`${moduleName}-${type}`} valuePropName="checked" className="module-action-cb">
          <Checkbox disabled={isDisabled}>{capitalize(type)}</Checkbox>
        </Form.Item>
      </Col>
    )
  }

  return (
    <div className="user-type-module-form-container">
      {initialModules.map((item, index) => {
        return (
          <div key={item.moduleName} className="module-item">
            <div className="module-title">{item.moduleName}</div>
            <Row gutter={12} justify="space-around">
              {renderCheckboxItem(item.moduleName, 'view', !item.view)}
              {renderCheckboxItem(item.moduleName, 'create', !item.create)}
              {renderCheckboxItem(item.moduleName, 'edit', !item.edit)}
              {renderCheckboxItem(item.moduleName, 'print', !item.print)}
            </Row>
          </div>
        );
      })}
    </div>
  );
};


export default ModuleForm;