<template>
  <div class="relative w-full h-full">
    <!-- QR Code Scanner -->
    <qrcode-stream
      :paused="paused"
      @detect="onDetect"
      class="w-full h-full rounded-md overflow-hidden"
      :constraints="{ facingMode }"
    >
      <!-- Scanning overlay -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-primary rounded-md"></div>
        <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-primary/70 animate-scan"></div>
      </div>
    </qrcode-stream>

    <!-- Camera selection button -->
    <button
      @click="toggleCamera"
      class="absolute bottom-4 right-4 px-3 py-2 text-sm bg-white text-black rounded-md shadow flex items-center space-x-2"
    >
      <Camera class="h-4 w-4" />
      <span>Switch Camera</span>
    </button>

    <!-- Error message -->
    <div v-if="error" class="absolute inset-0 bg-black/75 flex items-center justify-center text-white p-4 text-center">
      <div>
        <AlertCircle class="h-12 w-12 mx-auto mb-2 text-red-500" />
        <p class="text-lg font-bold">{{ error }}</p>
        <p v-if="error === 'Camera access denied'" class="mt-2">
          Please allow camera access to use the scanner
        </p>
        <button 
          @click="$emit('error', error)" 
          class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Close Scanner
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';
import { Camera, AlertCircle, Loader2, Facebook } from 'lucide-vue-next';

const props = defineProps({
  active: Boolean,
});

const emit = defineEmits(['scanned', 'error']);

const error = ref('');
const loading = ref(true);
const cameras = ref([]);
const selectedCamera = ref('auto');
const currentCameraIndex = ref(0);
const facingMode = ref('user');
const paused = ref(false);

// Track options to improve QR code detection
const trackOptions = {
  // Enable all formats for better compatibility
  formats: [
    'qr_code',
    'ean_13',
    'ean_8',
    'code_128',
    'code_39',
    'code_93',
    'upc_a',
    'upc_e',
    'databar',
    'databar_expanded',
    'codabar',
    'itf',
    'aztec',
    'matrix_codes'
  ]
};

// Handle successful QR code scan
const onDetect = (result) => {
  paused.value = true;
  emit('scanned', result);
  setTimeout(() => {
    paused.value = false;
  }, 200);
};

// Toggle between available cameras
const toggleCamera = async () => {
  loading.value = true;
  facingMode.value = facingMode.value == 'user' ? 'environment' : 'user';
  setTimeout(() => {
    loading.value = false
  }, 500);
};

// Clean up on component unmount
onBeforeUnmount(() => {
  // The QrcodeStream component handles camera cleanup automatically
});

</script>

<style scoped>
@keyframes scan {
  0% {
    top: 20%;
  }
  50% {
    top: 80%;
  }
  100% {
    top: 20%;
  }
}

.animate-scan {
  animation: scan 2s infinite ease-in-out;
}
</style>
