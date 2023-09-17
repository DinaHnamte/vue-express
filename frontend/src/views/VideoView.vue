<script setup lang="ts">
import axios from 'axios'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type Player from 'video.js/dist/types/player'

const route = useRoute()
const src = ref<string>()
const videoPlayer = ref<string | HTMLVideoElement | null>(null)
let player: Player

const get_src = async () => {
  const response = await axios.post('http://127.0.0.1:3000/user/getMovie', {
    id: route.params.id
  })
  const blob = new Blob([response.data], { type: 'application/x-mpegURL' })
  src.value = URL.createObjectURL(blob)
  console.log(src.value)
  if (videoPlayer.value)
    player = videojs(
      videoPlayer.value,
      {
        controls: true,
        autoplay: true,
        prelaod: 'auto',
        fluid: true,
        sources: [
          {
            src: src.value,
            type: 'application/x-mpegURL'
          }
        ]
      },
      () => {
        console.log(typeof player)
        videojs.log('your player is ready')
      }
    )
}

onMounted(async () => {
  await get_src()
})

onUnmounted(() => {
  if (player) {
    player.dispose()
  }
})
</script>

<template>
  <video id="videoPlayer" ref="videoPlayer" class="video-js"></video>
</template>
