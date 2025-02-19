<template>
  <div id="app">
    <NavBar></NavBar>
    <NotificationComp :message="$store.state.notification.message" :type="$store.state.notification.type" />
    <router-view/>
    <!-- <FooterBar></FooterBar> -->
    <div id="footer">
      <footer class="bg-body-tertiary text-center text-lg-start">
        <!-- Copyright -->
        <div class="text-center p-3">
          © 2025 Made with <span>&#10084;</span> by 
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
import NotificationComp from './components/NotificationComp.vue';

export default {
  name: 'HomeView',
  components: {
    NavBar,
    NotificationComp,
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

.photo-credit {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 1px;
  color: rgba(255, 255, 255, 0.7);
}

.photo-credit a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}

.photo-credit a:hover {
  text-decoration: underline;
}

</style>
