<template>
  <div>
    <!-- Sidebar -->
    <div :class="['sidebar', { 'open': isSidebarOpen }]">
      <button class="close-btn" @click="toggleSidebar">×</button>
      <ul class="list-unstyled">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </div>

    <!-- Overlay -->
    <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script>
export default {
  props: {
    isSidebarOpen: Boolean
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #343a40;
  padding-top: 60px;
  transition: 0.3s;
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
  color: white;
}
.sidebar ul {
  padding: 0;
}
.sidebar ul li {
  padding: 15px;
}
.sidebar ul li a {
  color: white;
  text-decoration: none;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
