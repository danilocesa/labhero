// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Drawer, Button } from 'antd';
import { PrintLogo, IResultsIcon } from 'images';
import Iresults from 'modules/main/iresults';

import './patientname.css';

const ButtonGroup = Button.Group;

class PatientName extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			showIresultInfo: false,
    };
		this.onIresultButtonClick = this.onIresultButtonClick.bind(this);
	}


	// Custom function
	onIresultButtonClick() {
    this.setState({
      showIresultInfo: true,
    });
	}
	
	onCloseIresultsInfoDrawer = () => {
    this.setState({
      showIresultInfo: false,
    });
	}
	

	
  render() {
		const { patientInfo, sampleSpecimenID, specimenStatus  } = this.props;

    return (
	    <Row>
		    <Col span={12}>
			    <div style={{ marginBottom: '30px' }}>
				    <h1 style={{ marginBottom: '0', fontWeight: 'bold', letterSpacing: '1px', fontSize: '20px', textTransform:'uppercase' }}>
              {`${patientInfo.lastName}, ${patientInfo.givenName}`}
				    </h1>
				    <div style={{ color: '#040404', letterSpacing: '1px', fontSize: '13px' }}>
             <span>Sample ID: {sampleSpecimenID}</span>
							<br />
							<span>Current Status: {specimenStatus}</span>
				    </div>
			    </div>
		    </Col>
				<Col span={12}>
			    <div style={{ textAlign: 'right', margin: '25px 0 20px 30px', fontSize: '12px' }}>
						<ButtonGroup>
							<Button onClick={this.onIresultButtonClick} style={{ width: 120 }}>
								<img src={IResultsIcon} className="print-logo" alt="iResults Icon" />
									<span style={{ paddingLeft: '7px' }}>iResults</span>
							</Button>
						</ButtonGroup>
			    </div>
				</Col>
				{
					this.state.showIresultInfo ? 
					(
						<Drawer
							title="Re-run results"
							onClose={this.onCloseIresultsInfoDrawer}
							width="50%"
							visible={this.state.showIresultInfo}
						>
							<Iresults /> 
						</Drawer>
					)
					:
					null
				}
	    </Row>
    );
  }
}

PatientName.propTypes = {
	patientInfo: PropTypes.shape({
		lastName: PropTypes.string,
		givenName: PropTypes.string,
		patientID: PropTypes.string,
	}).isRequired,
	sampleSpecimenID: PropTypes.string.isRequired,
	specimenStatus: PropTypes.string.isRequired,
};

export default PatientName;
