<template>
  <div>
    <nav class="navbar navbar-light bg-light shadow-sm">
      <div class="container-fluid position-relative">
        <div v-if="$store.state.isLogged" class="me-auto">
          <button class="btn btn-outline-primary" @click="toggleSidebar">
            ☰ Menu
          </button>
        </div>

        <!-- Center: About, PumBook, and Contact -->
        <div class="nav-center">
          <router-link class="nav-link small-text" to="/about">About</router-link>
          <router-link class="navbar-brand pumbook mx-3" to="/">PumBook</router-link>
          <router-link class="nav-link small-text" to="/contact">Contact</router-link>
        </div>


        <!-- Right: Sign In Button (Only when logged out) -->
        <!-- <div v-if="!$store.state.isLogged" class="ms-auto">
          <router-link to="/signin" class="btn btn-outline-danger">Sign In</router-link>
        </div> -->

      </div>
    </nav>

    <!-- Sidebar -->
    <div v-if="$store.state.isLogged" :class="['sidebar', { open: isSidebarOpen }]">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <ul class="list-unstyled">
        <li v-if="$store.state.isLogged">
          <router-link class="nav-link" to="/events" @click="toggleSidebar">Events</router-link>
        </li>
        <li v-if="$store.state.isLogged">
          <router-link class="nav-link" to="/events/create" @click="toggleSidebar">Create Event</router-link>
        </li>
        <li v-if="$store.state.isLogged">
          <button @click="handleSignOut" class="nav-link">Sign Out</button>
        </li>
      </ul>
    </div>

    <!-- Overlay to Close Sidebar -->
    <div v-if="isSidebarOpen && $store.state.isLogged" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    handleSignOut() {
      this.$store.dispatch('handleSignOut');
      this.toggleSidebar(); // Close sidebar after sign out
    }
  }
};
</script>

<style scoped>
/* Sidebar Styles */
.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #f8f9fa;
  padding-top: 60px;
  transition: 0.3s;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.sidebar.open {
  left: 0;
}
.sidebar .close-btn {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  background: none;
  border: none;
  color: #333;
}
.sidebar ul {
  padding: 0;
}
.sidebar ul li {
  padding: 15px;
}
.sidebar ul li a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}
.sidebar ul li a:hover {
  color: #007bff;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999;
}

/* Ensure Navbar Height */
.navbar {
  min-height: 56px; /* Keeps navbar height consistent */
}

/* Centered Navbar Content */
.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px; /* Spacing between About - PumBook - Contact */
}

/* PumBook Branding */
.pumbook {
  font-family: "Pacifico", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.5em;
}

/* About & Contact Smaller Text */
.small-text {
  font-size: 0.9em;
  color: #6c757d;
  text-decoration: none;
}

.small-text:hover {
  color: #007bff;
}
</style>
