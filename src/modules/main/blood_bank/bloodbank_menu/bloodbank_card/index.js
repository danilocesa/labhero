import React from 'react';
import { Card, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import './bloodbank_card.css';

class BloodBankCard extends React.Component {
	render() {
		const { image, link, label, offset, className } = this.props;
		
		return (
			<Col span={4} offset={offset}>
				<Link to={link}>
					<Card className="bloodbank-item-card">
						<Row>
							<Col span={24}>
								<img src={image} alt="bloodbank icon" />
							</Col>
						</Row>
						<Row>
							<Col 
								span={24} 
								style={{ 
										marginTop:'10px', 
										fontWeight: "bold", 
										fontSize: '15px'
								}} 
								className={className}
							>
								<span>{label}</span>
							</Col>
						</Row>
					</Card>
				</Link>
			</Col>
		)
	}
}

BloodBankCard.propTypes = {
	image: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	offset: PropTypes.number,
	className: PropTypes.string.isRequired
}

BloodBankCard.defaultProps = {
	offset: null
}

export default BloodBankCard;