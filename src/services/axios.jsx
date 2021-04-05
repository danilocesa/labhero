/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
// LIBRARY
import axios from 'axios';
import login from 'services/login/login';
// import jwtDecode from 'jwt-decode';
import { LOGGEDIN_USER_DATA } from 'global_config/constant-global';

const axiosLabInstance = axios.create();
const axiosPhase2Instance = axios.create();
const axiosReportInstance = axios.create();
const axiosResultReportInstance = axios.create();

export function setupAxiosInterceptors() {
	/** BASE URL */
	// axios.defaults.baseURL = process.env.REACT_APP_LAB_API;
	axiosLabInstance.defaults.baseURL = process.env.REACT_APP_LAB_API; 
	axiosPhase2Instance.defaults.baseURL = process.env.REACT_APP_PHASE2_API; 
	axiosReportInstance.defaults.baseURL = process.env.REACT_APP_REPORT_API; 
	axiosResultReportInstance.defaults.baseURL = process.env.REACT_RESULT_REPORT_API;

	/** REQUEST INTERCEPTOR */
	axiosLabInstance.interceptors.request.use(config => {
		const sessionData = sessionStorage.getItem(LOGGEDIN_USER_DATA);
		const LoggedinUserData = sessionData ? JSON.parse(sessionData) : null;

    return { ...config, headers: { 
			'content-type': 'application/json',	
			authorization: LoggedinUserData ? `Bearer ${LoggedinUserData.token}` : undefined
		}};
	});
	
	axiosPhase2Instance.interceptors.request.use(config => {
    return { ...config, headers: { 
			'content-type': 'application/json',	
		}};
	});

	axiosReportInstance.interceptors.request.use(config => {
    return { ...config, headers: { 
			'content-type': 'application/json',
			'APIKEY': process.env.REACT_APP_REPORT_API_KEY
		}};
	});


	/** RESPONSE INTERCEPTOR */
	axiosLabInstance.interceptors.response.use(undefined, async(err) => {
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

export function axiosLabAPI(axiosConfig) {
	return axiosLabInstance({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}


export function axiosPhase2API(axiosConfig) {
	return axiosPhase2Instance({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}

export function axiosReportAPI(axiosConfig) {
	return axiosReportInstance({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}

export function axiosResultReportAPI(axiosConfig) {
	return axiosResultReportInstance({
		method: axiosConfig.method,
		url: axiosConfig.url,
		data: axiosConfig.data,
		params: axiosConfig.params,
		headers: axiosConfig.headers,
	});
}


