// LIBRARY
import axios from 'axios';

export default function axiosCall(config) {
	axios.defaults.baseURL = process.env.REACT_APP_LAB_API;
	// axios.defaults.baseURL = process.env.REACT_APP_TMP_LAB_API;
	
	return axios({
		method: config.method,
		url: config.url,
		data: config.data,
		params: config.params,
		headers: config.headers,
	});
}
