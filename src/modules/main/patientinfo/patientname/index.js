// LIBRARY
import React from 'react';
import { Row, Col, Button, Drawer } from 'antd';

// CUSTOM MODULES
import Iresults from '../../iresults';

// IMAGES
import { PrintLogo, IResultsIcon } from '../../../../images';

// CSS
import './patientname.css';

// CONSTANTS
const ButtonGroup = Button.Group;

class Name extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      showIresultInfo: false
    };
    this.onIresultButtonClick = this.onIresultButtonClick.bind(this);
	}

	// React lifestyle

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
    return (
	    <Row>
		    <Col span={12}>
			    <div style={{ marginBottom: '30px' }}>
				    <h1 style={{ marginBottom: '0', fontWeight: 'bold', letterSpacing: '1px', fontSize: '20px', }}>
              DOE, JOHN
				    </h1>
				    <p style={{ color: '#ccc8c8', letterSpacing: '1px', fontSize: '13px' }}>
              Patient ID 00001
				    </p>
			    </div>
		    </Col>
		    <Col span={12}>
			    <div style={{ textAlign: 'right', margin: '25px 0 20px 30px', fontSize: '12px' }}>
				    <Row>
					    <ButtonGroup>
						    <Button onClick={this.onIresultButtonClick}>
							    <img src={IResultsIcon} className="print-logo" alt="iResults Icon" />
							      <span style={{ paddingLeft: '7px' }}>iResults</span>
						    </Button>

						    <Button>
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

export default Name;
