// LIBRARY
import React from 'react';
import { Row as AntRow, Col as AntCol } from 'antd';

// CUSTOM MODULES
import WrappedSearchLabTestForm from './search_form';
import WrapperSearchLabTestResultList from './search_result';

class SearchLabTestResult extends React.Component {
	
	state = {
		labResults: [],
	};

	updateLabResults = (labResults) => {
		this.setState({ labResults });
	}

	render() {
		const { labResults } = this.state;

    return (
	    <AntRow type="flex" align="middle" justify="center">
		    <AntCol xs={24}>
			    <WrappedSearchLabTestForm updateLabResults={this.updateLabResults} />
			    <WrapperSearchLabTestResultList labResults={labResults} />
		    </AntCol>
	    </AntRow>
    );
  }
}

export default SearchLabTestResult;
