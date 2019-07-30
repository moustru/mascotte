import crypto from 'crypto-js';
import env from './../env';

export const sign = message => crypto.HmacSHA512(message, env.secret).toString(crypto.enc.hex);

export const serialize = obj => {
    var str = [];
    for(var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }

    return str.join("&");
}