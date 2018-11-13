import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

global.browser = require('webextension-polyfill');

export const store = new Vuex.Store({
  state: {
    config: {}
  },
  mutations: {
    // Incoming mutations from background script
    REMOTE_STATE_UPDATE(state, remoteState) {
      state.config = remoteState.config;
    }
  }
});

// Like a Vuex action, but sends it to a remote store on a port instead.
// Remote state will flow back down through the port and be reflected locally.
store.broadcast = function(name, args) {
  browser.runtime.sendMessage({
    name: 'STATE_MUTATION',
    details: { name, args }
  });
};

// Listen to incoming state changes from background
browser.runtime.onMessage.addListener(request => {
  if (request.name === 'STATE_UPDATE') {
    store.commit('REMOTE_STATE_UPDATE', request.payload);
  }
});

// Load the initial state from the background into our injected store
browser.runtime.sendMessage({ name: 'STATE_INITIAL' });
