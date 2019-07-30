import './scss/main.scss';
import './index.html';
import './bin/interceptors';
require.context('./static/', true, /\.(ttf|woff|woff2|svg|png|jpe?g|pdf)/);

import Vue from 'vue/dist/vue';
import App from './App.vue';

new Vue({
    el: '#main',
    data: {},
    components: {
        App
    }
})