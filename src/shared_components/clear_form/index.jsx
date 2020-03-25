// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import {  Row as AntRow, Typography, Button } from 'antd';
// CONSTANTS
const { Title } = Typography;
function ClearInput({clearinput, value}) {
	
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
			console.log('Received values of form: ', values);
		  }
		});
	  };
	
	  handleReset = () => {
		this.props.form.resetFields();
	  };
	  const { getFieldDecorator } = this.props.form;
  return (
	  
	<Button >{clearinput}</Button>
  );
}
export default ClearInput;