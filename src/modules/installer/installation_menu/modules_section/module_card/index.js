import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Card } from 'antd';

import './index.css';

class ModuleCard extends React.Component {
  render () {
    const { image, label } = this.props;

    return (
      <Card className="installaion-module-card">
        <div className="checkbox-container">
          <Checkbox />
        </div>
        <div>
          <img src={image} alt="settings icon" /> 
        </div>
        <span>{label}</span>
      </Card>
    );
  }
}

ModuleCard.propTypes = {
  image: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
}


export default ModuleCard;