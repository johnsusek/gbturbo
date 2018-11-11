<template>
  <div />
</template>

<script>
import Sortable from 'sortablejs';

export default {
  watch: {
    '$store.state.config': {
      initial: true,
      handler(config) {
        if (config.reorder) {
          document.body.classList.add('gbt-show-reorder');
        } else {
          document.body.classList.remove('gbt-show-reorder');
        }
      }
    }
  },

  created() {
    let gripIcon = chrome.runtime.getURL('icons/drag-handle.svg');

    Array.from(document.querySelectorAll('#wrapper > .site-container > *')).forEach(el => {
      if (el.classList.contains('frontdoor-community-section')) {
        el.dataset.id = 'community';
        el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
      } else if (el.classList.contains('promo-strip-template') && el.classList.contains('three-promos')) {
        el.dataset.id = 'three-promo-strip';
        el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
      } else if (el.classList.contains('frontdoor-promos-section')) {
        el.dataset.id = 'frontdoor-promos';
        el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
      } else if (el.classList.contains('infinite-simple-promo')) {
        el.dataset.id = 'infinite-promo';
        el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
      } else if (el.classList.contains('frontdoor-pod')) {
        if (el.querySelector('h3').textContent === 'Latest') {
          el.dataset.id = 'latest';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        } else if (el.querySelector('h3').textContent === 'Continue Watching') {
          el.dataset.id = 'continue-watching';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        } else if (el.querySelector('h3').textContent === 'Popular Videos') {
          el.dataset.id = 'popular';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        } else if (el.querySelector('h3').textContent === 'Quick Looks') {
          el.dataset.id = 'quick-looks';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        } else if (el.querySelector('h3').textContent === 'Shows') {
          el.dataset.id = 'shows';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        } else if (el.querySelector('h3').textContent === 'This Day in Giant Bomb History') {
          el.dataset.id = 'history';
          el.insertAdjacentHTML('afterbegin', `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`);
        }
      }
    });

    chrome.storage.sync.get('gbt-homepage-pods', result => {
      let res = result['gbt-homepage-pods'];
      let order = res ? res.split('|') : [];
      this.createSortable(order);
    });
  },

  methods: {
    createSortable(order) {
      let el = document.querySelector('#wrapper > .site-container');

      Sortable.create(el, {
        group: 'gbt-homepage-pods',
        handle: '.gbt-drag-handle',
        store: {
          get() {
            return order;
          },

          set(sortable) {
            let sortOrder = sortable.toArray() || [];
            chrome.storage.sync.set({
              'gbt-homepage-pods': sortOrder.join('|')
            });
          }
        }
      });
    }
  }
};
</script>

<style>
#wrapper > .site-container > * {
  position: relative;
}

.gbt-drag-handle {
  display: none;
  position: absolute;
  top: -3px;
  left: -42px;
  width: 32px;
  height: auto;
  cursor: move;
}

.gbt-show-reorder .gbt-drag-handle {
  display: block;
}
</style>
