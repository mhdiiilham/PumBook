<template>
  <div class="terms-container">
    <p class="photo-credit" style="font-size: 0.8em !important;">
      Photo by <a href="https://unsplash.com/@medicalertuk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">MedicAlert UK</a> on
      <a href="https://unsplash.com/photos/person-wearing-silver-link-bracelet-watch-holding-apple-keyboard-ruFr50amxjg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
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
            "We use the ipinfo.io API to retrieve your country information to pre-select the appropriate country code when registering.",
            "By using PumBook, you consent to the processing of your location data as described in our Privacy Policy.",
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
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
  background: url('@/assets/terms-bg.jpg') no-repeat center center/cover;
}

/* Glossy and Transparent Container */
.container {
  max-width: 800px;
  width: 100%;
  height: 90vh;
  background: rgba(255, 255, 255, 0.15); /* More transparent background */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Stronger shadow for contrast */
  overflow-y: auto;
  position: relative;
  backdrop-filter: blur(20px) brightness(1.2); /* Increased blur and brightness */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle border for better structure */
}

/* Enhanced Glossy Reflection */
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 90%;
  height: 60px;
  background: rgba(255, 255, 255, 0.4);
  transform: translateX(-50%);
  border-radius: 50%;
  filter: blur(20px);
  opacity: 0.8;
}

/* Improved Text Visibility */
h1, h3, p {
  color: #fff; /* Ensuring readability against transparent background */
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

h3 {
  color: #ffcc00; /* More visible contrast */
}

p {
  font-size: 1rem;
  line-height: 1.6;
}

.btn-primary {
  background-color: #ffcc00;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}

.btn-primary:hover {
  background-color: #d4a700;
}

</style>
