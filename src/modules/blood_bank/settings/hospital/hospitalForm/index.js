import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;
export default class HospitalForm extends Component {
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
            label="Hospital"
            name="Hospital"
            rules={[{ required: true, message: 'Please input your Hospital!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>
          <Form.Item
            label="Location"
            name="Location"
            rules={[{ required: true, message: 'Please input your Location!' }]}
          >
            <TextArea rows={4} onChange={this.onDisable}/>
          </Form.Item>
          <section className="drawerFooter">
            <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
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

HospitalForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
}

