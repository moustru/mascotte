import crypto from 'crypto-js';

const config = {
    url: 'https://api.exmo.com/v1/',
    key: 'K-ef7d7fca97e12722d62d43bacdd08e071f57c36e',
    secret: 'S-6b23e151ec9b55dcc97c9b179c1b937eda66fe77',
    date: 0,
    wallet: 10000
}

const init = () => {
    config.date = new Date().getTime();
}

const sign = message => {
    return crypto.HmacSHA512(message, config.secret).toString(crypto.enc.hex);
}

const serialize = obj => {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }

    return str.join("&");
}

export default {
    config,
    init,
    sign,
    serialize
}