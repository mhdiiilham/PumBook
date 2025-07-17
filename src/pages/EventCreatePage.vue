<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Create New Event</h1>
      <router-link 
        to="/events" 
        class="px-4 py-2 border border-border rounded-md hover:bg-muted flex items-center"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Events
      </router-link>
    </div>
    
    <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <form @submit.prevent="createEvent" class="space-y-4">
        <!-- Basic Information -->
        <div>
          <label for="name" class="block text-sm font-medium mb-1">Event Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background" 
            required
          />
          <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
        </div>
        
        <div>
          <label for="type" class="block text-sm font-medium mb-1">Event Type</label>
          <select 
            id="type" 
            v-model="form.type" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
            required
          >
          
            <option value="">Select Event Type</option>
            <option value="wedding">Wedding</option>
            <option value="networking">Networking</option>
            <option value="conferences">Conferences</option>
            <option value="product_launches">Product Launches</option>
            <option value="festival">Festival</option>
            <option value="sport">Sport</option>
            <option value="birthday">Birthday</option>
            <option value="charity">Charity</option>
            <option value="cultural">Cultural</option>
            <option value="concert">Concert</option>
            <option value="comedy">Comedy</option>
            <option value="gathering">Gathering</option>
            <option value="exhibition">Exhibtition</option>
            <option value="workshop">Workshop</option>
            <option value="team_building">Team Building</option>
            <option value="Other">Other</option>
          </select>
          <p v-if="errors.type" class="mt-1 text-sm text-red-500">{{ errors.type }}</p>
        </div>
        
        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="startDate" class="block text-sm font-medium mb-1">Start Date</label>
            <input 
              type="date" 
              id="startDate" 
              v-model="form.startDateInput" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
            <p v-if="errors.startDate" class="mt-1 text-sm text-red-500">{{ errors.startDate }}</p>
          </div>
          
          <div>
            <label for="startTime" class="block text-sm font-medium mb-1">Start Time</label>
            <input 
              type="time" 
              id="startTime" 
              v-model="form.startTimeInput" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
            <p v-if="errors.startTime" class="mt-1 text-sm text-red-500">{{ errors.startTime }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="endDate" class="block text-sm font-medium mb-1">End Date</label>
            <input 
              type="date" 
              id="endDate" 
              v-model="form.endDateInput" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
            <p v-if="errors.endDate" class="mt-1 text-sm text-red-500">{{ errors.endDate }}</p>
          </div>
          
          <div>
            <label for="endTime" class="block text-sm font-medium mb-1">End Time</label>
            <input 
              type="time" 
              id="endTime" 
              v-model="form.endTimeInput" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
            <p v-if="errors.endTime" class="mt-1 text-sm text-red-500">{{ errors.endTime }}</p>
          </div>
        </div>
        
        <!-- Location -->
        <div>
          <label for="location" class="block text-sm font-medium mb-1">Location</label>
          <input 
            type="text" 
            id="location" 
            v-model="form.location" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background" 
            required
          />
          <p v-if="errors.location" class="mt-1 text-sm text-red-500">{{ errors.location }}</p>
        </div>
        
        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium mb-1">Description</label>
          <textarea 
            id="description" 
            v-model="form.description" 
            rows="4" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
          ></textarea>
        </div>
        
        <!-- Expected Guest Count -->
        <div>
          <label for="guestCount" class="block text-sm font-medium mb-1">Expected Guest Count</label>
          <input 
            type="number" 
            id="guestCount" 
            v-model="form.guestCount" 
            min="1" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background" 
            required
          />
          <p v-if="errors.guestCount" class="mt-1 text-sm text-red-500">{{ errors.guestCount }}</p>
        </div>
        
        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-4">
          <router-link 
            to="/events" 
            class="px-4 py-2 border border-border rounded-md hover:bg-muted"
          >
            Cancel
          </router-link>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            :disabled="creating"
          >
            <Loader2 v-if="creating" class="h-4 w-4 mr-2 animate-spin inline" />
            Create Event
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ArrowLeft, Loader2 } from 'lucide-vue-next';

const router = useRouter();
const store = useStore();

// Form state
const form = reactive({
  name: '',
  type: '',
  startDateInput: '',
  startTimeInput: '',
  endDateInput: '',
  endTimeInput: '',
  location: '',
  description: '',
  guestCount: 0
});

const errors = reactive({
  name: '',
  type: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  location: '',
  guestCount: ''
});


const creating = ref(false);

// Combine date and time strings into a Date object
const combineDateTime = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes);
};

// Validate form
const validateForm = () => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = '';
  });
  
  // Validate required fields
  if (!form.name.trim()) {
    errors.name = 'Event name is required';
    isValid = false;
  }
  
  if (!form.type) {
    errors.type = 'Event type is required';
    isValid = false;
  }
  
  if (!form.startDateInput) {
    errors.startDate = 'Start date is required';
    isValid = false;
  }
  
  if (!form.startTimeInput) {
    errors.startTime = 'Start time is required';
    isValid = false;
  }
  
  if (!form.endDateInput) {
    errors.endDate = 'End date is required';
    isValid = false;
  }
  
  if (!form.endTimeInput) {
    errors.endTime = 'End time is required';
    isValid = false;
  }
  
  if (!form.location.trim()) {
    errors.location = 'Location is required';
    isValid = false;
  }
  
  if (!form.guestCount || form.guestCount < 1) {
    errors.guestCount = 'Guest count must be at least 1';
    isValid = false;
  }
  
  // Validate dates
  if (form.startDateInput && form.startTimeInput && form.endDateInput && form.endTimeInput) {
    const startDate = combineDateTime(form.startDateInput, form.startTimeInput);
    const endDate = combineDateTime(form.endDateInput, form.endTimeInput);
    
    if (endDate <= startDate) {
      errors.endDate = 'End date must be after start date';
      isValid = false;
    }
  }
  
  return isValid;
};

// Create event
const createEvent = async () => {
  if (!validateForm()) {
    return;
  }
  
  creating.value = true;
  
  try {
    // Combine date and time inputs into Date objects
    const startDate = combineDateTime(form.startDateInput, form.startTimeInput);
    const endDate = combineDateTime(form.endDateInput, form.endTimeInput);
    
    // Create event data object
    const eventData = {
      name: form.name,
      type: form.type,
      startDate,
      endDate,
      location: form.location,
      description: form.description,
      guestCount: parseInt(form.guestCount),
      checkedInCount: 0,
      status: startDate > new Date() ? 'Upcoming' : 'Past'
    };
    
    const result = await store.dispatch('events/createEvent', eventData);
    if (result.code === 201) {
      router.push('/events');
    } else {
      alert('Failed to create event');
    }
  } catch (err) {
    console.error('Error creating event:', err);
    alert('An error occurred while creating the event');
  } finally {
    creating.value = false;
  }
};
</script>
