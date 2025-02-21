<template>
  <footer class="bg-dark text-light text-center text-lg-start">
    <div class="container p-4">
      <div class="row">
        <!-- Company Name -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="text-uppercase" style="font-family: 'Pacifico', 'serif';">PumBook</h5>
          <p>
            PumBook is a modern online guestbook platform designed to make your event unforgettable. Whether it's a wedding, birthday, corporate gathering, or any special occasion, PumBook lets your guests leave heartfelt messages, share memories, and celebrate with you—all in a beautifully designed digital space.
          </p>
        </div>

        <!-- Products -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="text-uppercase">Products</h5>
          <ul class="list-unstyled mb-0">
            <li><router-link to="/events" class="text-light">Events</router-link></li>
            <li><router-link to="/events" class="text-light">Host an event</router-link></li>
            <li><a href="#" class="text-light">MDBootstrap</a></li>
            <li><a href="#" class="text-light">MDWordPress</a></li>
            <li><a href="#" class="text-light">BrandFlow</a></li>
            <li><a href="#" class="text-light">Bootstrap Angular</a></li>
          </ul>
        </div>

        <!-- Useful Links -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="text-uppercase">Useful Links</h5>
          <ul class="list-unstyled mb-0">
            <li><a href="#" class="text-light">Your Account</a></li>
            <li><a href="#" class="text-light">Become an Affiliate</a></li>
            <li><a href="#" class="text-light">Shipping Rates</a></li>
            <li><a href="#" class="text-light">Help</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="text-uppercase">Contact</h5>
          <ul class="list-unstyled mb-0">
            <li><i class="fas fa-home me-2"></i> New York, NY 10012, US</li>
            <li><i class="fas fa-envelope me-2"></i> info@gmail.com</li>
            <li><i class="fas fa-phone me-2"></i> +01 234 567 88</li>
            <li><i class="fas fa-print me-2"></i> +01 234 567 89</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center p-3 bg-secondary">
      © 2025 Made with ❤️ by 
      <a class="text-light" target="_blank" href="https://muhammadilham.xyz/">Ilham</a> <br/>
      With help from <a class="text-light" target="_blank" href="https://instagram.com/__ocak">Oca</a> and <a class="text-light" target="_blank" href="https://openai.com/index/chatgpt/">ChatGPT</a>
    </div>
  </footer>
</template>

<style scoped>
footer a {
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
