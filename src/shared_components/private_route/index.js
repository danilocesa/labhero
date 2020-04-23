import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import auth from 'services/login/auth';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, ...rest }) {
  return (
		<Switch>
			<Route
				{...rest}
				render={
					props =>
						auth.isAuthenticated 
						? (<Component {...props} />) 
						// eslint-disable-next-line react/prop-types
						: (<Redirect to={{pathname: "/login", state: { from: props.location }}} />)
				}
			/>
		</Switch>
  );
}

export default PrivateRoute;