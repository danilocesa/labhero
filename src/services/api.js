import axios from 'axios';

export default axios.create({
  // baseURL: 'http://121.58.199.117',
	responseType: 'json',
	// timeout: 1000
});

/* 
	Note! We can also setup interceptor here to redirect 
	user to login if he/she hasnt authorized

	Interceptors is like a middleware - onAfter / onBefore request
*/