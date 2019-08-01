import axios from 'axios';

axios.interceptors.request.use(settings => {
    settings.baseURL = 'http://127.0.0.1:8002';
    settings.headers.Accept = 'application/json'

    return settings
}, err => {
    return Promise.reject(err)
})