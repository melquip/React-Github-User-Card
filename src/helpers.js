import axios from 'axios';

const env = process.env;
export const axiosAuth = () => {
	return axios.create({
		headers: {
			'Authorization': `token ${env.REACT_APP_TOKEN}`
		},
	});
}
export const persistData = (key, state) => {
	localStorage.setItem(key, JSON.stringify(state))
}
export const getData = (key) => {
	return JSON.parse(localStorage.getItem(key));
}