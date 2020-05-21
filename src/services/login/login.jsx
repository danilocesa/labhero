import axios from 'axios';

export default async function login(username, password) {
	let data = null;
	
	try{
		const response = await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_LAB_API}lab/LogIn`,
			data: { username, password },
			headers: { 
				'content-type': 'application/json',
				'authorization': `Bearer ${process.env.REACT_APP_LAB_API_SECREY_KEY}`
			}
		});

		data = response;
	}
	catch(error) {
		throw error;
		// Message.error();
	}

	return data;
}