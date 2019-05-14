// LIBRARY
import React from "react";
import { Row, Typography } from 'antd';

// CONSTANTS
const { Title } = Typography;

function PageTitle({pageTitle}) {
  return (
	  <Row type="flex" align="middle" justify="center">
		  <Title level={4}>{pageTitle}</Title>
	  </Row>
  );
}

export default PageTitle;
  