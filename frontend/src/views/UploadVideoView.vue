<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import axios from 'axios'

const error_message = ref<string>('')
const video_name = ref<string>('')
const video_file = ref<File>()
const upload_progress = ref<number>(0)

const intiSSE = () => {
  const eventSource = new EventSource('http://127.0.0.1:3000/admin/uploadprogress')
  eventSource.onmessage = (event) => {
    upload_progress.value = parseFloat(event.data)
  }
  onUnmounted(() => {
    eventSource.close()
  })
}
intiSSE()
const can_upload = computed(() => {
  return video_file.value !== null && video_name.value !== ''
})

const handle_file_change = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files) {
    video_file.value = input.files[0]
    console.log(video_file.value)
  }
}

const upload_video = async () => {
  if (video_file.value !== undefined && video_name.value !== '') {
    const form_data = new FormData()
    form_data.append('video_name', video_name.value)
    form_data.append('video_file', video_file.value, video_file.value.name)
    try {
      const response = await axios.post('http://127.0.0.1:3000/admin/uploadvideo', form_data, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            upload_progress.value = (progressEvent.loaded / progressEvent.total) * 100
          }
        }
      })
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
        <input type="file" name="video_file" @change="handle_file_change" />
        <button :disabled="!can_upload">Upload</button>
      </div>
      <progress :value="upload_progress" max="100"></progress>
      <span v-if="upload_progress">{{ upload_progress.toFixed(2) }}</span>
      <span v-if="error_message">{{ error_message }}</span>
    </form>
  </div>
</template>
