import React from 'react';
import { Input, Form, Select, Button } from 'antd';

import './panel_form.css';

const { Option } = Select;

class PanelForm extends React.Component {
    render() {
        return(
            <div className="panel-form">
                
                <Form>
                    <Form.Item label="PANEL ID">
                        <Input />
                    </Form.Item>
                    <Form.Item label="PANEL EXAM">
                        <Input />
                    </Form.Item>
                    <Form.Item label="TEMPLATE">
                        <Select placeholder="Select a template">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="STATUS">
                        <Input />
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
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button onClick={this.onClose} type="primary">
                            {this.props.drawerButton}
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default PanelForm;