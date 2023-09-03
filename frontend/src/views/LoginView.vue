<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
const response_message = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const is_form_valid = ref<boolean>(false)

const check_input = () => {
  if (email.value && password.value) {
    is_form_valid.value = true
  } else {
    is_form_valid.value = false
  }
}

const handle_submit = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:3000/user/login',
      {
        email: email.value,
        password: password.value
      },
      { withCredentials: true }
    )
    if (response) {
      console.log(response)
      response_message.value = response.data.message
    }
  } catch (error) {
    const axiosError = error as any
    response_message.value = axiosError.response.data.message
  }
}
</script>

<template>
  <h1>Login</h1>
  <div class="container-center">
    <form @submit.prevent="handle_submit" class="login-form">
      <input type="email" placeholder="Enter Email" v-model="email" @input="check_input" />
      <input
        type="password"
        placeholder="Enter Password"
        v-model="password"
        @input="check_input"
        min="6"
      />
      <button :disabled="!is_form_valid">Submit</button>
      <span v-if="response_message">{{ response_message }}</span>
    </form>
  </div>
</template>
