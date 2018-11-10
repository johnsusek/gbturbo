<template>
    <div style="position:relative;z-index:99999;">
      <div :style="style" style="width: 100%; height: 200px;"></div>
      <pre>{{ message }}</pre>
      <button @click="makeAngry">ANGRY!</button>
      <button @click="makeGreedy">Greed++</button>
    </div>
</template>

<script>
import { store } from './store';

export default {
  store,

  computed: {
    style() {
      if (!this.color) return;
      let { r, g, b } = this.color;
      return `background-color: rgb(${r}, ${g}, ${b});`;
    },
    color() {
      return this.$store.state.synced.color;
    },
    message() {
      return this.$store.state.synced.message;
    },
  },

  methods: {
    makeAngry() {
      this.$store.broadcast('MAKE_ANGRY');
    },
    makeGreedy() {
      this.$store.broadcast('MAKE_GREEDY');
    },
  },
};
</script>
