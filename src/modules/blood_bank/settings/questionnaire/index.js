// LiBRARY
import React from 'react';
import PageTitle from 'shared_components/page_title'
import Questiontable from './table'


class Questionnaire extends React.Component {


  render() {
    return ( 
			<div>
        <PageTitle pageTitle="QUESTINNAIRE" />
        <Questiontable />
			</div>
    );
  }
}

export default Questionnaire;