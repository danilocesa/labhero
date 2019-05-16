// LIBRARY
import axios from 'axios';

// CONSTANTS
import { apiURL } from '../shared_components/constant-global';



export default function axiosCall(config) {
	axios.defaults.baseURL = apiURL;

	return axios({
		method: config.method,
		url: config.url,
		data: config.data,
		params: config.params,
		headers: config.headers,
	});
}
