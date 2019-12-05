import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Drawer } from 'antd';

import Pager from 'shared_components/search_pager';
import MainTable from './main_table';
import PatientInfo from '../../patientinfo';

import './searchresult.css';

class SearchResults extends React.Component {
  state = {
		pageSize: 10,
		isDisplayPatientInfo: false,
		isLoading: false
	};

  componentDidMount() {
    this.setState({ showLoading: false });
  } 

  onClickTableRow = () => {
    this.setState({ isDisplayPatientInfo: true });
  }

  onClosePatientInfoDrawer = () => {
    this.setState({ isDisplayPatientInfo: false });
	}

	onChangePageSize = (pageSize) => {
		this.setState({ pageSize });
	}

  render() {  
		const { isLoading, pageSize, isDisplayPatientInfo } = this.state;
		const { labResults } = this.props;
   
    return (
	    <div>
				<Row>
					<Col lg={24} xs={24}>
						<Pager 
							handleChangeSize={this.onChangePageSize}
							pageTotal={labResults.length}
							pageSize={pageSize}
						/>
					</Col>
				</Row>
		    <Row>
					<MainTable 
						isLoading={isLoading}
						labResults={labResults}
						pageSize={pageSize}
						onClickTableRow={this.onClickTableRow}
					/>
		    </Row>
				<Drawer
					title="Patient Information"
					onClose={this.onClosePatientInfoDrawer}
					width="80%"
					visible={isDisplayPatientInfo}
				>
					<PatientInfo /> 
				</Drawer>
	    </div>
    );
  }
}
		
SearchResults.propTypes = {
	labResults: PropTypes.array.isRequired
};

export default SearchResults;
