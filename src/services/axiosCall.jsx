// LIBRARY
import axios from 'axios';

<<<<<<< HEAD
=======
// CONSTANTS
import { apiURL } from 'shared_components/constant-global';



>>>>>>> c3f05084b33c286391e7218d25895d8d68c3bfef
export default function axiosCall(config) {
	axios.defaults.baseURL = process.env.REACT_APP_LAB_API;

	return axios({
		method: config.method,
		url: config.url,
		data: config.data,
		params: config.params,
		headers: config.headers,
	});
}
