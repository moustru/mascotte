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
            <div class="main-stats">
                <span class="main-stats-count">Минимальный курс транзакций: {{ minPrice }}</span>
                <span class="main-stats-count">Максимальный курс транзакций: {{ maxPrice }}</span>
            </div>
            <div class="main-info">
                <div class="main-actions">
                    <h3 class="main-actions-title">Последние операции</h3>
                    <div class="revert">
                        <action-card v-for="(action, i) in history" :key="i" :item="action" :type="cfg.currentType"/>
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
    import ActionCard from './components/ActionCard.vue';
    import Transactions from './components/Transactions.vue';

    export default {
        data() {
            return {
                cfg: {},
                order: {},
                history: [],
                transactions: []
            }
        },

        components: { ActionCard, Transactions },
        computed: {
            minPrice() {
                let array = this.transactions.map(x => x.sellPrice);
                if(this.allow) return Math.min.apply(null, array);
            },

            maxPrice() {
                let array = this.transactions.map(x => x.sellPrice);
                if(this.allow) return Math.max.apply(null, array);
            }
        },

        methods: {
            info() {
                axios.get('/info').then(res => {
                    this.cfg = res.data.cfg;
                    this.order = res.data.order;
                    this.history = res.data.history;
                    this.transactions = res.data.transactions;
                    this.allow = true;
                })


            },
        },

        mounted() {
            this.info();
            setInterval(this.info, 2000);
        }
    }
</script>

<style lang="scss" scoped>
@import './scss/config.scss';

.revert {
    @include Flex(flex-start, flex-start, column-reverse);
}
</style>