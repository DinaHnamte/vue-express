<script setup lang="ts">
import AppProfile from './AppProfile.vue'

defineProps({
  app_logo: String,
  app_title: String
})
</script>

<template>
  <div class="navbar container">
    <div class="app-info">
      <img :src="app_logo" alt="Logo" class="navbar logo" />
      <h1 class="navbar title">{{ app_title }}</h1>
    </div>
    <div class="nav-items">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/login">Login</router-link>
        </li>
        <li>
          <router-link to="/register">Register</router-link>
        </li>
      </ul>
    </div>
    <AppProfile username="asd" />
  </div>
</template>

<style scoped>
.navbar.container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(50, 50, 50);
  padding: 0 2rem;
  width: 100dvw;
  height: 50px;
  margin: 0px;
}

.app-info {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar.logo {
  height: 30px;
  width: 30px;
  margin-right: 20px;
}

.nav-items ul {
  display: flex;
  flex-direction: row;
}

li {
  list-style: none;
  padding: 0 1rem;
}
</style>
