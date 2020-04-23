import React from 'react';
import { Card, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import './inventory_menu_card.css';

class InventoryCard extends React.Component {
	render() {
		const { image, link, label, offset, className } = this.props;
		
		return (
			<Col span={4} offset={offset}>
				<Link to={link}>
					<Card className="inventory-item-card">
						<Row>
							<Col span={24}>
								<img src={image} alt="inventory icon" />
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

InventoryCard.propTypes = {
	image: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	offset: PropTypes.number,
	className: PropTypes.string.isRequired
}

InventoryCard.defaultProps = {
	offset: null
}

export default InventoryCard;