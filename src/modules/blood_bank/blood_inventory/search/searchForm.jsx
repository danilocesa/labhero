import React, { useState, useRef } from 'react';
import { Row, Col, Form, Select, Button } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';

const { Option } = Select;

function SearchForm() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  

  function handleSubmit(){}

  function handleFocus(){}

  function clearSearch(){}

  return (
    <Form
        className="search-patient-form"
        onFinish={handleSubmit}
        ref={formRef}
        layout="vertical"
        style={{ marginTop: 20 }}
      >
        <Row gutter={12} align="bottom" justify="center">
          <Col>
            <Form.Item
              label="BAG ID"
              name="bagID"
              style={{ marginRight: 10 }}
            >
              <NumberInput
                style={{ width: 100 }}
                maxLength={10}
                onFocus={handleFocus}
                placeholder="BAG ID"
              />
            </Form.Item>
          </Col>  
          <Col>
            <Form.Item
              name="bloodType"
              label="BLOOD TYPE"
              className="no-padding"
            >
              <Select style={{ width: 100, marginRight: 10 }}>
                <Option value="bloodType1">A</Option>
                <Option value="bloodType2">B</Option>
                <Option value="bloodType3">AB</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="storage"
              label="STORAGE"
              className="no-padding"
            >
              <Select style={{ width: 200 }}>
                <Option value="Storage1">Storage 1</Option>
                <Option value="Storage2">Storage 2</Option>
                <Option value="Storage3">Storage 3</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item shouldUpdate>
              {({ getFieldsValue }) => {
                const { bagID, patientName } = getFieldsValue();
                const disabled = !(
                  bagID ||
                  (patientName && patientName.length > 1)
                );
                return (
                  <Row>
                    <Button
                      className="form-button"
                      shape="round"
                      style={{ width: 120, marginLeft: 10 }}
                      onClick={clearSearch}
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
                );
              }}
            </Form.Item>
          </Col>
        </Row>  
      </Form>
  );
}

export default SearchForm;