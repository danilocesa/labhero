import axios from 'axios';

export default async function login(username, password) {
	let data = null;
	
	try{
		const body = { username, password };
		const response = await axios({
			method: 'POST',
			url: 'lab/LogIn',
			data: body,
			headers: { 
				'content-type': 'application/json',
				'authorization': `Bearer ${process.env.LAB_API_SECREY_KEY}`
			}
		});

		data = response;
	}
	catch(e) {
		// Message.error();
	}

	return data;
}