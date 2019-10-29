import React from 'react';
import { notification } from 'antd';
import IdleTimer from 'react-idle-timer';
import Auth from 'services/auth';


class IdleTimerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.idleTimer = null
  }
 
	onAction = (e) => {
    
  }
 
  onActive = (e) => {
    
  }
 
  onIdle = (e) => {
		if(Auth.isAuthenticated) 
			notification.open({
				key: 'sessionExpiredNotif',
				message: 'Session Expired.',
				description: 'Your session has expired due to inactivity. Please login again.',
				duration: 5,
				onClose: () => { 	Auth.signout() }
			});
	}
	
	render() {
    return (
			<IdleTimer
				ref={ref => { this.idleTimer = ref }}
				element={document}
				onActive={this.onActive}
				onIdle={this.onIdle}
				onAction={this.onAction}
				debounce={250}
				timeout={600000} // 600 seconds
			/>
    )
  }
}

export default IdleTimerComponent;