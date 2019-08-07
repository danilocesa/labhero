// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Row as AntRow, Typography } from 'antd';

// CONSTANTS
const { Title } = Typography;

function PageTitle({pageTitle}) {
  return (
	  <AntRow type="flex" align="middle" justify="center">
		  <Title level={4}>{pageTitle}</Title>
	  </AntRow>
  );
}

PageTitle.propTypes = {
	pageTitle: PropTypes.string.isRequired
};


export default PageTitle;
  