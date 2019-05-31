import React from 'react';
import PropTypes from 'prop-types';

class PatientName extends React.Component {
  render() {
     const { patientInfo } = this.props;   
     return (
			<div style={{ marginBottom: '30px' }}>
				<h1
					style={{
						marginBottom: '0',
						fontWeight: 'bold',
						letterSpacing: '1px',
						fontSize: '20px',
					}}
				>
				{patientInfo.lastName} , {patientInfo.givenName} {patientInfo.middleName}
    </h1>
				<p style={{ color: '#ccc8c8', letterSpacing: '1px', fontSize: '13px' }}>
          Patient ID {patientInfo.patientID}
    </p>
			</div>
    );
  }
}

PatientName.propTypes = {
	patientInfo: PropTypes.object
};

PatientName.defaultProps = {
	patientInfo() { return null; }
}

export default PatientName;
