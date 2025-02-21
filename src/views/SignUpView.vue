<template>
  <div class="auth-container">
    <div class="overlay"></div>
    <div class="card auth-card p-4">
      <h2 class="text-center text-light mb-4">Sign Up</h2>

      <form @submit.prevent="handleSubmit">
        <div class="container">

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
                <input type="text" v-model="lastName" class="form-control" id="first-name" />
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
              <VuePassword
                :toggle="true"
                v-model="password"
                @score="showScore"
                :min-length="8"
                class="w-100"
                @feedback="showFeedback"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="mb-3">
            <label class="form-label">Phone Number</label>
            <div class="d-flex position-relative">
              <!-- Country Code Dropdown -->
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
              <!-- Phone Number Input -->
              <input type="tel" class="form-control ms-2" v-model="phoneNumber" placeholder="Enter phone number">
            </div>
          </div>
        </div>

        <button type="submit" :disabled="isLoading" class="btn btn-primary w-100">
          <div v-if="isLoading" class="spinner-border text-info" role="status"></div>
          <span v-else style="color: black;">Register</span>
        </button>
      </form>

      <div class="text-center my-3 text-light">or</div>

      <button class="btn btn-outline-light w-100" @click="signInWithGoogle">
        <i class="bi bi-google"></i> Sign in with Google
      </button>

      <p class="mt-3 text-center text-light">
        Already have an account? <router-link to="/signin">Sign In</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import VuePassword from "vue-password-strength-meter";
import axios from "axios";
import apiClient from "@/helpers/axios";
import DomainError from "@/helpers/error";

export default {
  components: { VuePassword },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '!',
      phoneNumber: '',
      role: '',
      dropdownOpen: false,
      searchQuery: "",
      countryCodes: [],
      selectedCountryCode: {},
      errorMessage: null,
      isLoading: false,
      suggestions: [],
    };
  },
  methods: {
    showFeedback ({suggestions, warning}) {
      this.suggestions.push(suggestions);
      this.suggestions.push(warning);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    showScore (score) {
      console.log('💯', score)
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
    signInWithGoogle() {
      alert('this feature is coming in hot!');
      console.log("Google Sign-In Clicked");
    },
    async fetchCountryCodes() {
      try {
        const response = await axios.get('https://aaapis.com/api/v1/info/countries/', {
          headers: { Authorization: `Token ${process.env.VUE_APP_COUNTRIES_API_KEY}` }
        })

        

        const {data} = await axios.get('https://ipinfo.io')

        this.countryCodes = response.data.countries;
        this.selectedCountryCode = response.data.countries.filter( (country) => {
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/signup-bg.jpg') center/cover no-repeat;
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
  max-width: 400px;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  padding: 2rem;
}

.form-label {
  color: #f8f9fa !important; /* Lighten text for better readability */
  font-weight: 500;
}

.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
  background: #222;
  border: 1px solid #444;
}

.dropdown-item {
  color: #f8f9fa;
}

.dropdown-item:hover {
  background: #333;
}

.btn-outline-secondary {
  color: #f8f9fa;
  border-color: #bbb;
}

.btn-outline-secondary:hover {
  background: #444;
}

.phone-input-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.phone-input-container .form-control {
  flex: 1;
}

.ms-2 {
  margin-left: 0.5rem;
}

</style>
