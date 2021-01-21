import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// ANT DESIGN
import { Row, Col, Button, Form, Typography,Table,Drawer } from 'antd';
//SHARED COMPONENTS
import TablePager from 'shared_components/table_pager';
import PageTitle from 'shared_components/page_title';
import { RegexInput } from 'shared_components/pattern_input';

//DETAIL
import Detail from '../detail';


const { Text } = Typography;
const columns = [
  {
    title: 'REQUEST ID',
    dataIndex: 'request_id',
  },
  {
    title: 'LAST NAME',
    dataIndex: 'last_name',
  },
  {
    title: 'FIRST NAME',
    dataIndex: 'first_name',
  },
  {
    title: 'MIDDLE NAME',
    dataIndex: 'middle_name',
  },
  {
    title: 'DATE REQUESTED',
    dataIndex: 'date_requested',
  },
  {
    title: 'DATE NEEDED',
    dataIndex: 'date_needed',
  }
]

const dataSource = [
  {
		request_id: '1',
		last_name: 'John',
		first_name: 'Kennedy',
		middle_name:'F',
		date_requested:'1999-09-09',
		date_needed:'1999-09-09'
	},
	{
		request_id: '2',
		last_name: 'Kennedy',
		first_name: 'John',
		middle_name:'F',
		date_requested:'1999-09-09',
		date_needed:'1999-09-09'
	},
];


class BloodRequestSearch extends React.Component{
  constructor(props) {
		super(props);
		this.state = {
		}
	}

  displayDrawerUpdate = (record) => {
		this.setState({
			visible: true,
			drawerTitle: "REQUEST INFORMATION"
		});
  }

  onClose = () => {
		this.setState({
			visible: false,
		});
	};
  
  render(){
    const { visible,drawerTitle } = this.state;
    
    return(
        <div>
          <PageTitle pageTitle="BLOOD REQUEST"  />
          <Form 
            className="search-patient-form" 
            layout="vertical"
            style={{marginTop :100}}
          >
            <Row justify="center">
            {/* Search Input */}
              <Col>
                <Row>
                  <Col>
                  {/* ID */}
                  <Form.Item label="REQUEST ID" name="request_id" style={{marginLeft:30}}>
                      <RegexInput 
                          style={{width:200}}
                          regex={/[A-Za-z0-9, -]/} 
                          maxLength={100}
                          placeholder="Request ID"
                      />
                  </Form.Item>
                </Col>
                <Text strong style={{marginTop:20, marginLeft:10}}>OR</Text>
                <Col>
                  {/* NAME */}
                  <Form.Item label="NAME" name="name" style={{marginLeft:10}}>
                      <RegexInput 
                          style={{width:350}}
                          regex={/[A-Za-z0-9, -]/} 
                          maxLength={100}
                          placeholder="Lastname, Firstname"
                      />
                  </Form.Item>
                  </Col>
                </Row>
              </Col>
              {/* Buttons */}
              <Col style={{marginTop:18}}> 
                <Form.Item shouldUpdate> 
                  {({ getFieldsValue }) => {
                  const { donor_id, patientName } = getFieldsValue();
                  const disabled = !(donor_id || (patientName && patientName.length > 0));
                    return (
                      <Row>
                        <Button 
                          className="form-button"
                          shape="round" 
                          style={{ width: 120, marginLeft:10 }}
                        >
                          CLEAR
                        </Button>
                        <Button 
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
                    )
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        <Row style={{marginTop:-80}}>
          <Col span={12} style={{  marginTop:100 }}>
            <div className="table-title">
              <div>
                <Text strong>SEARCH RESULTS</Text>
              </div>
              <div className="left">
                <Text>Showing 0 items out of results 0 </Text>
              </div>
            </div>
          </Col>
          <Col span={12} style={{ textAlign: "right", marginTop:140 }}>
            <TablePager handleChange={this.handleChangeSize} />
          </Col>
        </Row>
        <DndProvider backend={HTML5Backend}>
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            onRow={(record) => {
              return {     
                onDoubleClick: () => {
                  this.displayDrawerUpdate(record);
                }
              }
            }}
          />	
            <Drawer
              title={drawerTitle}
              width="30%"
              visible={visible}
              onClose={this.onClose}
              destroyOnClose
            >
              <Detail onClose={this.onClose} />
            </Drawer>
        </DndProvider>
      </div>
    );
  }
}

export default BloodRequestSearch;