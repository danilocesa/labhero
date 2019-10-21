import React from 'react';
import { Row, Col } from 'antd';
import axiosCall from 'services/axiosCall';

import WrappedSearchLabTestForm from './search_form';
import WrapperSearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
	UNSAFE_componentWillMount() {
		this.testApi()
	}

	testApi = async () =>  {
		const userData = JSON.parse(sessionStorage.getItem('LOGGEDIN_USER_DATA'));
		const response = await axiosCall({
			method: 'GET',
			url: 'Patient/name/test',
			headers: {
				authorization: `Bearer ${userData.token}`
			}
		});

		console.log(response);
		return response;
	}
	
	render() {
    return (
	    <Row type="flex" align="middle" justify="center">
		    <Col xs={24}>
			    <WrappedSearchLabTestForm />
			    <WrapperSearchLabTestResultList />
		    </Col>
	    </Row>
    );
  }
}

export default SearchLabTestResult;
