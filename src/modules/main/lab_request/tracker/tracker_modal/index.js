import React from 'react';
// import PropTypes from 'prop-types';
import { Modal, Row, Col, Button } from 'antd';

class TrackerModal extends React.Component{

    handleOk = () =>{
        const {onOK, current} = this.props;
        onOK(true, current);
    };

    render(){
        const {visibility, onCancel} = this.props;
        return(
            <div>
                <Modal 
                className="save-modal-container" 
                centered 
                visible={visibility} 
                footer={null}
                >
					<p style={{ textAlign: 'center' }}>
						Are you sure you wish to proceed?
					</p>
                    <Row gutter={[24,16]}>
                        <Col span={12}>
                            <Button type='primary' block onClick={this.handleOk}>OK</Button>                            
                        </Col>
                        <Col span={12}>

                            <Button block onClick={onCancel}>Cancel</Button>
                        </Col>
                    </Row>
                </Modal>
            </div>
        );
    }

}

// TrackerModal.propTypes = {
//     path: PropTypes.string.isRequired,
//     visibility: PropTypes.bool.isRequired,
// };


export default TrackerModal;