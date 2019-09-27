import axios from 'axios';
import { stringify } from 'qs';

import { urlBackend } from 'config';
import flatten from 'helpers/objectToFormData';

const sendData = res => res.data;

export const  initAPI = store => {
	axios.defaults.baseURL = `${urlBackend}/ajax/`
	axios.defaults.paramsSerializer = params => stringify(params, { encode: false })
	axios.interceptors.response.use(
		response => {
			return response
		},
		error => {
			return Promise.reject(error)
		})
}

export default {
	popular: () => axios.get('popular-hs/').then(sendData),
	suggest: text => axios.get(`search-hs/?q=${text}`).then(sendData),
	search: (id,page) => axios.get(`countries/?hs=${id}&page=${page}`).then(sendData),
};
