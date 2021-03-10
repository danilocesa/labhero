import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Button, Checkbox } from 'antd';


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
    const {buttonNames} = this.props
    return (
      <div>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
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
            rules={[{ required: true, message: 'Please input your Description!' }]}
          >
             <Input onChange={this.onDisable}/>
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

StorageForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
}
