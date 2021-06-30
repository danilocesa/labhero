import React, { useState, useEffect, useRef,  } from 'react';
import moment from 'moment';
import { Form, Switch, Input, Button, Row, Col, Select, message } from 'antd';
import { getInventoryById, updateInventory } from 'services/blood_inventory/blood_inventory';
import { fetchBloodStorage } from 'services/blood_bank/blood_storage';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';
import { FIELD_RULES } from './constant';


const { TextArea } = Input;

function InventoryDetail({ inventoryID, closeDrawer, refreshTableData }) {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [storage, setStorage] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const loggedinUser = JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_DATA));  

  async function onSubmit(values) {
    setLoading(true);
    const result = await updateInventory({
      id: values.blood_bag,
      blood_storage: values.storage_id,
      remarks: values.remarks,
      is_active: isActive,
      last_updated_by: loggedinUser.userID
    });
    setLoading(true);
    

    if(result) {
      message.success('Inventory detail succesfully updated');
      refreshTableData();
      closeDrawer();
    }
  }

  useEffect(() => {
    async function getData() {
      const bloogStorage = await fetchBloodStorage(); 
      setStorage(bloogStorage);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      const form = formRef.current;
      
      const inventory = await getInventoryById(inventoryID.blood_inventory_id);

      if(form)
        form.setFieldsValue({
          ...inventory,
          date_expiry: moment(inventory.expiration_date).format('MM/DD/YYYY HH:mm:ss'),
        });
    }

    if(inventoryID)
      getData();

    console.log('use effect has run');
  }, [inventoryID]);
  

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
              name="blood_product"
              label="BLOOD PRODUCT"
              className="no-padding"
              rules={FIELD_RULES.bloodProduct}
            >
              <Input disabled />
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
              valuePropName="checked"
            >
              <Switch 
                checkedChildren="ACTIVE" 
                unCheckedChildren="INACTIVE"
                onChange={checked => setIsActive(checked)}
              />
            </Form.Item>
            <Form.Item
              name="status_name"
              label="STATUS"
              className="no-padding"
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="storage_id"
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
              onClick={closeDrawer}
            >
              CANCEL
            </Button>
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              // loading={loading} 
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