<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Check-in</h1>
    
    <!-- Event Selection -->
    <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border mb-6">
      <h2 class="text-lg font-semibold mb-4">Select Event</h2>
      
      <div v-if="eventsLoading" class="py-4 text-center">
        <Loader2 class="h-6 w-6 mx-auto animate-spin text-muted-foreground" />
      </div>
      
      <div v-else-if="upcomingEvents.length === 0" class="py-4 text-center">
        <p class="text-muted-foreground">No upcoming events available for check-in</p>
        <router-link 
          to="/events" 
          class="mt-2 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus class="h-4 w-4 mr-2" />
          Create Event
        </router-link>
      </div>
      
      <div v-else>
        <select 
          v-model="selectedEventId" 
          class="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          <option value="">Select an event</option>
          <option 
            v-for="event in upcomingEvents" 
            :key="event.id" 
            :value="event.id"
          >
            {{ event.name }} ({{ formatDate(event.startDate) }})
          </option>
        </select>
      </div>
    </div>
    
    <!-- Check-in Interface (only shown when an event is selected) -->
    <div v-if="selectedEventId" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Barcode Scanner -->
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">QR Code Scanner</h2>
          <button 
            @click="toggleScanner" 
            class="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90 flex items-center"
          >
            <component :is="isScanning ? 'X' : 'QrCode'" class="h-4 w-4 mr-2" />
            {{ isScanning ? 'Stop Scanning' : 'Start Scanning' }}
          </button>
        </div>
        
        <div v-if="isScanning" class="aspect-video bg-black rounded-md flex items-center justify-center mb-4">
          <BarcodeScanner 
            :active="isScanning" 
            @scanned="handleScan" 
            @error="handleScannerError"
          />
        </div>
        
        <div v-else class="aspect-video bg-muted rounded-md flex items-center justify-center mb-4">
          <div class="text-center">
            <QrCode class="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
            <p class="text-muted-foreground">Scanner inactive</p>
            <p class="text-sm text-muted-foreground mt-1">Click "Start Scanning" to activate</p>
          </div>
        </div>
        
        <!-- Manual Check-in -->
        <div class="mt-6">
          <h3 class="text-md font-medium mb-2">Manual Check-in</h3>
          <div class="flex">
            <input 
              v-model="manualCode" 
              type="text" 
              placeholder="Enter barcode or guest name" 
              class="flex-1 px-3 py-2 border border-border rounded-l-md bg-background"
            />
            <button 
              @click="checkInManual" 
              class="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90"
              :disabled="!manualCode"
            >
              Check-in
            </button>
          </div>
        </div>
        
        <!-- Recent Scans -->
        <div v-if="recentScans.length > 0" class="mt-6">
          <h3 class="text-md font-medium mb-2">Recent Scans</h3>
          <div class="space-y-2">
            <div 
              v-for="(scan, index) in recentScans.slice(0, 3)" 
              :key="index"
              class="p-3 rounded-md"
              :class="scan.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
            >
              <div class="flex items-center">
                <component 
                  :is="scan.success ? 'CheckCircle' : 'XCircle'" 
                  class="h-5 w-5 mr-2"
                  :class="scan.success ? 'text-green-500' : 'text-red-500'"
                />
                <div>
                  <p class="font-medium">{{ scan.message }}</p>
                  <p class="text-xs text-muted-foreground">{{ formatTimeAgo(scan.timestamp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Guest List -->
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Guest List</h2>
          <div class="text-sm text-muted-foreground">
            {{ checkedInCount }} / {{ totalGuests }} checked in
          </div>
        </div>
        
        <div class="mb-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search guests..." 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
          />
        </div>
        
        <div v-if="checkInLoading" class="py-4 text-center">
          <Loader2 class="h-6 w-6 mx-auto animate-spin text-muted-foreground" />
        </div>
        
        <div v-else-if="filteredGuests.length === 0" class="py-4 text-center">
          <p class="text-muted-foreground">No guests found</p>
        </div>
        
        <div v-else class="overflow-y-auto max-h-[400px] -mx-6 px-6">
          <div 
            v-for="guest in filteredGuests" 
            :key="guest.id"
            class="py-3 border-b border-border last:border-0 flex items-center justify-between"
          >
            <div>
              <div class="font-medium flex items-center">
                {{ guest.name }}
                <span v-if="guest.vip" class="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">VIP</span>
              </div>
              <div class="text-xs text-muted-foreground">{{ guest.email }}</div>
            </div>
            
            <button 
              v-if="guest.checkedIn"
              @click="undoCheckIn(guest.id)"
              class="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full flex items-center"
            >
              <CheckCircle class="h-3 w-3 mr-1" />
              Checked In
            </button>
            <button 
              v-else
              @click="showCheckInModal(guest)"
              class="px-3 py-1 bg-muted text-xs rounded-full hover:bg-primary hover:text-primary-foreground"
            >
              Check In
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Check-in Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-md p-6 animate-in fade-in zoom-in duration-300">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Guest Check-in</h3>
          <button @click="closeModal" class="text-muted-foreground hover:text-foreground">
            <X class="h-5 w-5" />
          </button>
        </div>
        
        <div v-if="selectedGuest" class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xl font-bold">{{ selectedGuest.name }}</p>
              <p class="text-muted-foreground">{{ selectedGuest.email }}</p>
              <p v-if="selectedGuest.phone" class="text-muted-foreground">{{ selectedGuest.phone }}</p>
            </div>
            
            <div v-if="selectedGuest.vip" class="flex flex-col items-center">
              <div class="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Crown class="h-8 w-8 text-amber-600" />
              </div>
              <span class="mt-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">VIP</span>
            </div>
          </div>
          
          <div class="bg-muted p-4 rounded-md">
            <p class="font-medium">Barcode: <span class="font-mono">{{ selectedGuest.barcode }}</span></p>
            <p v-if="selectedGuest.notes" class="mt-2 text-sm">Notes: {{ selectedGuest.notes }}</p>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <button 
              @click="closeModal" 
              class="px-4 py-2 border border-border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              @click="confirmCheckIn" 
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
            >
              <CheckCircle class="h-4 w-4 mr-2" />
              Confirm Check-in
            </button>
          </div>
        </div>
      </div>
    </div>

    <NotifyAlert
      v-model="notification.show"
      :title="notification.title"
      :message="notification.message"
      :type="notification.type"
      :show-confirm="notification.showConfirm"
      :confirm-text="notification.confirmText"
      :cancel-text="notification.cancelText"
      @confirm="notification.onConfirm"
      @cancel="notification.onCancel"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { 
  QrCode, Plus, Loader2, CheckCircle, XCircle, X, Crown
} from 'lucide-vue-next';
import BarcodeScanner from '../components/BarcodeScanner.vue';
import NotifyAlert from '../components/NotifyAlert.vue';
import apiClient from '../api/axios';
import router from '../router';

const store = useStore();
const route = useRoute();

const selectedEventId = ref('');
const manualCode = ref('');
const searchQuery = ref('');
const isScanning = ref(false);
const barcodeValue = ref('hello');

watch(selectedEventId, (newId) => {
  if (newId) {
    router.push({
      query: {
        ...route.query,
        eventId: newId
      }
    })
  }
})


// Notification state
const notification = reactive({
  show: false,
  title: '',
  message: '',
  type: 'info',
  showConfirm: false,
  confirmText: 'Confirm',
  cancelText: 'OK',
  onConfirm: () => {},
  onCancel: () => {}
});

// Modal state
const showModal = ref(false);
const selectedGuest = ref(null);

const eventsLoading = ref(false); // Initialize as ref

// Fetch events outside of conditional block
store.dispatch('events/fetchEvents').finally(() => {
  eventsLoading.value = false; // Set to false after fetching
});
eventsLoading.value = true; // Set to true before fetching

const upcomingEvents = computed(() => store.getters['events/upcomingEvents']);

const checkInLoading = computed(() => store.getters['checkIn/checkInLoading']);
const guests = computed(() => store.getters['checkIn/allGuests']);
const recentScans = computed(() => store.getters['checkIn/recentScans']);

const filteredGuests = computed(() => {
  if (!searchQuery.value) return guests.value;
  const query = searchQuery.value.toLowerCase();
  return guests.value.filter(guest => 
    guest.name.toLowerCase().includes(query) || 
    guest.email.toLowerCase().includes(query) ||
    (guest.barcode && guest.barcode.toLowerCase().includes(query))
  );
});

const checkedInCount = computed(() => guests.value.filter(guest => guest.checkedIn).length);
const totalGuests = computed(() => guests.value.length);

onMounted(() => {
  const eventId = route.query.eventId;
  if (eventId) selectedEventId.value = Number(eventId);
});

watch(selectedEventId, (newEventId) => {
  if (newEventId) {
    store.dispatch('checkIn/selectEvent', newEventId);
  }
});

const toggleScanner = () => {
  isScanning.value = !isScanning.value;
};

const handleScannerError = (error) => {
  isScanning.value = false;
  store.dispatch('checkIn/addRecentScan', {
    success: false,
    message: `Scanner error: ${error}`,
    timestamp: new Date(),
  });
};

const showNotification = (options) => {
  Object.assign(notification, {
    show: true,
    title: 'Notification',
    message: '',
    type: 'info',
    showConfirm: false,
    confirmText: 'Confirm',
    cancelText: 'OK',
    onConfirm: () => {},
    onCancel: () => {}
  }, options);
};

const checkInManual = () => {
  if (!manualCode.value) return;
  
  // Find guest by barcode, name, or email
  const guest = guests.value.find(g => 
    g.barcode === manualCode.value || 
    g.name.toLowerCase() === manualCode.value.toLowerCase() ||
    g.email.toLowerCase() === manualCode.value.toLowerCase()
  );
  
  if (guest) {
    showCheckInModal(guest);
    manualCode.value = '';
  } else {
    showNotification({
      title: 'Warning',
      message: `Guest ${manualCode.value} is not on the RSVP list.`,
      type: 'warning',
      showConfirm: true,
      confirmText: 'Add',
      onConfirm: async () => {
        try {
          await apiClient.post(`/public/guests/${selectedEventId.value}`, { name: manualCode.value, isAttending: true });
          store.dispatch('checkIn/fetchGuests', selectedEventId.value);
        } catch (error) {
          console.log('failed to add new guest on check-in manual');
          console.error(error);
        }
      },
    });
  }
};

const handleScan = (scannedCode) => {
  // The vue-qrcode-reader returns the decoded text directly
  const barcode = scannedCode[0];
  console.log(barcode["rawValue"]);
  const guest = guests.value.find(g => g.barcode === barcode["rawValue"]);

  if (guest) {
    if (guest.checkedIn) {
      // Guest already checked in
      store.dispatch('checkIn/addRecentScan', {
        success: true,
        message: `${guest.name} already checked in`,
        timestamp: new Date(),
      });
    } else {
      showCheckInModal(guest);
    }
  } else {
    // Invalid barcode
    store.dispatch('checkIn/addRecentScan', {
      success: false,
      message: `Invalid barcode: ${barcode}`,
      timestamp: new Date(),
    });
  }
};

const showCheckInModal = (guest) => {
  selectedGuest.value = guest;
  showModal.value = true;

  setTimeout(() => {
    closeModal();
  }, 60000);
};

const closeModal = () => {
  showModal.value = false;
  selectedGuest.value = null;
  isScanning.value = true
};

const confirmCheckIn = () => {
  if (selectedGuest.value) {
    store.dispatch('checkIn/checkInGuest', { barcode: selectedGuest.value.barcode, eventId: selectedEventId.value });
    store.dispatch('checkIn/addRecentScan', {
      success: true,
      message: `Checked in: ${selectedGuest.value.name}`,
      timestamp: new Date(),
    });
    store.dispatch('checkIn/fetchGuests', selectedEventId.value);
    closeModal();
  }
};

const undoCheckIn = (guestId) => {
  store.dispatch('checkIn/undoCheckInGuest', guestId);
};

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
};
</script>

<style scoped>
.animate-in {
  animation-duration: 150ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}

.fade-in {
  animation-name: fadeIn;
}

.zoom-in {
  animation-name: zoomIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}
</style>
