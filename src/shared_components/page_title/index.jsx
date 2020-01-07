// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Row as AntRow, Typography } from 'antd';

// CONSTANTS
const { Title } = Typography;

function PageTitle({pageTitle, align}) {
	const placement = align === 'left' ? 'start' : 'center'; 

  return (
	  <AntRow type="flex" justify={placement}>
		  <Title level={4}>{pageTitle}</Title>
	  </AntRow>
  );
}

PageTitle.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	align: PropTypes.string
};

PageTitle.defaultProps = {
	align: 'center'
};


export default PageTitle;
  