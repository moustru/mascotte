import axios from 'axios';
import env from './../env';
import { sign, serialize } from './utils';

const postData = serialize({})

axios.interceptors.request.use(settings => {
    settings.baseURL = 'https://api.exmo.com/v1/';
    settings.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8index.html",
        "Key": env.key,
        "Sign": sign(postData)
    }

    return settings
}, err => {
    return Promise.reject(err)
})