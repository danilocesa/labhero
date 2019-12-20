import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from 'antd';
import TrackerModalSettings from './settings';

const {labels} = TrackerModalSettings;

class TrackerModal extends React.Component{

    handleOk = () =>{
        const {onOK, current} = this.props;
        onOK(true, current);
    };

    handleCancel =()=>{
        const {onCancel} = this.props;
        onCancel(true);
    };

    render(){
        const {visibility} = this.props;
        const {buttonLabels, prompt} = labels;
        return(
            <div>
                <Modal 
                className="tracker-modal-container" 
                centered 
                visible={visibility} 
                footer={null}
                >
					<p style={{ textAlign: 'center'}}>
						{prompt}
					</p>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Button type='primary' block onClick={this.handleOk}>{buttonLabels.ok}</Button>                            
                        </Col>
                        <Col span={12}>
                            <Button block onClick={this.handleCancel}>{buttonLabels.cancel}</Button>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }

}

TrackerModal.propTypes = {
    onOK: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    visibility: PropTypes.bool.isRequired,
};


export default TrackerModal;