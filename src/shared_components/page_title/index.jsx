// LIBRARY
import React from "react";
import PropTypes from 'prop-types';
import { Row, Col, Typography } from 'antd';

// CONSTANTS
const { Title } = Typography;

function PageTitle({pageTitle, align}) {
  return (
	  <Row justify="center">
		  <Col>
				<Title level={4}>{pageTitle}</Title>
			</Col>
	  </Row>
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
  