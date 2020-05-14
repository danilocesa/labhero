import React from 'react';
import { Card  } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './settings_card.css';

class SettingsCard extends React.Component {
	render() {
		const { image, link, label } = this.props;
		
		return (
			<Link to={link} style={{ marginTop: 15, display: 'block' }}>
				<Card className="settings-item-card">
					<div>
							<img src={image} alt="settings icon" />
					</div>
					<div>
						<span>{label}</span>
					</div>
				</Card>
			</Link>
		)
	}
}

SettingsCard.propTypes = {
	image: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
}


export default SettingsCard;