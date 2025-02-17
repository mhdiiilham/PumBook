<template>
  <div class="check-in-container">
    <h2>Scan QR Code to Check-In</h2>

    <div class="container">
      <!-- Guest Information Card -->
      <div class="row" v-if="scannedData">
        <div class="card p-4 mb-4 guest-card">
          <button class="close-btn" @click="scannedData = null">✖</button>
          <h3>Guest Information: </h3>
          <p><strong>Name:</strong> {{ scannedData.name }} <span v-if="scannedData.is_vip">⭐️</span></p>
        </div>
      </div>

      <!-- SCANNER -->
      <div class="row justify-content-center">
        <div class="card p-4 text-center" style="max-width: 70%;">
          <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
  components: {
    StreamBarcodeReader,
  },
  data() {
    return {
      scannedData: null,
      error: null,
    };
  },
  methods: {
    onDecode(text) {
      console.log(`Decode text from QR code is ${text}`)
      this.scannedData = JSON.parse(atob(text))
      setTimeout(() => {
        this.scannedData = null;
      }, 15000);
    },
    onLoaded() {
      console.log(`Ready to start scanning barcodes`)
    },
  }
};
</script>

<style>
.check-in-container {
  text-align: center;
  padding: 20px;
}
.toggle-button {
  margin-top: 15px;
  padding: 10px 15px;
  border: none;
  background: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
.toggle-button:hover {
  background: #0056b3;
}
.scanned-result {
  margin-top: 20px;
  background: #d4edda;
  padding: 10px;
  border-radius: 5px;
}
.error-message {
  margin-top: 20px;
  color: red;
}

.guest-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 400px;
  margin: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.close-btn:hover {
  color: red;
}

p {
  margin: 5px 0;
}
</style>
