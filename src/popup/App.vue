<template>
  <main>
    <el-form :model="$store.state.config" label-position="top">
      <el-form-item prop="header_size" label="Header">
        <el-select v-model="header_size">
          <el-option label="Mini" value="mini" />
          <el-option label="Small" value="small" />
          <el-option label="Full" value="full" />
        </el-select>
      </el-form-item>

      <el-form-item prop="reorder" label="Draggable homepage modules">
        <el-switch v-model="reorder" />
        <label>
          When enabled, drag handles will appear next to each section on the homepage.
          Drag the handles up or down to re-arrange homepage modules. Once you are done,
          you can turn this off to hide the drag handles.
        </label>
      </el-form-item>

      <el-form-item prop="latest_grid" label="Display “Latest” as grid">
        <el-switch v-model="latest_grid" />
        <label>
          Turn this on to display latest videos in a grid instead of a carousella.
        </label>
      </el-form-item>

      <el-form-item prop="modules_community" label="Homepage modules">
        <div>
          <el-switch v-model="modules_threepromo" />
          <span class="switch-label">Three-promo strip</span>
        </div>
        <div>
          <el-switch v-model="modules_frontdoor_promos" />
          <span class="switch-label">Billboards</span>
        </div>
        <div>
          <el-switch v-model="modules_infinite" />
          <span class="switch-label">Infinite bar</span>
        </div>
        <div>
          <el-switch v-model="modules_latest" />
          <span class="switch-label">Latest</span>
        </div>
        <div>
          <el-switch v-model="modules_continue" />
          <span class="switch-label">Continue Watching</span>
        </div>
        <div>
          <el-switch v-model="modules_quicklooks" />
          <span class="switch-label">Quicklooks</span>
        </div>
        <div>
          <el-switch v-model="modules_popular" />
          <span class="switch-label">Popular</span>
        </div>
        <div>
          <el-switch v-model="modules_shows" />
          <span class="switch-label">Shows</span>
        </div>
        <div>
          <el-switch v-model="modules_history" />
          <span class="switch-label">This day in Giant Bomb history</span>
        </div>
        <div>
          <el-switch v-model="modules_community" />
          <span class="switch-label">Community</span>
        </div>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },

  computed: {
    header_size: {
      get() {
        return this.$store.state.config.header_size;
      },
      set(value) {
        this.$store.commit('UPDATE_HEADER_SIZE', value);
      }
    },

    reorder: {
      get() {
        return this.$store.state.config.reorder;
      },
      set(value) {
        this.$store.commit('UPDATE_REORDER', value);
      }
    },

    latest_grid: {
      get() {
        return this.$store.state.config.latest_grid;
      },
      set(value) {
        this.$store.commit('UPDATE_LATEST_GRID', value);
      }
    },

    modules_community: {
      get() {
        return this.$store.state.config.modules_community;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_COMMUNITY', value);
      }
    },

    modules_threepromo: {
      get() {
        return this.$store.state.config.modules_threepromo;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_THREEPROMO', value);
      }
    },

    modules_frontdoor_promos: {
      get() {
        return this.$store.state.config.modules_frontdoor_promos;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_FRONTDOOR_PROMOS', value);
      }
    },

    modules_infinite: {
      get() {
        return this.$store.state.config.modules_infinite;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_INFINITE', value);
      }
    },

    modules_latest: {
      get() {
        return this.$store.state.config.modules_latest;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_LATEST', value);
      }
    },

    modules_continue: {
      get() {
        return this.$store.state.config.modules_continue;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_CONTINUE', value);
      }
    },

    modules_popular: {
      get() {
        return this.$store.state.config.modules_popular;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_POPULAR', value);
      }
    },

    modules_quicklooks: {
      get() {
        return this.$store.state.config.modules_quicklooks;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_QUICKLOOKS', value);
      }
    },

    modules_shows: {
      get() {
        return this.$store.state.config.modules_shows;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_SHOWS', value);
      }
    },

    modules_history: {
      get() {
        return this.$store.state.config.modules_history;
      },
      set(value) {
        this.$store.commit('UPDATE_MODULES_HISTORY', value);
      }
    }
  }
};
</script>

<style>
main {
  width: 640px;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
  font-weight: bold;
  color: #777;
}

.el-form-item__content > label {
  display: block;
  font-size: 12px;
  color: #888;
  line-height: 1.3;
  padding-top: 3px;
}

.switch-label {
  color: #888;
}
</style>
