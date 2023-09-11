import axios from 'axios';

// Set the base URL for your API
axios.defaults.baseURL = process.env.VUE_APP_APIURL || '';

// Set default headers for GET requests
axios.defaults.headers.get['Content-Type'] = 'application/json; charset=utf-8';

export default axios;
