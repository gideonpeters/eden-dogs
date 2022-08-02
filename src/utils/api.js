import store from '@/store';
import axios from 'axios';

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		store.commit('TOGGLE_SNACKBAR', error);
		return Promise.reject(error);
	}
);

export const http = axios.create({
	baseURL: process.env.VUE_APP_API_BASE,
	headers: {
		'Content-Type': 'application/json',
	},
});
