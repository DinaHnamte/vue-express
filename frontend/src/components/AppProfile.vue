<script setup lang="ts">
import no_profile_pic from '../assets/no_profile_pic.svg'
defineProps({
  profile_pic: {
    type: String,
    required: false,
    default: no_profile_pic
  },
  username: String
})

const image_error = (e: Event) => {
  const el = e.target as HTMLImageElement
  el.src = no_profile_pic
}
</script>

<template>
  <div class="profile">
    <img :src="profile_pic" alt="user" @error="image_error" />
    <div class="submenu">
      <span>{{ username }}</span>
      <button>Login</button>
    </div>
  </div>
</template>

<style scoped>
.profile {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.profile img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: azure;
}

.submenu {
  position: absolute;
  top: 50px;
  right: -30px;
  background-color: aliceblue;
  width: 150px;
  height: 200px;
  display: flex;
  flex-direction: column;
}
</style>
