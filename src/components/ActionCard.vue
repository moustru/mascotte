<template>
    <div class="main-actions-item">
        <span class="item-type">{{ typeAction }}</span>
        <span class="item-count" :class="{ 'buy': typeAction === 'Buy', 'sell': typeAction === 'Sell' }">{{ item.amount }}</span>
        <span class="item-btc" :class="{ 'buy': typeAction === 'Buy', 'sell': typeAction === 'Sell' }">{{ item.BTC }}</span>
        <span class="item-date">{{ `${dateFormat(item.created)}, ${timeFormat(item.created)}` }}</span>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: [ 'item', 'type' ],
        data() {
            return {
                typeAction: this.type
            }
        },

        methods: {
            dateFormat(val) {
                return moment.unix(val).format('DD.MM.YYYY')
            },

            timeFormat(val) {
                return moment.unix(val).format('H:mm:ss')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .buy {
        color: #d01010;
    }

    .sell {
        color: #66fb6d;
    }
</style>