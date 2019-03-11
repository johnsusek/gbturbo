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

        if (!config.modules_latest_premium) {
          document.body.classList.add('gbt-hide-latest-premium');
        } else {
          document.body.classList.remove('gbt-hide-latest-premium');
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
    this.prepareDraggableModules();
    setTimeout(() => {
      this.createSortable();
    }, 10);
  },

  methods: {
    prepareDraggableModules() {
      let gripIcon = browser.runtime.getURL('icons/drag-handle.svg');
      let dragHandle = `<div class="gbt-drag-handle"><img src="${gripIcon}"></span></div>`;

      Array.from(
        document.querySelectorAll(
          '#wrapper > .site-container:not(.kubrick-topslot) > *'
        )
      ).forEach(el => {
        if (el.classList.contains('frontdoor-community-section')) {
          el.dataset.id = 'community';
        } else if (el.classList.contains('frontdoor-promos-section')) {
          el.dataset.id = 'frontdoor-promos';
        } else if (el.classList.contains('infinite-simple-promo')) {
          el.dataset.id = 'infinite-promo';
        } else if (el.classList.contains('carousel__latest-premium')) {
          el.dataset.id = 'latest-premium';
        } else if (el.classList.contains('carousel__latest-content')) {
          el.dataset.id = 'latest';
        } else if (el.classList.contains('carousel__continue-watching')) {
          el.dataset.id = 'continue-watching';
        } else if (el.classList.contains('carousel__this-day-in-history')) {
          el.dataset.id = 'history';
        } else if (el.classList.contains('carousel__shows-latest-content')) {
          el.dataset.id = 'shows';
        } else if (el.classList.contains('frontdoor-pod')) {
          if (el.querySelector('h3').textContent.includes('Quick Looks')) {
            el.dataset.id = 'quick-looks';
          }
        }

        if (el.dataset.id) {
          el.insertAdjacentHTML('afterbegin', dragHandle);
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

      let el = document.querySelector(
        '#wrapper > .site-container:not(.kubrick-topslot)'
      );

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
