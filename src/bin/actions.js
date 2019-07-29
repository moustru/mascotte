import axios from 'axios';
import engine from './engine';

var profit = 0;

export default {
    async getCurrencyInfo(buy, sell) {
        let res = await axios.get('ticker');
        engine.config.buy = buy.innerHTML = Number(res.data.BTC_RUB.buy_price).toFixed(2);
        engine.config.sell = sell.innerHTML = Number(res.data.BTC_RUB.sell_price).toFixed(2);
        engine.config.buy = Number(engine.config.buy)
        engine.config.sell = Number(engine.config.sell)

        let purposeForSell = engine.config.transactions.find(x => x.sellPrice <= engine.config.buy);
        let purposeForBuy = engine.config.transactions.find(x => x.sellPrice <= engine.config.sell);

        if(purposeForSell && engine.config.transactions.length > 0) this.sellBTC(purposeForSell);
        if(!purposeForBuy) this.buyBTC();
        document.querySelector('.header-wallet-profit').innerHTML = profit;

        return new Promise(resolve => { resolve() })
    },

    buyBTC(e) {
        if(engine.config.wallet > 0) {
            engine.config.bet = 50;
    
            let transaction = {
                BTC: (engine.config.bet / engine.config.sell),
                amount: Number(engine.config.bet),
                sellPrice: engine.config.sell
            }
    
            engine.config.wallet -= engine.config.bet;
            engine.config.transactions.push(transaction);
            engine.config.btc = engine.config.transactions.map(x => x.BTC).reduce((a, b) => a + b);
            console.log(`Куплено ${transaction.BTC} BTC по цене ${transaction.sellPrice}`);
            console.log(engine.config.transactions)
        } else {
            e.preventDefault();
        }
    },

    sellBTC(transaction) {
        let amount = transaction.BTC * engine.config.buy;
        engine.config.wallet += amount;
        engine.config.btc -= transaction.BTC;
        profit = Number(profit);
        profit += amount.toFixed(2);
        console.log(`Продано ${transaction.BTC} BTC на сумму ${amount} по цене ${transaction.sellPrice}`);
        console.log(`Куплено за ${transaction.amount} - продано за ${amount}. Выгода ${amount - transaction.amount}`);
        engine.config.transactions.splice(transaction, 1);
        console.log(engine.config.transactions);

        this.buyBTC();
    },

    addAction() {
        let parent = document.querySelector('.main-actions');
        let div = document.createElement('div');
        div.classList.add('main-actions-item');
        parent.appendChild(div);
    }
}