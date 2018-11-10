<template>
  <div>
    <h1 :style="style">{{ message }}</h1>
    <div>
      <button @click="giveBlues">Give Blues</button>
      <button @click="makeAngry">Make Angry</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store';

export default {
  data() {
    return {
      color: store.state.synced.color,
      message: store.state.synced.message,
    };
  },

  computed: {
    style() {
      if (!this.color) return;
      let { r, g, b } = this.color;
      return `color: rgb(${r}, ${g}, ${b});`;
    },
  },

  methods: {
    giveBlues() {
      store.commit('GIVE_BLUES');
    },
    makeAngry() {
      console.log('commiting makeangry');
      store.commit('MAKE_ANGRY');
    },
  },
};
</script>
