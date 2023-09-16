<script setup lang="ts">
import VideoPlayer from '@/components/VideoPlayer.vue'
import axios from 'axios'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const src = ref<string>()
const videoPlayer = ref()

const get_src = async () => {
  const response = await axios.post('http://127.0.0.1:3000/user/getMovie', {
    id: route.params.id
  })
  src.value = response.data
  console.log(src.value)
  videoPlayer.value = videojs(
    'player',
    {
      controls: true,
      autoplay: true,
      sources: [
        {
          src: response.data,
          type: 'application/x-mpegURL'
        }
      ]
    },
    () => {
      videojs.log('your player is ready')
    }
  )
}

onMounted(async () => {
  await get_src()
  videoPlayer.value.play()
})
</script>

<template>
  <video id="player" class="video-js"></video>
</template>
