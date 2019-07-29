import axios from 'axios';
import engine from './engine';

export default {
    async getCurrencyInfo(buy, sell) {
        let res = await axios.get('ticker');
        engine.config.buy = buy.innerHTML = Number(res.data.BTC_RUB.buy_price).toFixed(4);
        engine.config.sell = sell.innerHTML = Number(res.data.BTC_RUB.sell_price).toFixed(4);
        engine.config.buy = Number(engine.config.buy)
        engine.config.sell = Number(engine.config.sell)

        return new Promise(resolve => { resolve() })
    },

    buyBTC() {
        engine.config.bet = (engine.config.wallet - engine.config.wallet * (engine.config.buy / engine.config.sell)).toFixed(4);
        engine.config.btc = engine.config.bet / engine.config.sell;
        engine.config.wallet -= engine.config.bet;
    }
}