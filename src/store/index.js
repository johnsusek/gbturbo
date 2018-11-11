import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    config: {
      reorder: false
    }
  },
  mutations: {
    UPDATE_CONFIG(state, value) {
      state.config = value;
    },

    UPDATE_REORDER(state, value) {
      state.config.reorder = value;
    }
  }
});

chrome.storage.sync.get('state', result => {
  if (result.state && result.state.config) {
    store.commit('UPDATE_CONFIG', result.state.config);
  }
});

// Subscribe to state updates on the store, to send to content scripts
store.subscribe((mutation, state) => {
  chrome.storage.sync.set({ state });

  // TODO: track STATE_INITIAL senders, and only send to them
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, {
        name: 'STATE_UPDATE',
        payload: state
      });
    });
  });
});

// Listen to incoming mutations
chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.name === 'STATE_MUTATION') {
    // A tab has sent up a mutation
    store.commit(request.details.name, request.details.args);
  } else if (request.name === 'STATE_INITIAL') {
    chrome.storage.sync.get('state', result => {
      if (result.state && result.state.config) {
        // A tab has requested initial state
        chrome.tabs.sendMessage(sender.tab.id, {
          name: 'STATE_UPDATE',
          payload: result.state
        });
      }
    });
  }
});
