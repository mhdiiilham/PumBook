<template>
  <div class="auth-container">
    <div class="overlay"></div>
    <p class="photo-credit" style="font-size: 0.8em !important;">
      Photo by <a href="https://unsplash.com/@thisisramiro?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ramiro Mendes</a>
      on <a href="https://unsplash.com/photos/closeup-photography-of-gold-colored-ornament-sMCBEI5zkqc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>
    <div class="card auth-card p-4">
      <h2 class="text-center text-light mb-4">Sign Up</h2>

      <form @submit.prevent="handleSubmit">
        <div class="container" id="signup-container">

          <div class="row" v-if="errorMessage">
            <div class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>
          </div>

          <div class="row">
            <div class="mb-3">
                <label for="role" class="form-label text-light">Registering as</label>
                <select class="form-select" aria-label="Select Role" id="role" v-model="role">
                  <option selected>Select your role</option>
                  <option value="organizer">Event Organizer</option>
                  <option value="host">Personal Event Host</option>
                </select>
              </div>
          </div>


          <div class="row">

            <div class="col">
              <div class="mb-3">
                <label for="first-name" class="form-label text-light">{{ role === 'organizer' ? 'Company Name' : 'First Name' }}</label>
                <input type="text" v-model="firstName" class="form-control" id="first-name" required />
              </div>
            </div>

            <div class="col" v-if="role !== 'organizer'">
              <div class="mb-3">
                <label for="last-name" class="form-label text-light">Last Name</label>
                <input type="text" v-model="lastName" class="form-control" id="last-name" />
              </div>
            </div>

          </div>

          <div class="row">
            <div class="mb-3">
              <label for="email" class="form-label text-light">Email</label>
              <input type="email" v-model="email" class="form-control" id="email" required />
            </div>
          </div>

          <div class="row">
            <div class="mb-3">
              <label class="form-label">New Password</label>
              <input type="password" v-model="password" class="form-control" id="password" required />
            </div>
          </div>

          <div class="row">
            <div class="mb-3">
              <label class="form-label">Phone Number</label>
              <div class="d-flex position-relative">
                <div class="dropdown">
                  <button class="btn btn-outline-secondary dropdown-toggle" type="button" @click="toggleDropdown">
                    {{ selectedCountryCode.flag }} +{{ selectedCountryCode.phone_international_prefix }}
                  </button>
                  <div v-if="dropdownOpen" class="dropdown-menu show">
                    <input type="text" class="form-control mb-2" placeholder="Search country..." v-model="searchQuery">
                    <div class="dropdown-item" 
                        v-for="(country, index) in filteredCountryCodes" 
                        :key="index"
                        @click="selectCountryCode(country)">
                      {{ country.flag }} {{ country.name }} (+{{ country.phone_international_prefix }})
                    </div>
                  </div>
                </div>
                <input type="tel" class="form-control ms-2" v-model="phoneNumber" placeholder="Enter phone number">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="text-center mb-3">
            <small class="terms-condition text-light">
                ⚠️ By signing up, you agree to our
                <a href="/terms" target="_blank" class="text-warning fw-bold">Terms and Conditions</a>.
              </small>
            </div>
          </div>

          <div class="row">
            <button type="submit" class="btn btn-primary btn-lg transparent-btn w-100 position-relative mb-2" :disabled="isLoading">
              <div class="container">
                <div class="row justify-content-center">
                  <div v-if="isLoading" class="spinner-border text-primary" role="status"></div>
                  <span v-else style="color: white;">Sign Up</span>
                </div>
              </div>
            </button>
          </div>

          <div class="row">
            <div class="text-center my-3 text-light">or</div>
          </div>

          <div class="row">
            <button class="btn btn-outline-light w-100" @click="signInWithGoogle">
              <i class="bi bi-google"></i> Sign in with Google
            </button>
          </div>

          <div class="row">
            <p class="mt-3 text-center text-light">
              Already have an account? <router-link to="/signin">Sign In</router-link>
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import apiClient from "@/helpers/axios";
import DomainError from "@/helpers/error";

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      role: '',
      dropdownOpen: false,
      searchQuery: "",
      countryCodes: [],
      selectedCountryCode: {
        country_code: 'ID',
        flag: '🇮🇩',
        phone_international_prefix: 62,
      },
      errorMessage: null,
      isLoading: false,
      suggestions: [],
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    async handleSubmit() {
      try {

        if (this.passwordScore < 5) {
          this.errorMessage = 'Please create stronger password!';
          return
        }

        this.isLoading = true;
        const payload = {
          'first_name': this.firstName,
          'last_name': this.lastName,
          'role': this.role,
          'phone_number': `${this.selectedCountryCode.phone_international_prefix}${this.phoneNumber}`,
          'email': this.email,
          'password': this.password,
        };

        const response = await apiClient.post('/auth/signup', payload)
        this.$store.dispatch('setNotification', {
          message: `Welcome ${response.data.data.email}`,
          type: 'success'
        });

        this.isLoading = false;
        await this.$store.dispatch('setCredential', { response: response.data, remember: false });
        this.$router.push({ path: '/events' });
      } catch (err) {
        this.isLoading = false;
        if (err instanceof DomainError) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Internal Server Error';
        }
      }
    },
    signInWithGoogle(event) {
      event.preventDefault(); // Prevent form submission if inside a form
      this.errorMessage = "sorry, we're still developing this feature :)";
      setTimeout(() => {
        this.errorMessage = null;
      }, 5000);
      console.log("Google Sign-In Clicked");
    },
    async fetchCountryCodes() {
      try {
        const { data } = await axios.get('https://ipinfo.io')
        const response = await apiClient.get('/public/countries');
        const { countries } = response.data.data;

        this.countryCodes = countries;
        this.selectedCountryCode = countries.filter( (country) => {
          return country.country_code === data.country
        })[0]

      } catch (error) {
        this.$store.dispatch('setNotification', { message: 'failed to fetch country list', type: 'error' });
      }
    },
    selectCountryCode(country) {
      this.selectedCountryCode = country;
      this.dropdownOpen = false;
    },
  },
  computed: {
    filteredCountryCodes() {
      return this.countryCodes.filter((c) =>
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchCountryCodes()
    document.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
.auth-container {
  position: relative;
  height: 100vh; /* Ensure it takes full height */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/signup-bg.jpg') center/cover no-repeat;
  padding: 1rem; /* Prevent edges from cutting off */
  overflow: hidden; /* Prevent scrolling outside */
}


.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.auth-card {
  position: relative;
  z-index: 1;
  max-width: 500px; /* Reduce width slightly */
  width: 90%; /* Make it responsive */
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  padding: 2rem;
  max-height: 80vh; /* Prevent it from getting too tall */
  overflow-y: auto; /* Allow scrolling inside the card */
}


.form-label {
  color: #f8f9fa !important; /* Lighten text for better readability */
  font-weight: 500;
}

.btn-primary {
  background-color: #007bff; /* Primary blue */
  border-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3; /* Darker blue on hover */
  border-color: #0056b3;
  color: white !important; /* Ensure text stays white */
}

.transparent-btn {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  transition: all 0.3s ease;
}

.transparent-btn:hover {
  background-color: rgba(255, 255, 255, 0.2); /* Slightly visible white background */
  color: white !important;
}


</style>
