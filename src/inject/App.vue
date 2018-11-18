<template>
  <div />
</template>

<script>
/* global Sortable */

export default {
  watch: {
    '$store.state.config': {
      initial: true,

      handler(config) {
        let topslot = document.querySelector('.kubrick-topslot');

        if (config.header_size === 'mini') {
          topslot.classList.add('site-container');
          document.body.classList.add('gbt-mini');
        } else {
          topslot.classList.remove('site-container');
          document.body.classList.remove('gbt-mini');
        }

        if (config.header_size === 'small') {
          document.body.classList.add('gbt-emsmallen');
        } else {
          document.body.classList.remove('gbt-emsmallen');
        }

        if (config.reorder) {
          document.body.classList.add('gbt-show-reorder');
        } else {
          document.body.classList.remove('gbt-show-reorder');
        }

        if (config.latest_grid) {
          document.body.classList.add('gbt-latest-grid');
        } else {
          document.body.classList.remove('gbt-latest-grid');
        }

        if (!config.modules_threepromo) {
          document.body.classList.add('gbt-hide-threepromo');
        } else {
          document.body.classList.remove('gbt-hide-threepromo');
        }

        if (!config.modules_frontdoor_promos) {
          document.body.classList.add('gbt-hide-frontdoor_promos');
        } else {
          document.body.classList.remove('gbt-hide-frontdoor_promos');
        }

        if (!config.modules_infinite) {
          document.body.classList.add('gbt-hide-infinite');
        } else {
          document.body.classList.remove('gbt-hide-infinite');
        }

        if (!config.modules_latest) {
          document.body.classList.add('gbt-hide-latest');
        } else {
          document.body.classList.remove('gbt-hide-latest');
        }

        if (!config.modules_community) {
          document.body.classList.add('gbt-hide-community');
        } else {
          document.body.classList.remove('gbt-hide-community');
        }

        if (!config.modules_continue) {
          document.body.classList.add('gbt-hide-continue');
        } else {
          document.body.classList.remove('gbt-hide-continue');
        }

        if (!config.modules_popular) {
          document.body.classList.add('gbt-hide-popular');
        } else {
          document.body.classList.remove('gbt-hide-popular');
        }

        if (!config.modules_quicklooks) {
          document.body.classList.add('gbt-hide-quicklooks');
        } else {
          document.body.classList.remove('gbt-hide-quicklooks');
        }

        if (!config.modules_shows) {
          document.body.classList.add('gbt-hide-shows');
        } else {
          document.body.classList.remove('gbt-hide-shows');
        }

        if (!config.modules_history) {
          document.body.classList.add('gbt-hide-history');
        } else {
          document.body.classList.remove('gbt-hide-history');
        }
      }
    }
  },

  created() {
    let upcoming = document.querySelector('.gb-promo-upcoming').cloneNode(true);
    let topslot = document.querySelector('.kubrick-topslot');
    topslot.appendChild(upcoming);

    this.prepareDraggableModules();
    setTimeout(() => {
      this.createSortable();
    }, 10);
  },

  methods: {
    prepareDraggableModules() {
      let gripIcon = browser.runtime.getURL('icons/drag-handle.svg');
      let dragHandle = `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`;

      Array.from(document.querySelectorAll('#wrapper > .site-container:not(.kubrick-topslot) > *')).forEach(el => {
        if (el.classList.contains('frontdoor-community-section')) {
          el.dataset.id = 'community';
          el.insertAdjacentHTML('afterbegin', dragHandle);
        } else if (el.classList.contains('promo-strip-template') && el.classList.contains('three-promos')) {
          el.dataset.id = 'three-promo-strip';
          el.insertAdjacentHTML('afterbegin', dragHandle);
        } else if (el.classList.contains('frontdoor-promos-section')) {
          el.dataset.id = 'frontdoor-promos';
          el.insertAdjacentHTML('afterbegin', dragHandle);
        } else if (el.classList.contains('infinite-simple-promo')) {
          el.dataset.id = 'infinite-promo';
          el.insertAdjacentHTML('afterbegin', dragHandle);
        } else if (el.classList.contains('frontdoor-pod')) {
          if (el.querySelector('h3').textContent === 'Latest') {
            el.dataset.id = 'latest';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          } else if (el.querySelector('h3').textContent === 'Continue Watching') {
            el.dataset.id = 'continue-watching';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          } else if (el.querySelector('h3').textContent === 'Popular') {
            el.dataset.id = 'popular';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          } else if (el.querySelector('h3').textContent === 'Quick Looks') {
            el.dataset.id = 'quick-looks';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          } else if (el.querySelector('h3').textContent === 'Shows') {
            el.dataset.id = 'shows';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          } else if (el.querySelector('h3').textContent === 'This Day in Giant Bomb History') {
            el.dataset.id = 'history';
            el.insertAdjacentHTML('afterbegin', dragHandle);
          }
        }
      });
    },

    async createSortable() {
      let order;
      try {
        let result = await browser.storage.sync.get('gbt-homepage-pods');
        let res = result['gbt-homepage-pods'];
        order = res ? res.split('|') : [];
      } catch (error) {
        console.error(error);
      }

      let el = document.querySelector('#wrapper > .site-container:not(.kubrick-topslot)');

      Sortable.create(el, {
        group: 'gbt-homepage-pods',
        handle: '.gbt-drag-handle',
        store: {
          get() {
            return order;
          },

          set(sortable) {
            let sortOrder = sortable.toArray() || [];
            browser.storage.sync.set({
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

.gbt-emsmallen .kubrick-topslot .hover-play-pause .hover-play-icon,
.gbt-emsmallen .kubrick-topslot {
  height: 54vh;
}

.kubrick-topslot .gb-promo-upcoming {
  display: none;
}

.gbt-mini .kubrick-topslot .gb-promo-upcoming {
  display: block;
}

.gbt-mini .kubrick-topslot {
  position: relative;
  background-size: 445px auto;
  background-position: 0 30px;
  height: 295px;
}

.gbt-mini .kubrick-topslot .kubrick-shadow {
  position: absolute !important;
  bottom: 10px;
  top: 30px;
  height: 100%;
}

.gbt-mini .kubrick-topslot-text {
  margin: 0 0 0 20px;
  align-self: self-start;
  margin-bottom: 0 !important;
  bottom: 54px;
  position: absolute;
}

.kubrick-topslot .gb-promo-upcoming {
  margin-left: 478px;
  margin-top: 30px;
  height: 252px;
}

.kubrick-topslot .gb-promo-upcoming p {
  margin: 0;
}

.gbt-latest-grid [data-id='latest'] .carousel-strip__slot {
  display: inline-block;
  vertical-align: top;
}

.gbt-latest-grid [data-id='latest'] .carousel-strip__strip {
  display: block;
}

.gbt-latest-grid [data-id='latest'] .carousel-strip__control {
  display: none;
}

.gbt-latest-grid [data-id='latest'] .carousel-strip__slot.more {
  display: block;
  padding: 10px;
  max-width: 100% !important;
}

.gbt-show-reorder .gbt-drag-handle {
  display: block;
}

.gbt-hide-community [data-id='community'] {
  display: none;
}

.gbt-hide-threepromo [data-id='three-promo-strip'] {
  display: none;
}

.gbt-hide-frontdoor_promos [data-id='frontdoor-promos'] {
  display: none;
}

.gbt-hide-infinite [data-id='infinite-promo'] {
  display: none;
}

.gbt-hide-latest [data-id='latest'] {
  display: none;
}

.gbt-hide-continue [data-id='continue-watching'] {
  display: none;
}

.gbt-hide-popular [data-id='popular'] {
  display: none;
}

.gbt-hide-quicklooks [data-id='quick-looks'] {
  display: none;
}

.gbt-hide-shows [data-id='shows'] {
  display: none;
}

.gbt-hide-history [data-id='history'] {
  display: none;
}
</style>
