import Vue from 'vue';
import App from './App';

let template = `<div id="gbturbo-app"></div>`;
document.body.insertAdjacentHTML('afterBegin', template);

new Vue({
  el: '#gbturbo-app',
  render: h => h(App)
});
