import axios from 'axios';
import engine from './engine';

axios.interceptors.request.use(settings => {
    settings.baseURL = engine.config.url;
    settings.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8index.html",
        "Key": engine.config.key,
        "Sign": engine.sign(engine.postData)
    }

    return settings
}, err => {
    return Promise.reject(err)
})