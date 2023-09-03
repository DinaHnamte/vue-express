<script setup lang="ts">
import { ref } from 'vue'
const error_message = ref<string>('')
const success_message = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const re_password = ref<string>('')
const is_form_valid = ref<boolean>(false)

const check_input = () => {
  if (email.value && password.value && re_password.value && password.value === re_password.value) {
    is_form_valid.value = true
    error_message.value = ''
    success_message.value = ''
  } else {
    error_message.value = ''
    success_message.value = ''
    is_form_valid.value = false
  }
}

const submit_form = async () => {
  try {
    const response = await fetch('http://127.0.0.1:3000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email.value, password: password.value })
    })
    if (response.ok) {
      console.log(response)
      const data = await response.json()
      success_message.value = data.message
    }
  } catch (err) {
    error_message.value = 'An error occured. Please try again.'
  }
}
</script>

<template>
  <h1>Register</h1>
  <div class="container-center">
    <div class="registration-form">
      <form @submit.prevent="submit_form" class="form-input">
        <input
          type="email"
          placeholder="Enter Email"
          required="true"
          v-model="email"
          @input="check_input"
        />
        <input
          type="password"
          placeholder="Enter Password"
          required
          minlength="6"
          v-model="password"
          @input="check_input"
        />
        <input
          type="password"
          placeholder="Re-enter Password"
          required
          minlength="6"
          v-model="re_password"
          @input="check_input"
        />
        <button :disabled="!is_form_valid">Submit</button>
      </form>
      <span v-if="error_message" class="error-message">{{ error_message }}</span>
      <span>Already have an account?.<router-link to="/login">Login</router-link></span>
      <span v-if="success_message" class="success-message">{{ success_message }}</span>
    </div>
  </div>
</template>

<style scoped>
.registration-form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  border: 1px solid rgb(53, 53, 53);
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.form-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
