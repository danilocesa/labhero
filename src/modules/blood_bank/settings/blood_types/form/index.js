import { Form,Input,Button } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

const { TextArea } = Input;

export default class BloodTypesForm extends Component {
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
        <Form layout="vertical">
          <Form.Item
            label="BLOOD TYPES"
            name="BT"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input onChange={this.onDisable}/>
          </Form.Item>

          <Form.Item
            label="DESCRIPTION"
            name="DES"
          >
            <TextArea rows={4} onChange={this.onDisable}/>
          </Form.Item>
        </Form>
        <section className="drawerFooter">
          <Button shape="round" style={{ marginRight: 8, width: 120 }} onClick={this.props.onClose}>
            CANCEL
          </Button>
          <Button disabled={disabled} type="primary" shape="round" style={{ margin: 10, width: 120 }} htmlType="submit">
            {buttonNames}
          </Button>
				</section>
      </div>
    )
  }
}

BloodTypesForm.propTypes = {
	buttonNames: PropTypes.string.isRequired,
}

