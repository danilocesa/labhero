import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import ErrorPage from 'modules/error_page';
import EmailVerification from './email_verification';
import InstallationMenu from './installation_menu';

class Installer extends React.Component {
  
  render() {
    return (
      <Switch>
        <Route exact path="/installer/verification" component={EmailVerification} />
        <Route exact path="/installer/menu" component={InstallationMenu} />
        <Route component={() => <ErrorPage displayRedirect={false} />} />
      </Switch>
    );
  }
}


export default withRouter(Installer);
