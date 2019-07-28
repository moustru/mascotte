import axios from 'axios';

export default {
    getCurrencyInfo: cell => {
        axios.get('ticker').then(res => {
            console.log(res.data.BTC_RUB)
            cell.innerHTML = res.data.BTC_RUB.sell_price;
        })
    }
}