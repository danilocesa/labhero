import React from 'react';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import RecipientList from './recipient_profile';


class BloodRecipient extends React.Component{

    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="BLOOD RECIPIENT" />
                    <Row>
                        <RecipientList />
                    </Row>
                </div>
            </div>
        );
    }
}

export default BloodRecipient;