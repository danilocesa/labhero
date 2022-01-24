import { useHistory } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import  { fetchDashboardItem , fetchPerTabsItem }  from 'services/blood_inventory/blood_inventory';
import { 
  Row, 
  Col, 
  Card, 
  Tabs, 
  Badge, 
  Button,
  Statistic, 
  Descriptions  } from 'antd';

const { TabPane } = Tabs;

function InventoryDashboard() {
  const history = useHistory();
  const [ key , setKey ] = useState([])
  const [ Pertabs , setPertabs ] = useState([])
  const [ loading, setLoading] = useState(false);
  const [ DashboardItem, setDashboardItem] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const DashboardItemresponse = await fetchDashboardItem();
      setDashboardItem(DashboardItemresponse);
    }
    setLoading(true);
    fetchData();
    setLoading(false);
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
    const mappedarray = item.map(( value , index ) => {      
      const status = value.status
      const array = Object.keys(status)
      return(
        <Descriptions.Item span={2} key={index} label={value.blood_comp_name}>
          <Row gutter={12}>
            <Col span={24}>
              {array.map((i, d) => {
                return( 
                  <Card.Grid 
                    // @ts-ignore
                    onClick={() => history.push('/bloodbank/blood_inventory/search', {
                      ...item, 
                      actionType:i, 
                      blood_type:key, 
                      blood_comp_code:value.blood_comp_code 
                    })}
                  >
                    <Statistic
                      title={i}
                      value={Object.values(status)[d]}
                      precision={0}
                      prefix={ <Badge status="processing" />}
                    />
                  </Card.Grid>
                )
              })}
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
            <Card size="small" onClick={() => history.push('/bloodbank/blood_inventory/search', {...item, actionType:'NEAR_EXPIRY', is_nearExpiry:true})} >
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
          loading={loading} 
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