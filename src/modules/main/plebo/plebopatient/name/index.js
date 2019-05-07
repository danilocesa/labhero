import React from 'react';

class PatientName extends React.Component {
  render() {
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
          DOE, JOHN
        </h1>
        <p style={{ color: '#ccc8c8', letterSpacing: '1px', fontSize: '13px' }}>
          Patient ID 00001
        </p>
      </div>
    );
  }
}

export default PatientName;
