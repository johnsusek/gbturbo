<template>
  <div>
    <input 
      type="text" 
      :value="message" 
      @keyup="updateMessage">
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>
