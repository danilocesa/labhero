// LIBRARY
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Drawer } from 'antd';

// CUSTOM MODULES
import Iresults from 'modules/main/iresults';

// IMAGES
import { PrintLogo, IResultsIcon } from 'images';

// CSS
import './patientname.css';

// CONSTANTS
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
		const { patientInfo } = this.props;

    return (
	    <Row>
		    <Col span={12}>
			    <div style={{ marginBottom: '30px' }}>
				    <h1 style={{ marginBottom: '0', fontWeight: 'bold', letterSpacing: '1px', fontSize: '20px', textTransform:'uppercase' }}>
              {`${patientInfo.lastName}, ${patientInfo.givenName}`}
				    </h1>
				    <p style={{ color: '#ccc8c8', letterSpacing: '1px', fontSize: '13px' }}>
              Patient ID {patientInfo.patientID}
				    </p>
			    </div>
		    </Col>
		    <Col span={12}>
			    <div style={{ textAlign: 'right', margin: '25px 0 20px 30px', fontSize: '12px' }}>
				    <Row>
					    <ButtonGroup>
						    <Button onClick={this.onIresultButtonClick} style={{ width: 120 }}>
							    <img src={IResultsIcon} className="print-logo" alt="iResults Icon" />
							      <span style={{ paddingLeft: '7px' }}>iResults</span>
						    </Button>

						    <Button style={{ width: 120 }}>
							    <img src={PrintLogo} className="print-logo" alt="Print Icon" />
							    <span style={{ paddingLeft: '7px' }}>Print</span>
						    </Button>
					    </ButtonGroup>
				    </Row>
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
	}).isRequired
};

export default PatientName;
