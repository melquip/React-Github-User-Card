import axios from 'axios';

const env = process.env;
export const axiosAuth = () => {
	return axios.create({
		headers: {
			'Authorization': `token ${env.REACT_APP_TOKEN}`
		},
		//data: `client_id=${env.REACT_APP_CLIENT_ID}&client_secret=${env.REACT_APP_CLIENT_SECRET}`
	});
}
export const persistData = (key, state) => {
	localStorage.setItem(key, JSON.stringify(state))
}
export const getData = (key) => {
	return JSON.parse(localStorage.getItem(key));
}