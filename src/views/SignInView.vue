<template>
  <div class="d-flex justify-content-end align-items-center vh-100 bg-light px-3 animate__backOutDown signin">
    <p class="photo-credit">
      Photo by <a href="https://unsplash.com/@thomasw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Thomas William</a> on <a href="https://unsplash.com/photos/grayscale-photo-of-people-rising-a-drinking-glasses-K8V2NDNJDYo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
      <div class="card-body">
        <div class="alert alert-success" v-show="failMessage" role="alert">
          {{ failMessage }}
        </div>
        <form @submit.prevent="handleSignIn">
          <div class="mb-3">
            <label for="input-email" class="form-label">Email address</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="input-email"
              aria-describedby="emailHelp"
              required
              placeholder="hi@muhammadilham.xyz"
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div class="mb-3">
            <label for="input-password" class="form-label">Password</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="input-password"
              required
            />
          </div>

          <!-- Centered Checkbox & Label -->
          <div class="mb-3 d-flex justify-content-center align-items-center gap-2">
            <input v-model="rememberMe" type="checkbox" class="form-check-input" id="remember" />
            <label class="form-check-label" for="remember">Remember me?</label>
          </div>

          <!-- Button with Loading Spinner -->
          <button type="submit" class="btn btn-primary w-100 position-relative" :disabled="isLoading">
            <span v-if="!isLoading">Submit</span>
            <Loading
              v-if="isLoading"
              :active.sync="isLoading"
              :is-full-page="false"
              :loader="'dots'"
              class="loading-overlay"
            ></Loading>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios.js';
import Loading from 'vue-loading-overlay';
import router from '@/router';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      email: null,
      password: null,
      rememberMe: false,
      failMessage: null,
      isLoading: false,
    };
  },
  methods: {
    async handleSignIn() {
      console.log('Logging in...');
      this.isLoading = true; // Start loading when button is clicked
      try {
        const response = await apiClient.post('/auth', {
          email: this.email,
          password: this.password,
          remember: this.rememberMe,
        });
        this.$store.dispatch('setCredential', { response: response.data, remember: this.rememberMe });
      } catch ({ response }) {
        if (!response) {
          this.failMessage = 'Internal Server Error';
        } else {
          this.failMessage = response.data.message;
          this.password = null;
        }
      } finally {
        this.isLoading = false; // Stop loading after API call
        router.push({ path: '/events' });
      }
    },
  },
}
</script>

<style>
/* Style to position the loading overlay inside the button */
/* .loading-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.signin {
  position: relative;
  background: url('@/assets/signin_bg.jpg') center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
} */

/* Style to position the loading overlay inside the button */
.loading-overlay {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.signin {
  position: relative;
  background: url('@/assets/signin_bg.jpg') center/cover no-repeat;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
}

.card {
  background: rgba(255, 255, 255, 0.8); /* Transparent background */
  border-radius: 10px; /* Optional: rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: shadow effect */
  backdrop-filter: blur(10px); /* Optional: blur effect on the background */
}

.photo-credit {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1px;
  color: rgba(255, 255, 255, 0.7);
}

.photo-credit a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}

.photo-credit a:hover {
  text-decoration: underline;
}

.signin p {
  font-size: 1.25rem;
}
</style>
