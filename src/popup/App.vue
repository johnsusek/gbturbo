<template>
  <main>
    <el-form :model="$store.state.config" label-position="top">
      <el-form-item prop="reorder" label="Re-order homepage modules">
        <el-switch v-model="reorder">Test</el-switch>
        <label>
          When enabled, drag handles will appear next to each section on the homepage.
          Drag the handles up or down to re-arrange homepage modules.
        </label>
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
    reorder: {
      get() {
        return this.$store.state.config.reorder;
      },
      set(value) {
        this.$store.commit('UPDATE_REORDER', value);
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
}

.el-form-item__content > label {
  display: block;
  font-size: 12px;
  color: #888;
  line-height: 1.3;
  padding-top: 3px;
}
</style>
