<template>
  <div class="terms-container">
    <div class="container">
      <h1 class="text-center">Terms and Conditions</h1>
      <p class="text-muted text-center">Effective Date: <strong>18 February, 2025</strong></p>

      <section v-for="(section, index) in terms" :key="index" class="mb-4">
        <h3>{{ section.title }}</h3>
        <p v-for="(paragraph, pIndex) in section.content" :key="pIndex">
          {{ paragraph }}
        </p>
      </section>

      <div class="text-center">
        <router-link to="/" class="btn btn-primary mt-4">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",
  data() {
    return {
      terms: [
        {
          title: "1. Introduction",
          content: [
            "Welcome to PumBook, your digital guest book for special moments. By accessing or using our platform, you agree to be bound by these Terms and Conditions."
          ]
        },
        {
          title: "2. Eligibility",
          content: [
            "You must be at least 13 years old to register and use PumBook.",
            "If you are under 18, you must have parental or guardian permission to use our services."
          ]
        },
        {
          title: "3. Account Registration",
          content: [
            "You must provide accurate and complete information, including your name, email, phone number, and password when registering.",
            "You are responsible for maintaining the confidentiality of your account credentials.",
            "PumBook offers third-party sign-in via Google Sign-In. By using this option, you agree to Google’s terms of service."
          ]
        },
        {
          title: "4. Data Collection & Privacy",
          content: [
            "We collect and store name, email, phone number, and password for account management and platform functionality.",
            "We use Google Analytics to analyze usage trends and improve our services.",
            "We display advertisements on our platform, which may collect user data.",
            "For more details, please refer to our Privacy Policy."
          ]
        },
        {
          title: "5. Acceptable Use",
          content: [
            "You agree to use PumBook in compliance with all applicable laws.",
            "You may not post offensive, harmful, or unlawful content.",
            "Spamming, hacking, or any form of abuse is strictly prohibited."
          ]
        },
        {
          title: "6. Advertisements & Third-Party Services",
          content: [
            "PumBook displays advertisements, which may be managed by third-party ad networks.",
            "Clicking on third-party links may direct you outside of PumBook, where different terms and privacy policies apply."
          ]
        },
        {
          title: "7. Termination",
          content: [
            "We reserve the right to suspend or terminate your account if you violate these terms."
          ]
        },
        {
          title: "8. Changes to Terms",
          content: [
            "We may update these Terms and Conditions at any time. Continued use of the platform means you accept the revised terms."
          ]
        },
        {
          title: "9. Contact Us",
          content: [
            "For any questions, contact us at hi@muhammadilham.xyz"
          ]
        }
      ]
    };
  }
};
</script>

<style scoped>
.terms-container {
  height: 100vh; /* Full viewport height */
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f8f9fa; /* Light background for contrast */
}

.container {
  max-width: 800px;
  width: 100%;
  height: 90vh; /* Set a fixed height */
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling */
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
h3 {
  color: #007bff;
}
p {
  font-size: 1rem;
  line-height: 1.6;
}
.btn-primary {
  background-color: #007bff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.btn-primary:hover {
  background-color: #0056b3;
}
</style>
