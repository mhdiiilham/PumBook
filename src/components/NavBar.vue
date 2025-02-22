<template>
  <div>
    <nav class="navbar navbar-light bg-light shadow-sm">
      <div class="container-fluid d-flex align-items-center justify-content-between">

        <!-- Left: ☰ Menu Button (Only for logged-in users) -->
        <div v-if="$store.state.isLogged">
          <button class="btn btn-outline-primary" @click="toggleSidebar">
            ☰ Menu
          </button>
        </div>

        <!-- Center Content (Depends on login state) -->
        <div class="nav-center">
          <router-link v-if="!$store.state.isLogged" class="nav-link small-text" to="/about">About</router-link>
          <router-link class="navbar-brand pumbook mx-2" to="/">PumBook</router-link>
          <router-link v-if="!$store.state.isLogged" class="nav-link small-text" to="/contact">Contact</router-link>
        </div>

        <!-- Invisible Placeholder (Ensures alignment when logged in) -->
        <div v-if="$store.state.isLogged" class="invisible-placeholder"></div>
      </div>
    </nav>

    <!-- Sidebar -->
    <div v-if="$store.state.isLogged" :class="['sidebar', { open: isSidebarOpen }]">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <ul class="list-unstyled">
        <li><router-link class="nav-link" to="/profile" @click="toggleSidebar">Profile</router-link></li>
        <li><router-link class="nav-link" to="/events" @click="toggleSidebar">Events</router-link></li>
        <li><router-link class="nav-link" to="/events/create" @click="toggleSidebar">Create Event</router-link></li>
        <li><button @click="handleSignOut" class="nav-link">Sign Out</button></li>
      </ul>
    </div>

    <!-- Overlay -->
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
  },
  watch: {
    $route() {
      this.isSidebarOpen = false;
    }
  }
};
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  min-height: 56px;
}

/* Centered Navbar Content */
.nav-center {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Adjust spacing between About - PumBook - Contact */
  flex-grow: 1;
}

/* Branding */
.pumbook {
  font-family: "Pacifico", serif;
  font-size: 1.5em;
  text-align: center;
}

/* About & Contact Links */
.small-text {
  font-size: 0.9em;
  color: #6c757d;
  text-decoration: none;
}

.small-text:hover {
  color: #007bff;
}

/* Invisible Placeholder for Alignment */
.invisible-placeholder {
  width: 40px;
  height: 40px;
  visibility: hidden;
}

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
  left: 0 !important;
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
</style>

