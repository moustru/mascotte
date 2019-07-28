import axios from 'axios';
import cfg from './config';
import action from './actions';

axios.interceptors.request.use(settings => {
    settings.baseURL = cfg.config.url;
    settings.headers = {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8index.html",
        "Key": cfg.config.key,
        "Sign": cfg.sign(postData)
    }

    return settings
}, err => {
    return Promise.reject(err)
})

const postData = cfg.serialize({});

const BTCCell = document.querySelector('.main-btc-currency');
const walletCell = document.querySelector('.main-wallet-count');

window.onload = () => {
    cfg.init();
    walletCell.innerHTML = cfg.config.wallet;
    action.getCurrencyInfo(BTCCell);
}