import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';

import './buttons.css'

class Actions extends React.Component {
      render() {
            return(
                  <div style = {{ textAlign:'right', marginTop: '30px' }} className = "action-container">
                        <Button href = "#" className = "back-button">Back</Button>
                        <Button href = "#" className = "save-button">SAVE</Button>
                  </div>
            );
      }
}

export default Actions;