import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import RecipientForm from './registration';


class BloodRequest extends React.Component{
    

    render(){
        return(
            <div>
            <PageTitle pageTitle="BLOOD REQUEST" />
                <Row style={{marginTop: -50}}>
                    <RecipientForm />
                </Row>
            </div>
        );
    }
}

export default BloodRequest;