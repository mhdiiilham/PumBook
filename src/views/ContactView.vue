<template>
  <div class="contact-page">
    <p class="photo-credit" style="font-size: 1em !important;">
      Photo by <a href="https://unsplash.com/@julianhochgesang?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Julian Hochgesang</a>
      on <a href="https://unsplash.com/photos/black-ip-desk-phone-on-black-wooden-table-Dkn8-zPIbwo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
    </p>
    <div class="container">
      <h1 class="text-center mb-4 text-white">Contact Us</h1>
      <p class="text-center text-light">We'd love to hear from you! Reach out to us using the form below.</p>

      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card form-card shadow-lg p-4">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" class="form-control" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="form.email" required>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" class="form-control" v-model="form.message" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-outline-light w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('setNotification', { message: 'Your message has been sent!', type: 'success' })

      // Reset form after submission
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>


<style scoped>
/* Ensure full height minus navbar & footer */
.contact-page {
  background: url('@/assets/contact-bg.jpg') center/cover no-repeat;
  min-height: calc(100vh - 100px); /* Adjust based on navbar/footer height */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

/* Dark overlay for better contrast */
.contact-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

/* Ensure content stays above overlay */
.container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 700px; /* Limit width for better responsiveness */
  padding: 30px;
}

/* Text container for better readability */
.text-container {
  background: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  margin-bottom: 20px;
}

.text-container h1,
.text-container p {
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
}

/* Form card with frosted glass effect */
.form-card {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  color: #f8f9fa;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Input and textarea styling */
.form-control {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.3);
  color: white;
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

/* Labels */
.form-label {
  color: #f8f9fa;
}

/* Transparent Button */
.btn-outline-light {
  border: 2px solid white;
  background: transparent;
  color: white;
  transition: 0.3s;
}

.btn-outline-light:hover {
  background: white;
  color: black;
}
</style>
