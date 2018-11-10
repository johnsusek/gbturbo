import Vue from 'vue';
import App from './App';
import { store } from '../store';

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

new Vue({
  el: '#app',
  render: h => h(App)
});
