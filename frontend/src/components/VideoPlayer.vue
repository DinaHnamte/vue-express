<script setup lang="ts">
import videojs from 'video.js'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import 'video.js/dist/video-js.css'

const videoPlayer = ref<HTMLVideoElement | null>(null)
let player: ReturnType<typeof videojs>

const props = defineProps<{
  options: {
    autoplay?: boolean
    controls?: boolean
    sources?: Array<{ src: string; type: string }>
  }
}>()

onMounted(() => {
  if (videoPlayer.value) {
    player = videojs(videoPlayer.value, props.options)
  }
})

onBeforeUnmount(() => {
  if (player) {
    player.dispose()
  }
})
</script>

<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>
