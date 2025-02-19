<template>
  <div class="about-container d-flex justify-content-center align-items-center vh-100">
    <div class="overlay"></div>
    <p class="photo-credit" style="font-size: 0.8em !important;">
      Photo by <a href="https://unsplash.com/@goian?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ian Schneider</a>
      on <a href="https://unsplash.com/photos/person-holding-fire-cracker-shallow-focus-photography-PAykYb-8Er8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
    <div class="content text-center text-white">
      <h1>About Us</h1>
      <p class="lead">Welcome to PumBook – Your ultimate online guest book for any occasion!</p>
      
      <div class="row mt-4">
        <div class="col-md-6">
          <h3>Our Mission</h3>
          <p>We aim to make event guest management seamless, interactive, and memorable for hosts and guests.</p>
        </div>

        <div class="col-md-6">
          <h3>Why PumBook?</h3>
          <p>With our intuitive design and powerful features, you can easily create, manage, and personalize your guest books.</p>
        </div>
      </div>
      
      <div class="mt-4">
        <router-link to="/contact" class="btn btn-primary transparent-btn">Contact Us</router-link>
      </div>
    </div>
  </div>
</template>

<style>
.about-container {
  position: relative;
  background: url('@/assets/about-bg.jpg') center/cover no-repeat;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay for better readability */
}

.content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 20px;
}

.transparent-btn {
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  transition: all 0.3s ease;
}

.transparent-btn:hover {
  background-color: #ffffff;
  color: #000;
}
</style>
