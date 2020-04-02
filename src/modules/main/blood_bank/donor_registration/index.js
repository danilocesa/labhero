import React from 'react';
import { Form, Input, Row, Col, Typography, DatePicker, Radio, Divider, Select } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import DonorReg from './registration';

class DonorRegistration extends React.Component{

    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="DONOR'S REGISTRATION" />
                    <Row>
                        <DonorReg />
                    </Row>
                </div>
            </div>
        );
    }
}

export default DonorRegistration;