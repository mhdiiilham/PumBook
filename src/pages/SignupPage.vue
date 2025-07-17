<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="w-full max-w-md p-6 bg-card rounded-md shadow-md">
      <h2 class="text-2xl font-semibold text-center mb-4">Sign Up</h2>
      <div v-if="authError" class="mb-4 text-red-500 text-sm">
          {{ authError }}
        </div>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="user-type" class="block text-sm font-medium text-text">User Type</label>
          <select 
            id="type" 
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            v-model="userType"
            required>
            <option value="">You're registering as</option>
            <option value="eo_admin">Event Organizer Admin</option>
            <option value="independent_host">Independent Host</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="first-name" class="block text-sm font-medium text-text">First Name*</label>
          <input
            required
            type="text"
            id="first-name"
            v-model="firstName"
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="John"
          />
        </div>
        <div class="mb-4">
          <label for="last-name" class="block text-sm font-medium text-text">Last Name</label>
          <input
            type="text"
            id="last-name"
            v-model="lastName"
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Doe"
          />
        </div>
        <div class="mb-4" v-if="userType === 'eo_admin'">
          <label for="companyName" class="block text-sm font-medium text-text">Company Name</label>
          <input
            type="text"
            id="companyName"
            v-model="companyName"
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Pumbook, Inc"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-text">Email</label>
          <input
            required
            type="email"
            id="email"
            v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="you@example.com"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-text">Password</label>
          <input
            required
            type="password"
            id="password"
            v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="********"
          />
        </div>
        <div class="mb-6">
          <button
            disabled
            type="submit"
            class="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div class="flex items-center justify-between">
        <div class="border-t border-border w-5/12"></div>
        <p class="text-sm text-muted">Or</p>
        <div class="border-t border-border w-5/12"></div>
      </div>
      <div class="mt-4 text-center">
        <p class="text-sm text-muted">
          Already have an account?
          <router-link to="/login" class="text-primary hover:underline">Log In</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Loader2 } from 'lucide-vue-next';
import apiClient from '../api/axios.js';

const userType = ref('');
const firstName = ref('');
const lastName = ref('');
const companyName = ref('');
const email = ref('');
const password = ref('');
const authError = ref('');
const router = useRouter();

const handleSubmit = async () => {
  await registerNewUser();
  // After successful signup, navigate to home
  // router.push('/dashboard');
};

const registerNewUser = async () => {
  try {
    const registerData = {
      first_name: firstName.value,
      last_name: lastName.value,
      company_name: companyName.value,
      email: email.value,
      password: password.value,
      role: userType.value,
    };

    const response = await apiClient.post('/auth/signup', registerData);
  } catch (error) {
    const { response } = error;
    if (response.data) {
      authError.value = response.data.message;
    } else {
      authError.value = 'Internal server error. please try again later';
    }

  }
}
</script>
