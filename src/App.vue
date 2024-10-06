<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
div {
  flex: 1;
}
</style>
