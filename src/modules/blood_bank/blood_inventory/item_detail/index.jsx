import React, { useState, useEffect, useRef } from 'react';
import { Form, Switch, Input, Button, Row, Col, Select } from 'antd';
import { getInventoryById } from 'services/blood_bank/blood_inventory';
import { fetchBloodStorage } from 'services/blood_bank/blood_storage';
import moment from 'moment';
import { FIELD_RULES } from './constant';

const { TextArea } = Input;

function InventoryDetail({ inventoryId = 1 }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [storage, setStorage] = useState([]);
  const [isActive, setIsActive] = useState(true);

  function onSubmit() {}

  useEffect(() => {
    async function getData() {
      const form = formRef.current;

      setLoading(true);
      const [bloogStorage, inventory] = await Promise.all([
        fetchBloodStorage(), 
        getInventoryById(inventoryId)
      ]);
      setLoading(false);

      setStorage(bloogStorage);

      if(form)
        form.setFieldsValue({
          ...inventory,
          date_expiry: moment(inventory.expiration_date).format('MM/DD/YYYY HH:mm:ss'),
        });
    }

    getData();

    console.log('use effect has run');
  }, [inventoryId]);



  return (
    <Row>
      <Form 
        layout="vertical"
        ref={formRef}
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="blood_type_name"
              label="BLOOD TYPE"
              className="no-padding"
              rules={FIELD_RULES.bloodType}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="bloog_product_name"
              label="BLOOD PRODUCT"
              className="no-padding"
            >
              <Input disabled={!isActive} />
            </Form.Item>
            <Form.Item
              name="blood_bag"
              label="BAG ID"
              className="no-padding"
              rules={FIELD_RULES.bagID}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="date_extracted"
              label="EXTRACTED DATE"
              className="no-padding"
              rules={FIELD_RULES.extracted_date}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="is_active"
              label=" "
              className="no-padding"
              style={{ textAlign: 'center' }}
            >
              <Switch 
                checkedChildren="ACTIVE" 
                unCheckedChildren="INACTIVE"
                checked={isActive}
                onChange={checked => setIsActive(checked)}
              />
            </Form.Item>
            <Form.Item
              name="status"
              label="STATUS"
              className="no-padding"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="blood_storage_id"
              label="STORAGE"
              className="no-padding"
              rules={FIELD_RULES.storage}
            >
              <Select disabled={!isActive}>
                {storage.map(item => (
                  <Select.Option 
                    value={item.blood_storage_id} 
                    key={item.blood_storage_id}
                  >
                    {item.storage_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="date_expiry"
              label="EXPIRATION DATE"
              className="no-padding"
              rules={FIELD_RULES.expiry_date}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
    
        <Row>
          <Col span={24}>
            <Form.Item
              name="remarks"
              label="REMARKS"
              className="no-padding"
            >
              <TextArea rows={5} disabled={!isActive} />
            </Form.Item>
          </Col>
        </Row>
        <section className="drawerFooter">
          <div>
            <Button
              shape="round"
              style={{ marginRight: 10, width: 120 }}
              onClick={() => {}}
            >
              CANCEL
            </Button>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              loading={loading}
              style={{ margin: 10, width: 120 }}
            >
              UPDATE
            </Button>
          </div>
        </section>
      </Form>
    </Row>
  );
}

export default InventoryDetail;