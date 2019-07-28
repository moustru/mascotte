import axios from 'axios';

export default {
    getCurrencyInfo: (buy, sell) => {
        axios.get('ticker').then(res => {
            console.log(res.data.BTC_RUB)
            buy.innerHTML = res.data.BTC_RUB.buy_price;
            sell.innerHTML = res.data.BTC_RUB.sell_price;
        })
    }
}