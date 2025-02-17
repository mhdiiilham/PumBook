<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <!-- <FooterBar></FooterBar> -->
    <div id="footer">
      <footer class="bg-body-tertiary text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3">
          © 2025 Made with <span>&#10084;</span>
          <a class="text-body" target="_blank" href="https://muhammadilham.xyz/">Ilham</a>
          <br/>
        </div>
        <!-- Copyright -->
      </footer>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    // FooterBar,
  },
  mounted() {
    this.$store.dispatch('loadCredential');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
html, body, #app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1; /* Ensures the content area stretches */
}

#footer {
  margin-top: auto; /* Pushes the footer to the bottom */
}
</style>
