<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Email"
            required
          >
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            placeholder="Password"
            required
          >
        </div>

        <div v-if="authError" class="mb-4 text-red-500 text-sm">
          {{ authError }}
        </div>

        <div class="flex items-center justify-between mb-4">
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center" 
            type="submit"
            :disabled="authLoading"
          >
            <Loader2 v-if="authLoading" class="h-4 w-4 mr-2 animate-spin" />
            <span>Sign In</span>
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>

      <div class="flex items-center justify-center mt-6">
        <div class="border-t border-gray-400 w-full"></div>
        <p class="mx-4 text-gray-500">Or</p>
        <div class="border-t border-gray-400 w-full"></div>
      </div>

      <div class="mt-4 flex flex-col space-y-2">
        <button 
          type="button" 
          class="flex items-center justify-center px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
        >
          <span class="mr-2">G</span>
          Google
        </button>

        <button 
          type="button" 
          class="flex items-center justify-center px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
        >
          <span class="mr-2">f</span>
          Facebook
        </button>
      </div>

      <div class="mt-6 text-center">
        Don't have an account? <router-link to="/signup" class="text-blue-500 hover:text-blue-800">Sign up</router-link>
      </div>
      
      <!-- Development/Testing Helper -->
      <div v-if="isDevelopment" class="mt-4 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-500 mb-2">Live demo:</p>
        <button 
          @click="mockLogin" 
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Mock Login (Bypass Authentication)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Loader2 } from 'lucide-vue-next';

// Get auth state from Vuex
const isDevelopment = computed(() => process.env.NODE_ENV === 'development');

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const authLoading = computed(() => store.getters['auth/authLoading']);
const authError = computed(() => store.getters['auth/authError']);

const handleSubmit = async () => {
  const result = await store.dispatch('auth/login', {
    email: email.value,
    password: password.value
  });
  
  if (result.success) {
    router.push('/dashboard');
  }
};

// Mock login for development/testing
const mockLogin = async () => {
  await store.dispatch('auth/mockLogin');
  router.push('/dashboard');
};
</script>
