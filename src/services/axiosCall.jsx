// LIBRARY
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import auth from 'services/auth';
import { notification } from 'antd';
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';

const notifConfig = {
	message: 'Session Expired.',
	description: 'Your session has been expired. You will be redirected to login page.',
	duration: 3,
	onClose: () => auth.signout()
};

export default function axiosCall(axiosConfig) {
	axios.defaults.baseURL = process.env.REACT_APP_LAB_API;
	// axios.defaults.baseURL = process.env.REACT_APP_TMP_LAB_API;

	axios.interceptors.request.use(config => {
		const sessionData = sessionStorage.getItem(LOGGEDIN_USER_DATA);
		const LoggedinUserData = sessionData ? JSON.parse(sessionData) : null;
		const urls = ['LogIn']; // Add api path here that you want to blacklist
		const inBackLists = urls.findIndex(url => config.url === url) !== -1;

		if(config.method.toLowerCase() === 'post' && !inBackLists) {
			const token = jwtDecode(LoggedinUserData.token);
			const currentTimestamp = Math.round(new Date().getTime()/1000);
			
			if(token.exp <= currentTimestamp) {
				notification.warning(notifConfig);

				return Promise.reject({ 
					isSessionExpired: true,
					message: 'Your session has expired.'
				});
			}
		}
		
    return { ...config, headers: { 
			'content-type': 'application/json',	
			authorization: LoggedinUserData ? `Bearer ${LoggedinUserData.token}` : undefined
		}};
  });

	return axios({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}


