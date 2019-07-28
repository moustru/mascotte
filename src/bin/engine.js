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

const buyCell = document.querySelector('.main-buy-count');
const walletCell = document.querySelector('.header-wallet-count');
const sellCell = document.querySelector('.main-sell-count');

window.onload = () => {
    cfg.init();
    walletCell.innerHTML = cfg.config.wallet;

    //setInterval(() => { action.getCurrencyInfo(buyCell, sellCell)}, 500);
}