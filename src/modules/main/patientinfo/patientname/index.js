import React from 'react';
import {} from 'antd';

import 'antd/dist/antd.css';


class Name extends React.Component {
      render() {
            return(
                  <div style = {{ marginBottom: '30px' }}>
                        <h1 style = {{ marginBottom: '0', 
                                    fontWeight: 'bold',
                                    letterSpacing: '1px' }}
                        >
                        DOE, JOHN
                        </h1>
                        <p style = {{ color: '#ccc8c8', 
                                    fontWeight: 'bold', 
                                    letterSpacing: '1px',
                                    fontSize: '13px' }}
                        >
                        Patient ID 00001
                        </p>  
                  </div>
            );
      }
}

export default Name;