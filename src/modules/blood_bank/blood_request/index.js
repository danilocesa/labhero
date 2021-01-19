import React from 'react';
import SearchRequest from "./search";
import RecipientForm from './registration';
import PageTitle from 'shared_components/page_title';


class BloodRequest extends React.Component{
    render(){
        return(
            <div>
                <PageTitle pageTitle="BLOOD REQUEST"  />
                <SearchRequest/>
                <RecipientForm />
            </div>
        );
    }
}
export default BloodRequest;