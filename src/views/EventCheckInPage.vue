<template>
  <div class="check-in-container">
    <!-- Guest Info Card -->
    <div class="guest-card">
      <h4>Please scan you barcode</h4>
    </div>
    <div class="guest-card" v-if="guest">
      <div v-if="guest.is_vip">
        <p style="font-size: 1.5em;">
          Welcome, <strong>{{ guest.name }}</strong>! 🎉 <br/>
          We're honored to have you here. Enjoy the VIP experience! ⭐️
        </p>
      </div>
      <div v-else>
        <p>
          Nice to see you, <strong>{{ guest.name }}</strong>! 😃 <br/>
          Let’s make great memories today!
        </p>
      </div>
    </div>

    <!-- QR Scanner -->
    <div class="scanner-container">
      <video ref="video" autoplay></video>
    </div>
  </div>
</template>

<script>
import QrScanner from "qr-scanner";

export default {
  data() {
    return {
      guest: null,
      scanner: null,
      currentFacingMode: "user", // "user" (front) | "environment" (back)
    };
  },
  mounted() {
    this.startScanner();
  },
  methods: {
    startScanner() {
      if (this.scanner) {
        this.scanner.destroy();
      }

      this.scanner = new QrScanner(
        this.$refs.video,
        (result) => {
          console.log("Scanned QR Code:", result);
          try {
            this.guest = JSON.parse(atob(result.data));
            setTimeout(() => {
              this.guest = null;
            }, 5000);
          } catch (e) {
            console.error("Invalid QR Code format");
          }
        },
        {
          preferredCamera: this.currentFacingMode,
        }
      );

      this.scanner.start();
    },
    toggleCamera() {
      this.currentFacingMode =
        this.currentFacingMode === "user" ? "environment" : "user";
      this.startScanner();
    },
  },
  beforeDestroy() {
    if (this.scanner) {
      this.scanner.destroy();
    }
  },
};
</script>

<style>
/* Background Image */
.check-in-container {
  text-align: center;
  padding: 20px;
  min-height: 100vh;
  background: url('@/assets/checkin-bg.jpg') no-repeat center center/cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Glassy Guest Info Card */
.guest-card {
  background: rgba(0, 0, 0, 0.3); /* Slightly more opaque */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: left;
  margin-bottom: 20px;
  max-width: 600px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-weight: bold;
}

/* Improve text readability */
.guest-card p {
  color: #ffffff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}


/* QR Scanner Video */
.scanner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

video {
  width: 60%;
  max-width: 600px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Button */
.toggle-button {
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  background: rgba(0, 123, 255, 0.9);
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.toggle-button:hover {
  background: rgba(0, 86, 179, 0.9);
}
</style>
