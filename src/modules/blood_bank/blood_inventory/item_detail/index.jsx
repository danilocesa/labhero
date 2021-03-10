import React, { useState, useEffect } from 'react';
import { Form, Switch, Input, Button } from 'antd';
import { getInventoryById } from 'services/blood_bank/blood_inventory';

function InventoryDetail({ invDetail  }) {
  const [loading, setLoading] = useState(false);

  function onSubmit() {}

  useEffect(() => {
    // async function getData() {
    //   const inventory = await getInventoryById(inventoryId);

    //   setInvDetail(inventory);
    // }

    // console.log('get inventory detail consumed');
    // getData();
  })

  return (
    <div className="lots-per-inventory-form">
      <Form 
        labelCol={{ span: 24 }}
        labelAlign="left"
        onFinish={onSubmit}
        initialValues={invDetail}
      >
        <section style={{ marginBottom: 50 }}>
          <Form.Item
            name="blood_bag"
            label="BAG ID"
            className="no-padding"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="blood_type_name"
            label="BLOOD TYPE"
            className="no-padding"
          >
            <Input  />
          </Form.Item>

          <Form.Item
            name="storage_name"
            label="STORAGE"
            className="no-padding"
          >
            <Input  />
          </Form.Item>

          <Form.Item
            name="date_extracted"
            label="DATE EXTRACTED"
            className="no-padding"
          >
            <Input  />
          </Form.Item>

          <Form.Item
            name="expiry_date"
            label="EXPIRATION DATE"
            className="no-padding"
          >
            <Input  />
          </Form.Item>
          <Form.Item
            name="donor_id"
            label="DONOR ID"
            className="no-padding"
          >
            <Input disabled />
          </Form.Item>

        </section>
        {/* <section className="drawerFooter">
          <div>
            <Button
              shape="round"
              style={{ marginRight: 10, width: 120 }}
              onClick={onCancel}
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
              {actionType === "update" ? 'UPDATE' : 'ADD'}
            </Button>
          </div>
        </section> */}
      </Form>
    </div>
  );
}

export default InventoryDetail;