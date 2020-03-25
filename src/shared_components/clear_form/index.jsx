// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import {  Row as AntRow, Typography, Button } from 'antd';
// CONSTANTS
const { Title } = Typography;
function ClearInput({clearinput, value}) {
	const placement = value === "" ? "" : ''; 
  return (
	<Button >{clearinput}</Button>
  );
}
ClearInput.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	align: PropTypes.string
};
ClearInput.defaultProps = {
	align: 'center'
};
export default ClearInput;