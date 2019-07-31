import React from 'react';
import { Input, Form, Select, Button } from 'antd';
import PropTypes from 'prop-types';

import './panel_form.css';

const { Option } = Select;

class PanelForm extends React.Component {
    render() {
        return(
            <div className="panel-form">
                
                <Form>
                    <Form.Item label="PANEL ID">
                        <Input value={this.props.panelInfo.code} />
                    </Form.Item>
                    <Form.Item label="PANEL EXAM">
                        <Input value={this.props.panelInfo.panel_name} />
                    </Form.Item>
                    <Form.Item label="TEMPLATE">
                        <Select placeholder="Select a template">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="STATUS">
                        <Input value={this.props.panelInfo.status} />
                    </Form.Item>

                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button type="primary">
                            {this.props.drawerButton}
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

PanelForm.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    drawerButton: PropTypes.bool.isRequired
}

export default PanelForm;