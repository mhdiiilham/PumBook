<template>
  <div class="landing-container">
    <!-- Hero Section -->
    <header class="hero text-white d-flex align-items-center justify-content-center">
      <div class="overlay"></div> <!-- Dark overlay -->
      <p class="photo-credit" style="font-size: 0.8em !important;">
        Photo by <a href="https://unsplash.com/@srosinger3997?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Samantha Gades</a> on 
        <a href="https://unsplash.com/photos/laughing-people-in-party-fIHozNWfcvs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener noreferrer">Unsplash</a>
      </p>
      <div class="container text-center hero-content">
        <h1>Welcome to <span class="pumbook">PumBook</span></h1>
        <p class="lead">Celebrate with us and leave a message to remember!</p>
        <router-link v-if="!$store.state.isLogged" to="/sign" class="btn btn-primary btn-lg transparent-btn">Sign the Guest Book</router-link>
      </div>
    </header>

    <!-- Features Section -->
    <section class="features container text-center my-5">
      <div class="row">
        <div class="col-md-4">
          <h3>Easy to Use</h3>
          <p>Sign the guest book in just a few clicks!</p>
        </div>
        <div class="col-md-4">
          <h3>Memorable</h3>
          <p>Preserve your guests' wishes and messages forever.</p>
        </div>
        <div class="col-md-4">
          <h3>Secure</h3>
          <p>Your data is safe with us.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LandingPage"
};
</script>

<style scoped>
/* Ensure full height and flex layout */
.landing-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Hero Section */
.hero {
  position: relative;
  background: url('@/assets/landing.jpg') center/cover no-repeat;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* Dark overlay for better text readability */
.hero .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

/* Ensure text appears above the overlay */
.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 3rem;
  font-weight: bold;
}

.hero p {
  font-size: 1.25rem;
}

/* Features Section */
.features h3 {
  color: #000000;
}

.footer {
  margin-top: auto;
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

.pumbook {
  font-family: "Pacifico", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.5em;
}
</style>