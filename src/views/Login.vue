<template>
  <div class="bg-stone-200">
    <div class="mx-auto max-w-[600px]">
      <form action="" @submit.prevent="auth" class="p-5 mt-50 mb-5 bg-white border border-stone-300 rounded-md shadow-lg">
        <h4 class="text-center text-2xl font-medium">Login</h4>
        <p class="text-red-500">{{ error }}</p>
        <div class="flex flex-col">
          <label class="text-stone-700" for="username">Username</label>
          <input v-model="account.username" class="pl-2.5 pt-3 pb-3 rounded-md border-stone-200 border-[1px]" type="text" placeholder="Your username"/>
        </div>
        <div class="flex flex-col">
          <label class="text-stone-700" for="password">Password</label>
          <input v-model="account.password" class="pl-2.5 pt-3 pb-3 rounded-md border-stone-200 border-[1px]" type="password" placeholder="Your password"/>
        </div>
        <button @click="" class="w-full bg-cyan-500 mt-5 py-4 rounded-sm text-center font-bold text-white cursor-pointer hover:bg-cyan-600 transition shadow-lg" type="submit">Login</button>
      </form>
      <a class="py-1 px-4 text-black hover:bg-stone-300 hover:rounded-md transition" href="/">Home page</a>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const error = ref()
const account = reactive({
  username: '',
  password: ''
})

const router = useRouter()

const auth = (account, () => {
  error.value = !account.username || !account.password
  ? 'Please enter your account' : gotoDashboard()
})

const gotoDashboard = () => {
  router.push('/dashboard')
}

</script>