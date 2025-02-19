<template>
  <div class="d-flex justify-content-end align-items-center vh-100 bg-light px-3 animate__backOutDown signin">
    <p class="photo-credit" style="font-size: 0.5em !important;">
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
              placeholder="organizer@event.com"
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

          <!-- Terms & Conditions Notice -->
          <div class="text-center mb-3">
            <small class="text-muted">
              By signing in, you agree to our
              <a href="/terms" target="_blank" class="text-primary">Terms and Conditions</a>.
            </small>
          </div>

          <!-- Button with Loading Spinner -->
          <button type="submit" class="btn btn-primary btn-lg transparent-btn w-100 position-relative" :disabled="isLoading">
            <div class="container">
              <div class="row justify-content-center">
                <div v-if="isLoading" class="spinner-border text-primary" role="status"></div>
                <span v-else>Sign In</span>
              </div>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios.js';
import router from '@/router';

export default {
  components: {},
  data() {
    return {
      email: null,
      password: null,
      rememberMe: false,
      failMessage: null,
      isLoading: false,
      notification: {
        message: '',
        type: '',
      },
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
        this.$store.dispatch('setNotification', {
          message: `Welcome ${response.data.data.email}`,
          type: 'success'
        });
        this.$store.dispatch('setCredential', { response: response.data, remember: this.rememberMe });
        router.push({ path: '/events' });
      } catch (err) {
        console.log('err', err)
        const { response } = err;
        if (!response) {
          this.failMessage = 'Internal Server Error';
        } else {
          this.failMessage = response.data.message;
          this.password = null;
        }
      } finally {
        this.isLoading = false; // Stop loading after API call
      }
    },
  },
}
</script>

<style scoped>
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
  backdrop-filter: blur(1px); /* Optional: blur effect on the background */
}

.signin p {
  font-size: 1.25rem;
}

.transparent-btn {
  background-color: transparent;
  border: 2px solid #ffffff; /* Lighter color for border */
  color: #ffffff; /* White text for better contrast */
}

.transparent-btn:hover {
  background-color: #ffffff; /* Light background when hovered */
  color: #0056b3; /* Dark blue text on hover */
}
</style>
