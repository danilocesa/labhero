import React, { useState, useRef, useEffect } from 'react';
import { Descriptions, Badge, Statistic, Row, Col, Card, Tabs  } from 'antd';
import { fetchBloodStorage } from 'services/blood_bank/blood_storage';
import { fetchBloodTypes } from 'services/blood_bank/blood_types';

const { TabPane } = Tabs;

function InventoryDashboard() {

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [bloodStorage, setBloodStorage] = useState([]);
  const [bloodTypes, setBloodTypes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const bloodStorage = await fetchBloodStorage();
      const bloodTypes = await fetchBloodTypes();
      let payload = {};
      // setBloodStorage(bloodStorage);
      setBloodTypes(bloodTypes);
      console.log(bloodTypes)

    }

    setLoading(true);
    fetchData();
    setLoading(false);
  }, []) 

  const BloodType = bloodTypes.map(item => {
    return (
      <Descriptions.Item span={2} key={item.blood_type_id} label={item.blood_type}>
        <Row gutter={12}>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Available"
                value={9}
                precision={0}
                prefix={<Badge status="processing" />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small">
              <Statistic
                title="Near Expiry"
                value={15}
                precision={0}
                prefix={<Badge status="warning"  />}
              />
            </Card>
          </Col>
        </Row>
    </Descriptions.Item>
    )
  }  
  );

  return (
      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> All</div>} 
          key="1"
        >
          <Descriptions size="small" bordered>
             {BloodType}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A+</div>} 
          key="2"
        >
          Content of A+
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A-</div>} 
          key="3"
        >
          Content of A-
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B+</div>} 
          key="4"
        >
          Content of B+
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B-</div>} 
          key="5"
        >
          Content of B-
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB+</div>} 
          key="6"
        >
          Content of AB+
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB-</div>} 
          key="7"
        >
          Content of AB-
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O+</div>} 
          key="8"
        >
          Content of O+
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O-</div>} 
          key="9"
        >
          Content of O-
        </TabPane>
      </Tabs>
  );
}

export default InventoryDashboard;