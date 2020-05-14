import React from "react";
import ReactRouterPropTypes from 'react-router-prop-types';
import { Row, Col, Form, Input, Button } from 'antd';
import errorMessage from 'global_config/error_messages';

import './index.css';

class EmailForm extends React.Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    
    const { form, history } = this.props;

    // eslint-disable-next-line react/prop-types
    form.validateFieldsAndScroll(err =>{
      if(!err) {
        history.push('/installer/menu');
      }
    });
  }
  
  render() {
    // eslint-disable-next-line react/prop-types
    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col sm={8} md={8} lg={6}>
          <div className="installation-email-form">
            <Form onSubmit={this.onSubmit}>
              <span className="label-text">Please input email address</span>
              <Form.Item>
                {getFieldDecorator('email', { rules: [{ required: true, message: errorMessage.required }] })(
                  <Input />
                )}
              </Form.Item>
              <Button type="primary" htmlType="submit">SUBMIT</Button>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

EmailForm.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default Form.create()(EmailForm);
