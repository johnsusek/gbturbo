import Vue from 'vue';
import App from './App';
import { store } from './store';

let template = '<div id="gbturbo-app"></div>';
document.body.insertAdjacentHTML('afterBegin', template);

new Vue({
  store,
  el: '#gbturbo-app',
  render: h => h(App)
});
