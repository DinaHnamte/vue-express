<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
import logo from './assets/logo.svg'
</script>

<template>
  <header>
    <AppNavbar app_title="My App" :app_logo="logo" />
  </header>
  <router-view />
</template>
