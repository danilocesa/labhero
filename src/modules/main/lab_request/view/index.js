import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchPage from './search';
import SummaryPage from './summary';

function ViewRequestPage(){
  return (
    <div>
      <Switch>
        <Route exact path={`/request/view/search`} render={()=> <SearchPage />} />
        <Route exact path={`/request/view/summary`} render={()=> <SummaryPage />} />
      </Switch>
    </div>
  );
}

export default ViewRequestPage;