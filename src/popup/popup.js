import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import App from './App';
import { store } from '../store';
import './style.scss';

Vue.use(ElementUI, { locale, size: 'mini' });

global.browser = require('webextension-polyfill');

Vue.prototype.$browser = global.browser;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
