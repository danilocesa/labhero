// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Button as AntButton } from 'antd';

// CONSTANTS

class ClearFormFields extends React.Component {
  constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		
	}
	
	handleClick() {
		this.props.form.resetFields();
    // console.log(this.props);
  }

	render() {
		return <>
			<AntButton
				shape="round" 
				style={{ marginRight: 10, width: 120 }}  
				onClick={this.handleClick}
			>
				CLEAR
			</AntButton>
		</>;
  }
}

ClearFormFields.propTypes = {
	form: PropTypes.object
}

export default ClearFormFields;