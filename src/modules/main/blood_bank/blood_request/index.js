import React from 'react';
import { pick } from 'lodash';
import { Row } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import RecipientForm from './registration';


const personalInfoKeys = [
	'lastName',
	'middleName',
	'firstName',
	'suffix',
	'contactNumber',
	'email',
	'address',
	'gender',
	'dateOfBirth',
	'hospital',
    'bloodGroup',
    'bloodBag',
    'requiredDate'
];

class BloodRequest extends React.Component{
    
    handleSubmit = async (fields) => {
		const personalInfo = pick(fields, personalInfoKeys);
		
	}

    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="ADD BLOOD REQUEST" />
                    <Row>
                        <RecipientForm handleSubmit={this.handleSubmit}/>
                    </Row>
                </div>
            </div>
        );
    }
}

export default BloodRequest;