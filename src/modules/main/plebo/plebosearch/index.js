import React from 'react';
import {
  Form, Input, Button, Row, Col
} from 'antd';
import { withRouter } from 'react-router-dom';

const formItemLayout = [
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 }
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 8 }
  },
  {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 6 },
    lg: { span: 5 }
  },
];

class PleboSearch extends React.Component {
  constructor(props) {
    super(props);

    this._onClickClear = this._onClickClear.bind(this);
}


  _onClickClear = (e) => {
    document.getElementById("searchpleboresult").reset();
}

  render() {

    const {getFieldDecorator} = this.props.form;
    return (

      <Form onSubmit={this._onClickSubmit} id="searchpleboresult"> 
        <Row type="flex" align="top" gutter={12}>
          <Col lg={8} md={8} sm={10} xs={24} {...formItemLayout[0]}>
            <Form.Item label="PATIENT ID" className="gutter-box">
              <Input allowClear />
            </Form.Item>
          </Col>
          <Col lg={8} md={8} sm={10} xs={24} {...formItemLayout[1]} style={{ paddingLeft: 15, width: 500}}>
            <Form.Item label="PATIENT NAME" className="gutter-box">
              {getFieldDecorator('PatientName', {
                rules: [
                  { max: 100, message: 'Less than 100 characters only!' },
                  { pattern: '^[a-zA-Z0-9äöüÄÖÜ]*$', message: 'Special character not allowed!' }
                ],
              })(
                <Input id="PatientName" allowClear />
              )}
            </Form.Item>
          </Col>
          <Col {...formItemLayout[2]}>
            <Form.Item style={{ marginTop: 22}}>
              <Row gutter={12}>
                <Col span={12}>
                  <Button block shape="round" onClick={this._onClickClear} style={{ width: 120 }}>
                    CLEAR
                  </Button> 
                </Col>
                <Col span={12}>
                  <Button block shape="round" type="primary" htmlType="submit" style={{ width: 120 }}>
                    SEARCH
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedPleboSearch=Form.create({ name:'searchpleboresult' })(PleboSearch);

export default withRouter(WrappedPleboSearch);