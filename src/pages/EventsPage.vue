<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Events</h1>
      <router-link
        to="/events/create"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
      >
        <Plus class="h-4 w-4 mr-2" />
        Create Event
      </router-link>
    </div>
    
    <!-- Tabs -->
    <div class="border-b border-border mb-6">
      <div class="flex space-x-4">
        <button 
          @click="activeTab = 'upcoming'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Upcoming Events
        </button>
        <button 
          @click="activeTab = 'past'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'past' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Past Events
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="eventsLoading" class="py-8 text-center">
      <Loader2 class="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
      <p class="mt-2 text-muted-foreground">Loading events...</p>
    </div>
    
    <!-- Empty State -->
    <div 
      v-else-if="(activeTab === 'upcoming' && upcomingEvents.length === 0) || 
                (activeTab === 'past' && pastEvents.length === 0)" 
      class="py-8 text-center bg-card rounded-lg border border-border"
    >
      <Calendar class="h-12 w-12 mx-auto text-muted-foreground mb-2" />
      <h3 class="text-lg font-medium">No {{ activeTab === 'upcoming' ? 'Upcoming' : 'Past' }} Events</h3>
      <p class="text-muted-foreground">
        {{ activeTab === 'upcoming' ? 'Create your first event to get started' : 'Past events will appear here' }}
      </p>
      <button 
        v-if="activeTab === 'upcoming'"
        @click="showCreateEventModal = true"
        class="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        <Plus class="h-4 w-4 mr-2" />
        Create Event
      </button>
    </div>
    
    <!-- Events List -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="event in activeTab === 'upcoming' ? upcomingEvents : pastEvents" 
        :key="event.id"
        class="bg-card text-card-foreground rounded-lg border border-border overflow-hidden flex flex-col"
      >
        <!-- Event Header -->
        <div class="p-6 bg-primary/5 border-b border-border">
          <div class="flex items-start justify-between">
            <h3 class="font-semibold text-lg">{{ event.name }}</h3>
            <div class="relative" :ref="`menuRef-${event.id}`">
              <button 
                @click="toggleEventMenu(event.id)" 
                class="p-1 rounded-md hover:bg-muted"
              >
                <MoreVertical class="h-5 w-5" />
              </button>
              
              <!-- Event Menu -->
              <div 
                v-if="openMenuId === event.id" 
                class="absolute right-0 mt-1 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-10"
              >
                <button 
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                  @click="editEvent(event)"
                >
                  Edit Event
                </button>
                <button 
                  class="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
                  @click="duplicateEvent(event)"
                >
                  Duplicate Event
                </button>
                <button 
                  class="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                  @click="confirmDeleteEvent(event)"
                >
                  Delete Event
                </button>
              </div>
            </div>
          </div>
          <div class="text-sm text-muted-foreground mt-1">{{ event.type }}</div>
        </div>
        
        <!-- Event Details -->
        <div class="p-6 flex-1">
          <div class="space-y-3">
            <div class="flex items-start">
              <Calendar class="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
              <div>
                <div class="text-sm font-medium">{{ formatDate(event.startDate) }}</div>
                <div class="text-xs text-muted-foreground">
                  {{ formatTime(event.startDate) }} - {{ formatTime(event.endDate) }}
                </div>
              </div>
            </div>
            
            <div class="flex items-start">
              <MapPin class="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
              <div class="text-sm">{{ event.location }}</div>
            </div>
            
            <div class="flex items-start">
              <Users class="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
              <div class="text-sm">{{ event.guestCount }} guests</div>
            </div>
          </div>
          
          <div class="mt-4 text-sm text-muted-foreground line-clamp-2">
            {{ event.description }}
          </div>
        </div>
        
        <!-- Event Footer -->
        <div class="p-4 border-t border-border bg-muted/50 flex justify-between items-center">
          <div class="text-sm">
            <span class="font-medium">Status: </span> 
            <span 
              :class="event.status === 'Upcoming' ? 'text-green-600' : 'text-muted-foreground'"
            >
              {{ event.status }}
            </span>
          </div>
          
          <div class="flex space-x-2">
            <router-link 
              :to="`/check-in?eventId=${event.id}`" 
              class="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-md hover:bg-primary/90"
            >
              Check-in
            </router-link>
            <button 
              class="px-3 py-1 bg-card border border-border text-sm rounded-md hover:bg-muted"
              @click="viewEventDetails(event)"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Create Event Modal -->
    <!-- This would be a component with a form for creating events -->
    
    <!-- Delete Confirmation Modal -->
    <!-- This would be a component for confirming event deletion -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { 
  Calendar, MapPin, Users, Plus, MoreVertical, Loader2 
} from 'lucide-vue-next';

const store = useStore();
const router = useRouter();

// Tab state
const activeTab = ref('upcoming');

// Menu state
const openMenuId = ref(null);
const menuRefs = ref({});

// Modal states
const showCreateEventModal = ref(false);
const showDeleteModal = ref(false);
const selectedEvent = ref(null);

// Get events from store
const eventsLoading = computed(() => store.getters['events/eventsLoading']);
const upcomingEvents = computed(() => store.getters['events/upcomingEvents']);
const pastEvents = computed(() => store.getters['events/pastEvents']);

const toCreateEvent = () => {
  showCreateEventModal.value = true;
}

// Toggle event menu
const toggleEventMenu = (eventId) => {
  if (openMenuId.value === eventId) {
    openMenuId.value = null;
  } else {
    openMenuId.value = eventId;
  }
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (openMenuId.value !== null) {
    const menuRef = menuRefs.value[`menuRef-${openMenuId.value}`];
    if (menuRef && !menuRef.contains(event.target)) {
      openMenuId.value = null;
    }
  }
};

// Event actions
const editEvent = (event) => {
  router.push(`/events/${event.id}`);
  openMenuId.value = null;
};

const duplicateEvent = (event) => {
  openMenuId.value = null;
  // Logic to duplicate event
};

const confirmDeleteEvent = (event) => {
  selectedEvent.value = event;
  openMenuId.value = null;
  showDeleteModal.value = true;
};

const deleteEvent = async () => {
  if (selectedEvent.value) {
    await store.dispatch('events/deleteEvent', selectedEvent.value.id);
    showDeleteModal.value = false;
    selectedEvent.value = null;
  }
};

const viewEventDetails = (event) => {
  // Navigate to event details page
  router.push(`/events/${event.id}`);
};

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format time
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Load data on component mount
onMounted(async () => {
  await store.dispatch('events/fetchEvents');
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
