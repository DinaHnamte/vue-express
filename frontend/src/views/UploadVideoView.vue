<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import axios from 'axios'

const error_message = ref<string>('')
const video_name = ref<string>('')
const video_file = ref<File>()
const upload_progress = ref<number>(0)
const conversion_progress = ref<number>(0)

const intiSSE = () => {
  const eventSource = new EventSource('http://127.0.0.1:3000/admin/uploadprogress')
  eventSource.addEventListener('conversion_update', (event) => {
    conversion_progress.value = parseFloat(event.data)
  })
  eventSource.addEventListener('upload_update', (event) => {
    upload_progress.value = parseFloat(event.data)
  })
  onUnmounted(() => {
    eventSource.close()
  })
}
intiSSE()
const can_upload = computed(() => {
  return video_file.value !== null && video_name.value !== ''
})

const handle_file_change = (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    video_file.value = files[0]
  }
}

const upload_video = async () => {
  if (video_file.value !== undefined && video_name.value !== '') {
    const form_data = new FormData()
    form_data.append('video_name', video_name.value)
    form_data.append('video_file', video_file.value, video_file.value.name)
    try {
      const response = await axios.post('http://127.0.0.1:3000/admin/uploadvideo', form_data)
      console.log(response)
    } catch (error) {
      error_message.value = 'An error occured. Please try again'
    }
  }
}
</script>

<template>
  <div class="container-center">
    <form @submit.prevent="upload_video" class="form-input" enctype="multipart/form-data">
      <input type="text" placeholder="Enter name for the video" v-model="video_name" />
      <div class="input-group">
        <label for="video_file">Video File:</label>
        <input type="file" name="video_file" accept="video/*" @change="handle_file_change" />
        <button :disabled="!can_upload">Upload</button>
      </div>
      <span v-if="conversion_progress">conversion:{{ conversion_progress.toFixed(2) }}</span>
      <progress :value="conversion_progress" max="100"></progress>
      <span v-if="upload_progress">upload:{{ upload_progress.toFixed(2) }}</span>
      <progress :value="upload_progress" max="100"></progress>
      <span v-if="error_message">{{ error_message }}</span>
    </form>
  </div>
</template>
