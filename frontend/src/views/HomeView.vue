<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const movies = ref()

onMounted(async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3000/user/getAllMovies')
    if (response) {
      movies.value = response.data
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-for="movie in movies" :key="movie.id">
    <router-link :to="'/video/' + movie.id">{{ movie.movie_name }}</router-link>
  </div>
</template>
