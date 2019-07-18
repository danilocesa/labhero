import React from 'react';
import { Card, Row, Col } from 'antd';

import { Link } from 'react-router-dom';

import './settings_card.css';

class SettingsCard extends React.Component {
    render() {
        const { image, link, label, col, offset, classMarginBottom } = this.props;
        return (
            <Col span={col} offset={offset}>
                <Link to={link}>
                    <Card className="settings-item-card">
                        <Row>
                            <Col span="24">
                                <img src={image} alt="settings icon" />
                            </Col>
                        </Row>
                        <Row>
                            <Col 
                            span="24" 
                            style={{ 
                                marginTop:'10px', 
                                fontWeight: "bold", 
                                fontSize: '15px'
                            }} 
                            className={classMarginBottom}
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

export default SettingsCard;