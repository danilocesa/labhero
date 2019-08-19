// LIBRARY
import React from 'react';
import { 
    Input as AntInput, 
    Form as AntForm, 
    Button as AntButton,
    Switch as AntSwitch,
    List as AntList,
    Checkbox as AntCheckbox
} from 'antd';
import PropTypes from 'prop-types';

// CSS
import './panel_form.css';

// CONSTANTS
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];
  
class PanelForm extends React.Component {
    selectedExamRequest = (e) => {
        console.log(e.target.checked);
    }

    render() {
        return(
            <div className="panel-form"> 
                <AntForm>
                    <AntForm.Item label="PANEL ID">
                        <AntInput value={this.props.panelInfo.code} />
                    </AntForm.Item>
                    <AntForm.Item label="PANEL EXAM">
                        <AntInput value={this.props.panelInfo.panel_name} />
                    </AntForm.Item>
                    <AntForm.Item label="STATUS">
                        <AntSwitch checkedChildren="Enable" unCheckedChildren="Disable" defaultChecked />
                    </AntForm.Item>
                    <AntForm.Item label="EXAM REQUESTS">
                        <AntList 
                            size="small" 
                            bordered 
                            dataSource={data} 
                            renderItem={
                                item => <AntList.Item> <AntCheckbox onChange={this.selectedExamRequest}>{item}</AntCheckbox></AntList.Item>} 
                        />
                    </AntForm.Item> 
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
                        <AntButton style={{ marginRight: 8 }}>
                            Cancel
                        </AntButton>
                        <AntButton type="primary">
                            {this.props.drawerButton}
                        </AntButton>
                    </div>
                </AntForm>
            </div>
        );
    }
}

PanelForm.propTypes = {
    panelInfo: PropTypes.object.isRequired,
    drawerButton: PropTypes.bool.isRequired
}

export default PanelForm;