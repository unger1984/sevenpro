import axios from 'axios';
import { stringify } from 'qs';

import { urlBackend } from 'config';
import flatten from 'helpers/objectToFormData';

const sendData = res => res.data;

export const  initAPI = store => {
	axios.defaults.baseURL = `${urlBackend}/api`
	axios.defaults.paramsSerializer = params => stringify(params, { encode: false })


	axios.interceptors.response.use(
		response => {
			return response
		},
		error => {
			// Do something with response error
			if (!error.response) {
				alert('Ошибка! Обратитесь к администратору')
				console.log('err', error);
			}
			store.dispatch(resetLoading());
			return Promise.reject(error)
		})
}

export default {

};
