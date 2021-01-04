import React from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';

// CUSTOM MODULES
import PageTitle from 'shared_components/page_title';
import SearchDonorTable from './donor_table';
import HeaderSearchDonor from './header';

// CONSTANTS
const { Option } = Select;

class SearchDonor extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <PageTitle pageTitle="SEARCH DONOR" />
                    <HeaderSearchDonor />
                    <SearchDonorTable />
                </div>
            </div>
        );
    }
}

export default SearchDonor;