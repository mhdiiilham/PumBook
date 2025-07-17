<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Upcoming Events</h3>
          <Calendar class="h-5 w-5 text-muted-foreground" />
        </div>
        <p class="text-3xl font-bold mt-2">{{ upcomingEventsCount }}</p>
        <p class="text-muted-foreground text-sm mt-1">Next event in {{ nextEventDays }} days</p>
      </div>
      
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Total Guests</h3>
          <Users class="h-5 w-5 text-muted-foreground" />
        </div>
        <p class="text-3xl font-bold mt-2">{{ totalGuests }}</p>
        <p class="text-muted-foreground text-sm mt-1">Across all events</p>
      </div>
      
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium">Check-in Rate</h3>
          <BarChart class="h-5 w-5 text-muted-foreground" />
        </div>
        <p class="text-3xl font-bold mt-2">{{ checkInRate }}%</p>
        <p class="text-muted-foreground text-sm mt-1">Average across all events</p>
      </div>
    </div>
    
    <!-- Upcoming Events -->
    <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Upcoming Events</h2>
        <router-link to="/events" class="text-sm text-primary hover:underline">View All</router-link>
      </div>
      
      <div v-if="eventsLoading" class="py-4 text-center">
        <Loader2 class="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
      </div>
      
      <div v-else-if="upcomingEvents.length === 0" class="py-8 text-center">
        <Calendar class="h-12 w-12 mx-auto text-muted-foreground mb-2" />
        <h3 class="text-lg font-medium">No Upcoming Events</h3>
        <p class="text-muted-foreground">Create your first event to get started</p>
        <router-link 
          to="/events" 
          class="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          <Plus class="h-4 w-4 mr-2" />
          Create Event
        </router-link>
      </div>
      
      <div v-else class="divide-y divide-border">
        <div 
          v-for="event in upcomingEvents.slice(0, 3)" 
          :key="event.id"
          class="py-4 flex items-center justify-between"
        >
          <div>
            <h3 class="font-medium">{{ event.name }}</h3>
            <div class="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar class="h-4 w-4 mr-1" />
              <span>{{ formatDate(event.startDate) }}</span>
              <MapPin class="h-4 w-4 ml-3 mr-1" />
              <span>{{ event.location }}</span>
            </div>
          </div>
          <div class="flex items-center">
            <div class="text-right mr-4">
              <div class="text-sm font-medium">{{ event.guestCount }} guests</div>
              <div class="text-xs text-muted-foreground">{{ event.checkedInCount }} checked in</div>
            </div>
            <router-link 
              :to="`/events/${event.id}`" 
              class="p-2 rounded-md hover:bg-muted"
            >
              <ChevronRight class="h-5 w-5" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <!-- <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      
      <div class="space-y-4">
        <div v-for="(activity, index) in recentActivity" :key="index" class="flex items-start">
          <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
            <component :is="activity.icon" class="h-4 w-4" />
          </div>
          <div>
            <p class="font-medium">{{ activity.message }}</p>
            <p class="text-sm text-muted-foreground">{{ formatTimeAgo(activity.timestamp) }}</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { 
  Calendar, Users, BarChart, MapPin, ChevronRight, 
  Plus, UserPlus, CheckSquare, Loader2 
} from 'lucide-vue-next';

const store = useStore();

// Load data on component mount
onMounted(async () => {
  await store.dispatch('events/fetchEvents');
});

// Get events from store
const eventsLoading = computed(() => store.getters['events/eventsLoading']);
const upcomingEvents = computed(() => store.getters['events/upcomingEvents']);

// Stats
const upcomingEventsCount = computed(() => upcomingEvents.value.length);
const totalGuests = computed(() => {
  return upcomingEvents.value.reduce((total, event) => total + event.guestCount, 0);
});
const checkInRate = computed(() => {
  const events = store.getters['events/allEvents'];
  if (!events.length) return 0;
  
  const totalGuests = events.reduce((total, event) => total + event.guestCount, 0);
  const totalCheckedIn = events.reduce((total, event) => total + event.checkedInCount, 0);
  
  return totalGuests ? Math.round((totalCheckedIn / totalGuests) * 100) : 0;
});

// Calculate days until next event
const nextEventDays = computed(() => {
  if (!upcomingEvents.value.length) return 0;
  
  const today = new Date();
  const nextEvent = upcomingEvents.value.reduce((closest, event) => {
    const eventDate = new Date(event.startDate);
    const closestDate = new Date(closest.startDate);
    
    return eventDate < closestDate ? event : closest;
  }, upcomingEvents.value[0]);
  
  const diffTime = new Date(nextEvent.startDate).getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
});

// Mock recent activity
const recentActivity = ref([
  {
    icon: UserPlus,
    message: 'New guest registered for Annual Tech Conference 2025',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    icon: CheckSquare,
    message: 'Check-in completed for Marketing Workshop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    icon: Calendar,
    message: 'New event created: Product Launch: XYZ',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  }
]);

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format time ago
const formatTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};
</script>
