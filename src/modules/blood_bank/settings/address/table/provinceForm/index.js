import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;
export default class ProvinceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { disabled: true };
	} 

  onDisable = () => {
    this.setState({ disabled:false })
  }

  render() {
    const { disabled } = this.state
    const { buttonNames } = this.props

    return (
      <div>
        <Form layout="vertical">
          <Form.Item
            label="Province"
            name="Province"
            rules={[{ required: true, message: 'Please input your Province!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>
          <section className="drawerFooter">
            <Button 
              shape="round" 
              style={{ marginRight: 8, width: 120 }} 
              onClick={this.props.onClose}
            >
              CANCEL
            </Button>
            <Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
              {buttonNames}
            </Button>
				  </section>
        </Form>
      </div>
    )
  }
}

ProvinceForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
}


