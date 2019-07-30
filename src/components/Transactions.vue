<template>
    <div class="main-transactions-item">
        <span class="item-btc">BTC: {{ item.BTC }}</span>
        <span class="item-price">Курс: {{ item.sellPrice }}</span>
    </div>
</template>

<script>
    export default {
        props: [ 'item' ]
    }
</script>

<style lang="scss" scoped>

</style>