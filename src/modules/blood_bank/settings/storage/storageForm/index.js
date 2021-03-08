import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

export default class StorageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
			disabled: true,
    };
	} 

  onDisable = () => {
    this.setState({
      disabled:false
    })
  }

  render() {
    const { disabled } = this.state
    const {drawerButton} = this.props
    return (
      <div>
        <Form
          layout="vertical"
          name="basic"
        >
          <Form.Item
            label="Storage"
            name="Storage"
            rules={[{ required: true, message: 'Please input your Storage!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>

          <Form.Item
            label="Description"
            name="Description"
          >
            <TextArea rows={4} onChange={this.onDisable}/>
          </Form.Item>

          <section className="drawerFooter">
            <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
              CANCEL
            </Button>
            <Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
              {drawerButton}
            </Button>
				  </section>
        </Form>
      </div>
    )
  }
}

StorageForm.propTypes = {
	drawerButton: PropTypes.string.isRequired,
}
