import React, { useState , useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Descriptions, Badge, Statistic, Row, Col, Card, Tabs, Button  } from 'antd';
import  { fetchDashboardItem , fetchPerTabsItem }  from 'services/blood_inventory/blood_inventory';

const { TabPane } = Tabs;

function InventoryDashboard() {
  const history = useHistory();
  const [Pertabs , setPertabs ] = useState([])
  const [key , setKey ] = useState([])
  const [DashboardItem, setDashboardItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const DashboardItemresponse = await fetchDashboardItem();
      setDashboardItem(DashboardItemresponse);
    }
    fetchData();
  },[]) 

  const callback = async (payload) => {
    setKey(payload)
    const PertabsItemresponse = await fetchPerTabsItem(payload);
    const perTabsItem = PertabsItemresponse.map(item => {
      return (item.blood_composition)
    })
    setPertabs(perTabsItem)
  }

  const StatusValue = Pertabs.map(item => {

    const mappedarray = item.map((value ,index ) => {      
      const label = Object.getOwnPropertyNames(value)[0].replace('_',' ').toUpperCase()
      return(
        <Descriptions.Item key={index} label={label}>
          <Row gutter={12}>
            <Col span={12}>
              <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'AVAILABLE', blood_type:key , TabKey : index})}>
                <Statistic
                  title="Available"
                  value={Object.values(value)[0].available === undefined ? 0 : Object.values(value)[0].available}
                  precision={0}
                  prefix={<Badge status="processing" />}
                  />
                </Card>
            </Col>
            <Col span={12}>
              <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'EXPIRED', blood_type:key, TabKey : index +1 })}>
                <Statistic
                  title="Expired"
                  value={Object.values(value)[0].expired === undefined ? 0 : Object.values(value)[0].expired}
                  precision={0}
                  prefix={<Badge status="warning"  />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'DELIVERED', blood_type:key, TabKey : index +2})}>
                <Statistic
                  title="Delivered"
                  value={Object.values(value)[0].delivered === undefined ? 0 : Object.values(value)[0].delivered}
                  precision={0}
                  prefix={<Badge status="warning"  />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'INVALID', blood_type:key })}>
                <Statistic
                  title="Invalid"
                  value={Object.values(value)[0].invalid === undefined ? 0 : Object.values(value)[0].invalid}
                  precision={0}
                  prefix={<Badge status="warning"  />}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'PROCESSED', blood_type:key})}>
                <Statistic
                  title="Processed"
                  value={Object.values(value)[0].procesed === undefined ? 0 : Object.values(value)[0].procesed}
                  precision={0}
                  prefix={<Badge status="warning"  />}
                />
              </Card>
            </Col>
          </Row>
        </Descriptions.Item>
      )
    })
    return(mappedarray)
  })

  const AllBloodTypes = DashboardItem.map(item => {
    return (
      <Descriptions.Item span={2} key={item.blood_type_id} label={item.blood_type}>
        <Row gutter={12}>
          <Col span={12}>
            <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'AVAILABLE', is_nearExpiry:false })}>
              <Statistic
                title="Available"
                value={item.available}
                precision={0}
                prefix={<Badge status="processing" />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'AVAILABLE', is_nearExpiry:true})} >
              <Statistic
                title="Near Expiry"
                value={item.near_expiry	}
                precision={0}
                prefix={<Badge status="warning"  />}
              />
            </Card>
          </Col>
        </Row>
      </Descriptions.Item>
    )
  });

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> All</div>} 
          key="1"
        >
          <Descriptions size="small" bordered>
              {AllBloodTypes}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A+</div>} 
          key="A+"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> A-</div>} 
          key="A-"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B+</div>} 
          key="B+"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> B-</div>} 
          key="B-"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB+</div>} 
          key="AB+"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> AB-</div>} 
          key="AB-"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O+</div>} 
          key="O+"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
        <TabPane 
          tab={<div style={{ width: 50, textAlign: 'center' }}> O-</div>} 
          key="O-"
        >
          <Descriptions size="small" bordered>
            {StatusValue}
          </Descriptions>
        </TabPane>
      </Tabs>
      <div style={{float: 'right'}}>
        <Button 
            className="form-button"
            block
            shape="round"
            type="primary"
            style={{ marginRight: 10, marginTop: 10, width: 100}}
            onClick={() => history.push('/bloodbank/blood_inventory/search', { actionType:'ManualSearch' , blood_product_code:'all'})} 
        >
            Search 
        </Button>
      </div>
    </>
  );
}

export default InventoryDashboard;