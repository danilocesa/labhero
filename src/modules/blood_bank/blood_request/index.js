import React from 'react';
import SearchRequest from "./search";
import PageTitle from 'shared_components/page_title'

class BloodRequest extends React.Component{
    render(){
        return(
            <div>
                <PageTitle pageTitle="DONOR REGISTRATION"  />
                <SearchRequest/>
            </div>
        );
    }
}

export default BloodRequest;