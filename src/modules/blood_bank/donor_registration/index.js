import React from 'react';
import { Row} from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import DonorReg from './registration';

class DonorRegistration extends React.Component{

    render(){
        return(
            <div>
                    <PageTitle pageTitle="DONOR'S REGISTRATION" />
                    <Row style={{marginTop: -50}}>
                        <DonorReg />
                    </Row>
            </div>
        );
    }
}

export default DonorRegistration;