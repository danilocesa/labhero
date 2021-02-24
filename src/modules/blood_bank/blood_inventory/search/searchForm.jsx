import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Form, Select, Button } from 'antd';
import { NumberInput } from 'shared_components/pattern_input';
import { fetchBloodStorage } from 'services/blood_bank/blood_storage';
import { fetchBloodTypes } from 'services/blood_bank/blood_types';

const { Option } = Select;

function SearchForm({ onSearch }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [bloodStorage, setBloodStorage] = useState([]);
  const [bloodTypes, setBloodTypes] = useState([]);

  const StorageOptions = bloodStorage.map(item => (
    <Option key={item.blood_storage_id} value={item.blood_storage_id}>
      {item.storage_name}
    </Option>
  ));

  const BloodTypeOptions = bloodTypes.map(item => (
    <Option key={item.blood_type_id} value={item.blood_type_id}>
      {item.blood_type}
    </Option>
  ));

  function handleSubmit(formValues){
    const payload = {
      blood_type__blood_type: formValues.bloodType,
      blood_storage__storage_name:formValues.storage,
      blood_bag: formValues.bagID
    };

    onSearch(payload);
  }

  function handleFocus(){}

  function clearSearch(){
    const { setFieldsValue } = formRef.current;

    setFieldsValue({ bagID: null, bloodType: null, storage: null });
  }

  useEffect(() => {
    async function fetchData() {
      const bloodStorage = await fetchBloodStorage();
      const bloodTypes = await fetchBloodTypes();

      setBloodStorage(bloodStorage);
      setBloodTypes(bloodTypes);
    }

    setLoading(true);
    fetchData();
    setLoading(false);
  }, []) 



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
                {BloodTypeOptions}
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
                {StorageOptions}
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