/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// LIBRARY
import axios from 'axios';
import login from 'modules/login/api_repo';
// import jwtDecode from 'jwt-decode';
import { LOGGEDIN_USER_DATA } from 'shared_components/constant-global';


export function setupAxiosInterceptors() {
	/** BASE URL */
	// axios.defaults.baseURL = process.env.REACT_APP_LAB_API;
	axios.defaults.baseURL = process.env.REACT_APP_TMP_LAB_API; 

	/** REQUEST INTERCEPTOR */
	axios.interceptors.request.use(config => {
		const sessionData = sessionStorage.getItem(LOGGEDIN_USER_DATA);
		const LoggedinUserData = sessionData ? JSON.parse(sessionData) : null;

    return { ...config, headers: { 
			'content-type': 'application/json',	
			authorization: LoggedinUserData ? `Bearer ${LoggedinUserData.token}` : undefined
		}};
	});
	

	/** RESPONSE INTERCEPTOR */
	axios.interceptors.response.use(undefined, async(err) => {
		const sessionData = sessionStorage.getItem(LOGGEDIN_USER_DATA);
		const LoggedinUserData = sessionData ? JSON.parse(sessionData) : null;

		if((err.response.status === 403 || err.response.status === 401) &&
			 err.response.config && 
			 !err.response.config.__isRetryRequest && 
			 LoggedinUserData
			) {

			const loginResponse = await login(LoggedinUserData.userName, LoggedinUserData.password);
			
			// Login success
			if(loginResponse.status === 200) {
				// @ts-ignore
				const updatedUserData = { ...LoggedinUserData, token: loginResponse.data.token };
				sessionStorage.setItem(LOGGEDIN_USER_DATA, JSON.stringify(updatedUserData));
				
				// @ts-ignore
				err.response.config.headers.Authorization = `Bearer ${updatedUserData.token}`; 
				err.response.config.__isRetryRequest = true;
				
				return axios(err.response.config);
			}
		}

		throw err;
	});
}

export default function axiosCall(axiosConfig) {
	return axios({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}


