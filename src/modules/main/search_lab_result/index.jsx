// LIBRARY
import React from 'react';
import { Row as AntRow, Col as AntCol } from 'antd';

// CUSTOM MODULES
import WrappedSearchLabTestForm from './search_form';
import WrapperSearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
	
	render() {
    return (
	    <AntRow type="flex" align="middle" justify="center">
		    <AntCol xs={24}>
			    <WrappedSearchLabTestForm />
			    <WrapperSearchLabTestResultList />
		    </AntCol>
	    </AntRow>
    );
  }
}

export default SearchLabTestResult;
