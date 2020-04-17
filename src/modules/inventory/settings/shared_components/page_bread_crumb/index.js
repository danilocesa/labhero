// LiBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row as AntRow, Typography } from 'antd';

// CONSTANTS
const { Title } = Typography;

function InventoryPageCrumb({pageTitle}) {
  return (
	  <AntRow type="flex" align="middle" justify="start">
		  <Title level={3}>{pageTitle}</Title>
	  </AntRow>
  );
}

InventoryPageCrumb.propTypes = {
	pageTitle: PropTypes.string.isRequired
};


export default InventoryPageCrumb;