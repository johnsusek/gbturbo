import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

global.browser = require('webextension-polyfill');

export const store = new Vuex.Store({
  state: {
    config: {
      header_size: 'full',
      reorder: false,
      emsmallen: false,
      latest_grid: false,
      modules_community: true,
      modules_threepromo: true,
      modules_frontdoor_promos: true,
      modules_infinite: true,
      modules_latest: true,
      modules_continue: true,
      modules_popular: true,
      modules_quicklooks: true,
      modules_shows: true,
      modules_history: true
    }
  },
  mutations: {
    UPDATE_CONFIG(state, value) {
      state.config = value;
    },

    UPDATE_HEADER_SIZE(state, value) {
      state.config.header_size = value;
    },

    UPDATE_REORDER(state, value) {
      state.config.reorder = value;
    },

    UPDATE_EMSMALLEN(state, value) {
      state.config.emsmallen = value;
    },

    UPDATE_LATEST_GRID(state, value) {
      state.config.latest_grid = value;
    },

    UPDATE_MODULES_COMMUNITY(state, value) {
      state.config.modules_community = !!value;
    },

    UPDATE_MODULES_THREEPROMO(state, value) {
      state.config.modules_threepromo = !!value;
    },

    UPDATE_MODULES_FRONTDOOR_PROMOS(state, value) {
      state.config.modules_frontdoor_promos = !!value;
    },

    UPDATE_MODULES_INFINITE(state, value) {
      state.config.modules_infinite = !!value;
    },

    UPDATE_MODULES_LATEST(state, value) {
      state.config.modules_latest = !!value;
    },

    UPDATE_MODULES_CONTINUE(state, value) {
      state.config.modules_continue = !!value;
    },

    UPDATE_MODULES_POPULAR(state, value) {
      state.config.modules_popular = !!value;
    },

    UPDATE_MODULES_QUICKLOOKS(state, value) {
      state.config.modules_quicklooks = !!value;
    },

    UPDATE_MODULES_SHOWS(state, value) {
      state.config.modules_shows = !!value;
    },

    UPDATE_MODULES_HISTORY(state, value) {
      state.config.modules_history = !!value;
    }
  }
});

browser.storage.sync.get('state').then(result => {
  if (result.state && result.state.config) {
    store.commit('UPDATE_HEADER_SIZE', result.state.config.header_size);
    store.commit('UPDATE_REORDER', result.state.config.reorder === true);
    store.commit('UPDATE_EMSMALLEN', result.state.config.emsmallen === true);
    store.commit(
      'UPDATE_LATEST_GRID',
      result.state.config.latest_grid === true
    );
    store.commit(
      'UPDATE_MODULES_COMMUNITY',
      result.state.config.modules_community !== false
    );
    store.commit(
      'UPDATE_MODULES_THREEPROMO',
      result.state.config.modules_threepromo !== false
    );
    store.commit(
      'UPDATE_MODULES_FRONTDOOR_PROMOS',
      result.state.config.modules_frontdoor_promos !== false
    );
    store.commit(
      'UPDATE_MODULES_INFINITE',
      result.state.config.modules_infinite !== false
    );
    store.commit(
      'UPDATE_MODULES_LATEST',
      result.state.config.modules_latest !== false
    );
    store.commit(
      'UPDATE_MODULES_CONTINUE',
      result.state.config.modules_continue !== false
    );
    store.commit(
      'UPDATE_MODULES_POPULAR',
      result.state.config.modules_popular !== false
    );
    store.commit(
      'UPDATE_MODULES_QUICKLOOKS',
      result.state.config.modules_quicklooks !== false
    );
    store.commit(
      'UPDATE_MODULES_SHOWS',
      result.state.config.modules_shows !== false
    );
    store.commit(
      'UPDATE_MODULES_HISTORY',
      result.state.config.modules_history !== false
    );
  }
});

// Subscribe to state updates on the store, to send to content scripts
store.subscribe((mutation, state) => {
  browser.storage.sync.set({ state });

  browser.tabs.query({ url: 'https://www.giantbomb.com/*' }).then(tabs => {
    tabs.forEach(tab => {
      browser.tabs.sendMessage(tab.id, {
        name: 'STATE_UPDATE',
        payload: state
      });
    });
  });
});

// Listen to incoming mutations
browser.runtime.onMessage.addListener((request, sender) => {
  if (request.name === 'STATE_MUTATION') {
    // A tab has sent up a mutation
    store.commit(request.details.name, request.details.args);
  } else if (request.name === 'STATE_INITIAL') {
    browser.storage.sync.get('state').then(result => {
      if (result.state && result.state.config) {
        // A tab has requested initial state
        browser.tabs.sendMessage(sender.tab.id, {
          name: 'STATE_UPDATE',
          payload: result.state
        });
      }
    });
  }
});
