<template>
  <div class="error-page">
    <div class="container">
      <h1>{{ errorCode }}</h1>
      <p>{{ errorMessage }}</p>
      <p><router-link to="/">Go back to home</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorCode: '404',
      errorMessage: "Oops! The page you're looking for doesn't exist."
    };
  },
  created() {
    if (this.$route.query.error === '500') {
      this.errorCode = '500';
      this.errorMessage = 'Something went wrong on our end. Please try again later.';
    }
  }
};
</script>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  background: url('@/assets/pumbook-bg.jpg') no-repeat center center/cover;
  color: white;
  text-align: center;
  font-family: Arial, sans-serif;
  position: relative;
}
.container {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  top: 5%;
  max-width: 80%;
}
h1 {
  font-size: 50px;
  margin-bottom: 10px;
}
p {
  font-size: 20px;
}
a {
  color: #ffcc00;
  text-decoration: none;
  font-weight: bold;
}
</style>
