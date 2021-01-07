import React from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import HeaderSearchDonor from './header';


class SearchDonor extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="SEARCH DONOR" />
                    <HeaderSearchDonor />
                </div>
            </div>
        );
    }
}

export default SearchDonor;