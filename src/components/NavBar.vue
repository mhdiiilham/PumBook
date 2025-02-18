<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand pumbook" to="/">PumBook</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item" v-if="$store.state.isLogged">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item" v-if="$store.state.isLogged">
              <router-link class="nav-link" to="/events">Events</router-link>
            </li>
            <li class="nav-item" v-if="$store.state.isLogged">
              <router-link class="nav-link" to="/events/create">Create Event</router-link>
            </li>
          </ul>
          <div v-if="$store.state.isLogged" class="d-flex justify-content-center align-items-center">
            <button @click="handleSignOut" class="btn btn-outline-success">Sign Out</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    handleSignOut() {
      this.$store.dispatch('handleSignOut');
      this.closeNavbar(); // Close navbar after sign out
    },
    closeNavbar() {
      const navbar = document.getElementById("navbarSupportedContent");
      if (navbar.classList.contains("show")) {
        new bootstrap.Collapse(navbar).hide();
      }
    }
}
};
</script>

<style scoped>
.pumbook {
  font-family: "Pacifico", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 1.5em;
}

</style>
