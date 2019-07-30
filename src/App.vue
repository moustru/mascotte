<template>
    <div>
        <header class="header">
            <h1 class="header-title">mascotte</h1>
            <div class="header-wallet">
                <div class="header-wallet-img">
                    <img src="img/money.png"/>
                </div>
                <span class="header-wallet-count">{{ cfg.wallet }}</span>
            </div>
        </header>
        <div class="main">
            <div class="main-bet">Ставка: {{ cfg.bet }}</div>
            <div class="main-btc">BTC: {{ cfg.btc }}</div>
            <div class="main-currency">
                <div class="main-buy">Покупка: <span class="main-buy-count">{{ cfg.sell }}</span></div>
                <div class="main-sell">Продажа: <span class="main-sell-count">{{ cfg.buy }}</span></div>
            </div>
            <div class="main-info">
                <div class="main-actions">
                    <h3 class="main-actions-title">Последние операции</h3>
                    <div class="revert">
                        <action-card v-for="(action, i) in transactions" :key="i" :item="action" :type="currentType"/>
                    </div>
                </div>
                <div class="main-transactions">
                    <h3 class="main-transactions-title">Транзакции {{ transactions.length }}</h3>
                    <div>
                        <transactions v-for="(action, i) in transactions" :key="i" :item="action"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import crypto from 'crypto-js';
    import env from './env';
    import { serialize } from './bin/utils';
    import ActionCard from './components/ActionCard.vue';
    import Transactions from './components/Transactions.vue';

    export default {
        data() {
            return {
                cfg: {
                    date: 0,
                    wallet: 10000,
                    buy: 0,
                    sell: 0,
                    bet: 50,
                    btc: 0
                },
                transactions: [],
                currentType: 'Buy'
            }
        },

        components: { ActionCard, Transactions },

        methods: {
            async main() {
                let res = await axios.get('ticker');
                this.cfg.buy = Number(res.data.BTC_RUB.buy_price).toFixed(2);
                this.cfg.sell = Number(res.data.BTC_RUB.sell_price).toFixed(2);

                let purposeForSell = this.transactions.find(x => x.sellPrice <= this.cfg.buy);
                let purposeForBuy = this.transactions.find(x => x.sellPrice <= this.cfg.sell);

                if(purposeForSell && this.transactions.length > 0) this.sellBTC(purposeForSell);
                if(!purposeForBuy && this.transactions.length > 0) this.buyBTC();

                return new Promise(resolve => { resolve() })
            },

            buyBTC(e) {
                if(this.cfg.wallet - this.cfg.bet > 0) {
                    let transaction = {
                        BTC: (this.cfg.bet / this.cfg.sell),
                        amount: Number(this.cfg.bet),
                        sellPrice: this.cfg.sell,
                        created: new Date().getTime() / 1000
                    }
            
                    this.cfg.wallet -= this.cfg.bet;
                    this.transactions.push(transaction);
                    this.cfg.btc = this.transactions.map(x => x.BTC).reduce((a, b) => a + b);
                    this.currentType = 'Buy'
                } else {
                    e.preventDefault();
                }
            },

            sellBTC(transaction) {
                let amount = transaction.BTC * engine.config.buy;

                this.cfg.wallet += amount;
                this.cfg.btc -= transaction.BTC;
                this.currentType = 'Sell';
                this.transactions.splice(transaction, 1);

                if(this.transactions.length == 0) this.buyBTC();
            }
        },

        mounted() {
            this.cfg.date = new Date().getTime();
            this.main().then(() => {  
                this.buyBTC();
            })

            setInterval(this.main, 1000);
        }
    }
</script>

<style lang="scss" scoped>
@import './scss/config.scss';

.revert {
    @include Flex(flex-start, flex-start, column-reverse);
}
</style>