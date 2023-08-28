<script setup lang="ts">
import { ref } from 'vue'
const error_message = ref<string>('')
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
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (response.ok) {
      console.log(response)
    }
  } catch (err) {
    error_message.value = 'An error occured. Please try again.'
  }
}
</script>

<template>
  <h1>Login</h1>
  <div class="container-center">
    <form class="login-form">
      <input type="email" placeholder="Enter Email" v-model="email" @input="check_input" />
      <input type="password" placeholder="Enter Password" v-model="password" @input="check_input" />
      <button @click="handle_submit" :disabled="!is_form_valid">Submit</button>
      <span v-if="error_message">{{ error_message }}</span>
    </form>
  </div>
</template>
