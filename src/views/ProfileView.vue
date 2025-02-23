<template>
  <div class="profile-container">
    <div class="container">
      <div class="card p-4">
        <!-- Profile Picture -->
        <div class="text-center mb-3 position-relative">
          <label for="profileUpload" class="profile-picture-container">
            <img
              v-if="user.profilePicture"
              :src="user.profilePicture"
              alt="Profile"
              class="profile-picture"
            />
            <div v-else class="profile-placeholder d-flex align-items-center justify-content-center">
              {{ getInitials(user.firstName, user.lastName) }}
            </div>
            <i class="bi bi-camera-fill profile-edit-icon"></i>
          </label>
          <input type="file" id="profileUpload" class="d-none" @change="uploadProfilePicture" />
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" v-model="user.firstName">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" v-model="user.lastName">
          </div>
        </div>

        <!-- Phone Number with Searchable Country Code -->
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
            <input type="tel" class="form-control ms-2" v-model="user.phoneNumber" placeholder="Enter phone number">
          </div>
        </div>

        
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="user.email" disabled>
        </div>
        <button class="btn btn-success w-100" @click="updateProfile">Save Changes</button>
      </div>

      <!-- 🔹 Password Update Section -->
      <div class="card p-4 mt-4">
        <h5 class="text-center">Change Password</h5>

        <div class="mb-3 position-relative">
          <label class="form-label">Current Password</label>
          <div class="password-input">
            <VuePassword
              :toggle="true"
              v-model="passwords.currentPassword"
              class="w-100"
            />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">New Password</label>
          <VuePassword
            :toggle="true"
            v-model="passwords.newPassword"
            @score="showScore"
            :min-length="8"
            class="w-100"
          />
        </div>

        <div class="mb-3 position-relative">
          <label class="form-label">Confirm New Password</label>
          <VuePassword
            :toggle="true"
            v-model="passwords.confirmNewPassword"
            @score="showScore"
            :min-length="8"
            class="w-100"
          />
        </div>

        <button class="btn btn-primary w-100" @click="changePassword">Update Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/helpers/axios";
import VuePassword from "vue-password-strength-meter";

export default {
  components: { VuePassword },
  data() {
    return {
      user: {
        firstName: "Muhammad",
        lastName: "Ilham",
        email: "muhammad.ilham@example.com",
        profilePicture: "",
        countryCode: '62',
        phoneNumber: '',
      },
      passwords: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      passwordStrength: 0,
      passwordFieldType: {
        current: "password",
        confirm: "password",
      },
      passwordIcons: {
        current: "bi-eye-slash",
        confirm: "bi-eye-slash",
      },
      passwordErrors: {
        confirmPassword: "",
      },
      dropdownOpen: false,
      searchQuery: "",
      countryCodes: [],
      selectedCountryCode: {},
    };
  },
  methods: {
    showScore (score) {
      console.log('💯', score)
    },
    async fetchUser() {
      try {
        const response = await apiClient.get('/auth/profile', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
        const user = response.data.data;
        this.user.phoneNumber = user.phone_number;
        this.user.countryCode = user.country_code.replaceAll('+', '');
        this.user.email = user.email;
        this.user.firstName = user.first_name;
        this.user.lastName = user.last_name;
      } catch (error) {
        this.$store.dispatch('setNotification', { message: 'Internal Server Error', type: 'error' });
      }
    },
    uploadProfilePicture(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.user.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    getInitials(firstName, lastName) {
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
    },
    togglePassword(field) {
      this.passwordFieldType[field] = this.passwordFieldType[field] === "password" ? "text" : "password";
      this.passwordIcons[field] = this.passwordFieldType[field] === "password" ? "bi-eye-slash" : "bi-eye";
    },
    updateProfile() {
      console.log("Updating profile...", this.user);
    },
    changePassword() {
      console.log("Changing password...", this.passwords);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    selectCountryCode(country) {
      this.selectedCountryCode = country;
      this.dropdownOpen = false;
    },
    closeDropdown(event) {
      if (!event.target.closest(".dropdown")) {
        this.dropdownOpen = false;
      }
    },
    async fetchCountryCodes() {
      try {
        const { data } = await apiClient.get('/public/countries');
        const { countries } = data.data;
        this.countryCodes = countries;
        this.selectedCountryCode = countries.filter( (country) => {
          if (country.phone_international_prefix == this.user.countryCode) {
            return country;
          }
        })[0];

      } catch (error) {
        console.log(error, 'errp');
        this.$store.dispatch('setNotification', { message: 'failed to fetch country list', type: 'error' });
      }
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
    this.fetchUser()
    this.fetchCountryCodes()
    document.addEventListener("click", this.closeDropdown);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
/* 🔹 Profile Container */
.profile-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

/* 🔹 Profile Picture */
.profile-picture-container {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.profile-picture,
.profile-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background: gray;
  color: white;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔹 Camera Icon */
.profile-edit-icon {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
}

/* 🔹 Password Input Container */
.password-input {
  position: relative;
}

.password-input input {
  padding-right: 40px; /* Space for the icon */
}

.password-input i {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: #6c757d;
  cursor: pointer;
}

/* 🔹 Phone Number Input */
.country-code {
  width: 120px;
  text-align: center;
}

/* 🔹 Country Code Dropdown */
.dropdown {
  position: relative;
  width: 150px;
}

.dropdown-toggle {
  width: 100%;
  text-align: left;
}

.dropdown-menu {
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background: white;
  border: 1px solid #ccc;
}

.search-box {
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
}

.dropdown-item {
  padding: 5px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

/* 🔹 Phone Number Input */
.ms-2 {
  flex-grow: 1;
}

.dropdown-menu {
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  background: white;
  z-index: 1000;
}

.dropdown-item {
  cursor: pointer;
  padding: 5px 10px;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

</style>
