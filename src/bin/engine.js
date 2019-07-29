import axios from 'axios';
import action from './actions';
import crypto from 'crypto-js';
import env from './../env';

const config = {
    url: 'https://api.exmo.com/v1/',
    key: env.key,
    secret: env.secret,
    date: 0,
    wallet: 10000,
    buy: 0,
    sell: 0,
    bSell: 0,
    bet: 0,
    btc: 0,
    transactions: []
}

const DOMCells = {
    buy: document.querySelector('.main-buy-count'),
    sell: document.querySelector('.main-sell-count'),
    wallet: document.querySelector('.header-wallet-count'),
    bet: document.querySelector('.main-bet-count'),
    btc: document.querySelector('.main-btc-count')
};

// functions for authenticated requests
const init = () => {
    config.date = new Date().getTime();
    action.getCurrencyInfo(DOMCells.buy, DOMCells.sell).then(() => {  
        action.buyBTC() 
    })
}

const sign = message => crypto.HmacSHA512(message, config.secret).toString(crypto.enc.hex);

const serialize = obj => {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }

    return str.join("&");
}

const postData = serialize({})

window.onload = () => {
    init();
    console.log(config)
    setInterval(() => { 
        action.getCurrencyInfo(DOMCells.sell, DOMCells.buy)
        DOMCells.wallet.innerHTML = config.wallet;
        DOMCells.bet.innerHTML = config.bet;
        DOMCells.btc.innerHTML = config.btc;
    }, 1000);
}

export default {
    config,
    sign,
    postData
}