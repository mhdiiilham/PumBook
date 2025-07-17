<template>
  <div class="p-3 sm:p-4 lg:p-6">
    <div v-if="loading" class="flex justify-center items-center py-12">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else>
      <!-- Header with actions -->
      <div class="flex flex-col gap-3 mb-6">
        <div>
          <h1 class="text-lg sm:text-xl lg:text-2xl font-bold">{{ event.name }}</h1>
          <p class="text-muted-foreground text-sm">{{ event.type }}</p>
        </div>
        <div class="flex gap-2">
          <button
            @click="toggleEditMode" 
            class="flex-1 sm:flex-none px-3 py-2 border border-border rounded-md hover:bg-muted flex items-center justify-center text-sm"
          >
            <Edit class="h-4 w-4 mr-2" />
            <span class="hidden sm:inline">{{ isEditing ? 'Cancel' : 'Edit Event' }}</span>
            <span class="sm:hidden">{{ isEditing ? 'Cancel' : 'Edit' }}</span>
          </button>
          <router-link 
            :to="`/check-in?eventId=${eventId}`" 
            class="flex-1 sm:flex-none px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center text-sm"
          >
            <QrCode class="h-4 w-4 mr-2" />
            Check-in
          </router-link>
        </div>
      </div>

      <!-- Event Details / Edit Form -->
      <div v-if="!isEditing" class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <!-- Event Details Card -->
        <div class="lg:col-span-2 bg-card text-card-foreground rounded-lg p-4 sm:p-6 shadow-sm border border-border">
          <h2 class="text-lg font-semibold mb-4">Event Details</h2>
          
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <Calendar class="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p class="font-medium">{{ formatDate(event.startDate) }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ formatTime(event.startDate) }} - {{ formatTime(event.endDate) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <MapPin class="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p class="break-words">{{ event.location }}</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <Users class="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p>{{ event.guestCount }} guests</p>
            </div>
            
            <div class="flex items-start space-x-3">
              <AlignLeft class="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p class="break-words">{{ event.description }}</p>
            </div>
          </div>
        </div>

        <!-- Event Stats Card -->
        <div class="bg-card text-card-foreground rounded-lg p-4 sm:p-6 shadow-sm border border-border">
          <h2 class="text-lg font-semibold mb-4">Event Stats</h2>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground text-sm">Status</span>
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="event.status === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
              >
                {{ event.status }}
              </span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground text-sm">Total Guests</span>
              <span class="font-medium">{{ event.guestCount }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground text-sm">Checked In</span>
              <span class="font-medium">{{ event.checkedInCount }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-muted-foreground text-sm">Check-in Rate</span>
              <span class="font-medium">{{ checkInRate }}%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-else class="bg-card text-card-foreground rounded-lg p-4 sm:p-6 shadow-sm border border-border mb-8">
        <h2 class="text-lg font-semibold mb-4">Edit Event</h2>
        
        <form @submit.prevent="saveEvent" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium mb-1">Event Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="editForm.name" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
          </div>
          
          <div>
            <label for="type" class="block text-sm font-medium mb-1">Event Type</label>
            <select 
              id="type" 
              v-model="editForm.type" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            >
              <option value="">Select Event Type</option>
              <option value="Conference">Conference</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Networking">Networking</option>
              <option value="Corporate">Corporate</option>
              <option value="Social">Social</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="startDate" class="block text-sm font-medium mb-1">Start Date</label>
              <input 
                type="date" 
                id="startDate" 
                v-model="editForm.startDateInput" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
                required
              />
            </div>
            
            <div>
              <label for="startTime" class="block text-sm font-medium mb-1">Start Time</label>
              <input 
                type="time" 
                id="startTime" 
                v-model="editForm.startTimeInput" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
                required
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label for="endDate" class="block text-sm font-medium mb-1">End Date</label>
              <input 
                type="date" 
                id="endDate" 
                v-model="editForm.endDateInput" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
                required
              />
            </div>
            
            <div>
              <label for="endTime" class="block text-sm font-medium mb-1">End Time</label>
              <input 
                type="time" 
                id="endTime" 
                v-model="editForm.endTimeInput" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
                required
              />
            </div>
          </div>
          
          <div>
            <label for="location" class="block text-sm font-medium mb-1">Location</label>
            <input 
              type="text" 
              id="location" 
              v-model="editForm.location" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              required
            />
          </div>
          
          <div>
            <label for="description" class="block text-sm font-medium mb-1">Description</label>
            <textarea 
              id="description" 
              v-model="editForm.description" 
              rows="4" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
            ></textarea>
          </div>
          
          <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <button 
              type="button" 
              @click="toggleEditMode" 
              class="px-4 py-2 border border-border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              :disabled="saving"
            >
              <Loader2 v-if="saving" class="h-4 w-4 mr-2 animate-spin inline" />
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- Guest Management Section -->
      <div class="mb-8">
        <div class="flex flex-col gap-3 mb-4">
          <h2 class="text-lg font-semibold">Guest List</h2>
          <div class="flex gap-2">
            <button 
              @click="showImportModal = true" 
              class="flex-1 sm:flex-none px-3 py-2 border border-border rounded-md hover:bg-muted flex items-center justify-center text-sm"
            >
              <Upload class="h-4 w-4 mr-2" />
              <span class="hidden sm:inline">Import CSV / Excel</span>
              <span class="sm:hidden">Import</span>
            </button>
            <button 
              @click="showAddGuestModal = true" 
              class="flex-1 sm:flex-none px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center justify-center text-sm"
            >
              <UserPlus class="h-4 w-4 mr-2" />
              Add Guest
            </button>
          </div>
        </div>

        <!-- Guest Search and Filter -->
        <div class="flex flex-col gap-3 mb-4">
          <div class="relative">
            <Search class="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              v-model="guestSearch" 
              placeholder="Search guests..." 
              class="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
            />
          </div>
          <select 
            v-model="guestFilter" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="all">All Guests</option>
            <option value="checked-in">Checked In</option>
            <option value="not-checked-in">Not Checked In</option>
          </select>
        </div>

        <!-- Guest Table/Cards -->
        <div class="bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden">
          <!-- Desktop Table View -->
          <div class="hidden md:block">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-muted/50">
                    <th class="text-left py-3 px-4 font-medium text-sm">ID</th>
                    <th class="text-left py-3 px-4 font-medium text-sm">Name</th>
                    <th class="text-left py-3 px-4 font-medium text-sm">Phone</th>
                    <th class="text-left py-3 px-4 font-medium text-sm">Email</th>
                    <th class="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th class="text-right py-3 px-4 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loadingGuests" class="border-t border-border">
                    <td colspan="6" class="py-8 text-center">
                      <Loader2 class="h-6 w-6 mx-auto animate-spin text-primary" />
                    </td>
                  </tr>
                  <tr v-else-if="filteredGuests.length === 0" class="border-t border-border">
                    <td colspan="6" class="py-8 text-center text-muted-foreground">
                      No guests found
                    </td>
                  </tr>
                  <tr 
                    v-for="guest in filteredGuests" 
                    :key="guest.id" 
                    class="border-t border-border hover:bg-muted/50"
                  >
                    <td class="py-3 px-4 text-sm">{{ guest.barcode || '-' }}</td>
                    <td class="py-3 px-4 text-sm">
                      <div class="flex items-center">
                        <span class="break-words">{{ guest.name }}</span>
                        <span 
                          v-if="guest.vip" 
                          class="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full"
                        >
                          VIP
                        </span>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-sm">{{ guest.phone || '-' }}</td>
                    <td class="py-3 px-4 text-sm break-all">{{ guest.email }}</td>
                    <td class="py-3 px-4 text-sm">
                      <span 
                        class="px-2 py-1 text-xs rounded-full whitespace-nowrap"
                        :class="guest.checkedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                      >
                        {{ guest.checkedIn ? 'Checked In' : 'Not Checked In' }}
                      </span>
                    </td>
                    <td class="py-3 px-4 text-right">
                      <div class="flex justify-end gap-1">
                        <button 
                          @click="toggleGuestMessageModal(guest)" 
                          class="p-1 text-muted-foreground hover:text-foreground"
                          title="View guest message"
                        >
                          <MessageSquare class="h-4 w-4"/>
                        </button>
                        <button 
                          @click="copyInvitationLink(guest)" 
                          class="p-1 text-muted-foreground hover:text-foreground"
                          title="Copy invitation URL"
                        >
                          <ClipboardCopy class="h-4 w-4"/>
                        </button>
                        <button 
                          @click="sendToWhatsApp(guest)" 
                          class="p-1 text-muted-foreground hover:text-foreground"
                          title="Send to WhatsApp"
                        >
                          <MessageCircle class="h-4 w-4"/>
                        </button>
                        <button 
                          @click="deleteGuest(guest)" 
                          class="p-1 text-muted-foreground hover:text-destructive"
                          title="Delete guest"
                        >
                          <Trash2 class="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mobile Card View -->
          <div class="md:hidden">
            <div v-if="loadingGuests" class="py-8 text-center">
              <Loader2 class="h-6 w-6 mx-auto animate-spin text-primary" />
            </div>
            <div v-else-if="filteredGuests.length === 0" class="py-8 text-center text-muted-foreground">
              No guests found
            </div>
            <div v-else class="divide-y divide-border">
              <div 
                v-for="guest in filteredGuests" 
                :key="guest.id" 
                class="p-4 hover:bg-muted/50"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h3 class="font-medium text-sm truncate">{{ guest.name }}</h3>
                      <span 
                        v-if="guest.vip" 
                        class="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full flex-shrink-0"
                      >
                        VIP
                      </span>
                    </div>
                    <p class="text-xs text-muted-foreground mb-1">ID: {{ guest.barcode || '-' }}</p>
                  </div>
                  <span 
                    class="px-2 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0"
                    :class="guest.checkedIn ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ guest.checkedIn ? 'Checked In' : 'Not Checked In' }}
                  </span>
                </div>
                
                <div class="space-y-1 mb-3">
                  <div v-if="guest.phone" class="flex items-center text-xs text-muted-foreground">
                    <span class="w-12 flex-shrink-0">Phone:</span>
                    <span class="break-all">{{ guest.phone }}</span>
                  </div>
                  <div v-if="guest.email" class="flex items-center text-xs text-muted-foreground">
                    <span class="w-12 flex-shrink-0">Email:</span>
                    <span class="break-all">{{ guest.email }}</span>
                  </div>
                </div>
                
                <div class="flex justify-end gap-2">
                  <button 
                    @click="toggleGuestMessageModal(guest)" 
                    class="p-2 text-muted-foreground hover:text-foreground border border-border rounded-md"
                    title="View guest message"
                  >
                    <MessageSquare class="h-4 w-4"/>
                  </button>
                  <button 
                    @click="copyInvitationLink(guest)" 
                    class="p-2 text-muted-foreground hover:text-foreground border border-border rounded-md"
                    title="Copy invitation URL"
                  >
                    <ClipboardCopy class="h-4 w-4"/>
                  </button>
                  <button 
                    @click="sendToWhatsApp(guest)" 
                    class="p-2 text-muted-foreground hover:text-foreground border border-border rounded-md"
                    title="Send to WhatsApp"
                  >
                    <MessageCircle class="h-4 w-4"/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Guest Modal -->
    <div v-if="showAddGuestModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Add Guest</h3>
            <button @click="showAddGuestModal = false" class="text-muted-foreground hover:text-foreground">
              <X class="h-5 w-5" />
            </button>
          </div>
          
          <form @submit.prevent="addGuest" class="space-y-4">
            <div>
              <label for="guestName" class="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                id="guestName" 
                v-model="newGuest.name" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
                required
              />
            </div>
            
            <div>
              <label for="guestEmail" class="block text-sm font-medium mb-1">Email (Optional)</label>
              <input 
                type="email" 
                id="guestEmail" 
                v-model="newGuest.email" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background" 
              />
            </div>
            
            <div>
              <label for="guestPhone" class="block text-sm font-medium mb-1">Phone (Optional)</label>
              <input 
                type="tel" 
                id="guestPhone" 
                v-model="newGuest.phone" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
              />
            </div>

            <div class="flex items-center mt-4">
              <input 
                type="checkbox" 
                id="guestVip" 
                v-model="newGuest.vip" 
                class="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label for="guestVip" class="ml-2 text-sm font-medium">
                Mark as VIP
              </label>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button 
                type="button" 
                @click="showAddGuestModal = false" 
                class="px-4 py-2 border border-border rounded-md hover:bg-muted"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                :disabled="addingGuest"
              >
                <Loader2 v-if="addingGuest" class="h-4 w-4 mr-2 animate-spin inline" />
                Add Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Import CSV Modal -->
    <div v-if="showImportModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Import Guests from CSV</h3>
            <button @click="showImportModal = false" class="text-muted-foreground hover:text-foreground">
              <X class="h-5 w-5" />
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
              <a
                href="../../public/templates/guest_template.csv"
                download
                class="text-sm underline text-primary hover:text-primary/80 text-center"
              >
                Download CSV Template
              </a>
              <a
                href="../../public/templates/guest_template.xlsx"
                download 
                class="text-sm underline text-primary hover:text-primary/80 text-center"
              >
                Download Excel Template
              </a>
            </div>

            <div class="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center" 
                 @dragover.prevent="dragover = true"
                 @dragleave.prevent="dragover = false"
                 @drop.prevent="onFileDrop"
                 :class="{ 'border-primary bg-primary/5': dragover }">
              <Upload class="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p class="mb-2 text-sm">Drag and drop your CSV / Excel file here</p>
              <p class="text-sm text-muted-foreground mb-4">or</p>
              <input 
                type="file" 
                ref="fileInput" 
                accept=".csv, .xlsx" 
                class="hidden" 
                @change="onFileChange"
              />
              <button 
                type="button" 
                @click="$refs.fileInput.click()" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm"
              >
                Browse Files
              </button>
            </div>
            
            <div v-if="csvFile" class="flex items-center justify-between bg-muted p-3 rounded-md">
              <div class="flex items-center min-w-0">
                <FileText class="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                <span class="text-sm truncate">{{ csvFile.name }}</span>
              </div>
              <button @click="csvFile = null" class="text-muted-foreground hover:text-foreground ml-2">
                <X class="h-4 w-4" />
              </button>
            </div>
            
            <div class="text-sm text-muted-foreground">
              <p>CSV file should have the following columns:</p>
              <p class="font-mono mt-1 text-xs">name,email,phone,vip</p>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <button 
                type="button" 
                @click="showImportModal = false" 
                class="px-4 py-2 border border-border rounded-md hover:bg-muted"
              >
                Cancel
              </button>
              <button 
                @click="importCSV" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                :disabled="!csvFile || importing"
              >
                <Loader2 v-if="importing" class="h-4 w-4 mr-2 animate-spin inline" />
                Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div class="p-4 sm:p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Message from {{ selectedGuest?.name }}</h3>
            <button @click="showMessageModal = false" class="text-muted-foreground hover:text-foreground">
              <X class="h-5 w-5" />
            </button>
          </div>
          
          <div class="space-y-4">
            <div class="bg-muted/50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre class="whitespace-pre-wrap text-sm font-mono">{{ guestMessage }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { 
  Calendar, MapPin, Users, Edit, QrCode, AlignLeft, 
  UserPlus, Upload, Search, Check, X, Trash2, Loader2,
  FileText, MessageCircle, ClipboardCopy, MessageSquare
} from 'lucide-vue-next';
import apiClient from '../api/axios';

const route = useRoute();
const router = useRouter();
const store = useStore();

// Event ID from route params
const eventId = computed(() => Number(route.params.id));

// State
const loading = ref(true);
const error = ref(null);
const event = ref(null);
const isEditing = ref(false);
const saving = ref(false);
const editForm = reactive({
  name: '',
  type: '',
  startDateInput: '',
  startTimeInput: '',
  endDateInput: '',
  endTimeInput: '',
  location: '',
  description: '',
});

// Guest management state
const showMessageModal = ref(false);
const selectedGuest = ref(null);
const guestMessage = ref('');
const loadingGuests = ref(true);
const guests = ref([]);
const guestSearch = ref('');
const guestFilter = ref('all');
const showAddGuestModal = ref(false);
const showImportModal = ref(false);
const addingGuest = ref(false);
const importing = ref(false);
const dragover = ref(false);
const csvFile = ref(null);
const newGuest = reactive({
  name: '',
  email: '',
  phone: '',
  vip: false,
});

const toggleGuestMessageModal = (guest) => {
  selectedGuest.value = guest;
  guestMessage.value = guest.message || 'No message from this guest.';
  showMessageModal.value = true;
};

// Fetch event data
onMounted(async () => {
  try {
    loading.value = true;
    const result = await store.dispatch('events/fetchEvent', eventId.value);
    if (result.code === 200) {
      event.value = result.data;
      initEditForm();
    } else {
      error.value = 'Failed to load event details';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred';
  } finally {
    loading.value = false;
  }
  
  // Fetch guests for this event
  fetchGuests();
});

// Initialize edit form with event data
const initEditForm = () => {
  if (!event.value) return;
  
  const startDate = new Date(event.value.startDate);
  const endDate = new Date(event.value.endDate);
  
  editForm.name = event.value.name;
  editForm.type = event.value.type;
  editForm.startDateInput = formatDateForInput(startDate);
  editForm.startTimeInput = formatTimeForInput(startDate);
  editForm.endDateInput = formatDateForInput(endDate);
  editForm.endTimeInput = formatTimeForInput(endDate);
  editForm.location = event.value.location;
  editForm.description = event.value.description;
};

// Format date for display: "Sun, Jun 15, 2025"
const formatDate = (date) => {
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Format time for display: "09:00 AM"
const formatTime = (date) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

// Format date for input field (YYYY-MM-DD)
const formatDateForInput = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Format time for input field (HH:MM)
const formatTimeForInput = (date) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Combine date and time strings into a Date object
const combineDateTime = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  return new Date(year, month - 1, day, hours, minutes);
};

// Toggle edit mode
const toggleEditMode = () => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    initEditForm();
    isEditing.value = true;
  }
};

// Save event changes
const saveEvent = async () => {
  saving.value = true;
  
  try {
    // Combine date and time inputs into Date objects
    const startDate = combineDateTime(editForm.startDateInput, editForm.startTimeInput);
    const endDate = combineDateTime(editForm.endDateInput, editForm.endTimeInput);
    
    // Create event data object
    const eventData = {
      id: eventId.value,
      name: editForm.name,
      type: editForm.type,
      startDate,
      endDate,
      location: editForm.location,
      description: editForm.description,
      status: startDate > new Date() ? 'Upcoming' : 'Past',
      guestCount: event.value.guestCount,
      checkedInCount: event.value.checkedInCount
    };
    
    const result = await store.dispatch('events/updateEvent', { 
      eventId: eventId.value, 
      eventData 
    });
    
    if (result.success) {
      event.value = result.data;
      isEditing.value = false;
    } else {
      error.value = 'Failed to update event';
    }
  } catch (err) {
    error.value = err.message || 'An error occurred';
  } finally {
    saving.value = false;
  }
};

// Computed check-in rate
const checkInRate = computed(() => {
  if (!event.value || event.value.guestCount === 0) return 0;
  return Math.round((event.value.checkedInCount / event.value.guestCount) * 100);
});

// Fetch guests for this event
const fetchGuests = async () => {
  loadingGuests.value = true;
  
  try {
    const response = await apiClient.get(`/events/${eventId.value}/guests`)
    const { data } = response.data;
    console.log(data)
    guests.value = data;
  } catch (err) {
    console.error('Error fetching guests:', err);
  } finally {
    loadingGuests.value = false;
  }
};

// Filter guests based on search and filter
const filteredGuests = computed(() => {
  let result = guests.value;
  
  // Apply search filter
  if (guestSearch.value) {
    const search = guestSearch.value.toLowerCase();
    result = result.filter(guest => 
      guest.name.toLowerCase().includes(search) || 
      guest.email.toLowerCase().includes(search) ||
      (guest.phone && guest.phone.includes(search))
    );
  }
  
  // Apply status filter
  if (guestFilter.value === 'checked-in') {
    result = result.filter(guest => guest.checkedIn);
  } else if (guestFilter.value === 'not-checked-in') {
    result = result.filter(guest => !guest.checkedIn);
  }
  
  return result;
});

// Toggle guest check-in status
const toggleGuestCheckIn = async (guest) => {
  try {
    // In a real app, this would be an API call
    // For now, just update the local state
    guest.checkedIn = !guest.checkedIn;
    
    // Update event check-in count
    if (guest.checkedIn) {
      event.value.checkedInCount++;
    } else {
      event.value.checkedInCount--;
    }
  } catch (err) {
    console.error('Error toggling check-in status:', err);
  }
};

const copyInvitationLink = async (guest) => {
  let messageTemplate = `
Dear ${guest.name},

A little note from our hearts
We’re tying the knot! ♡
And it wouldn’t feel complete without you there.

With all the love and excitement,
we are delighted to invite you to share in the joy of our wedding day:

Hanida & Ilham

♡ Saturday, August 2nd, 2025
♡ Akad Ceremony at 2:00 PM
♡ Wedding Reception at 4:00 PM
♡ Kalyana Resort
Jl. Kaliurang KM 22, Pakem, Sleman, DIY 55585

We hope you can join us as we step into this new chapter of life, surrounded by the people who matter most.

Here’s our full invitation for more details:
⇢ https://wedding.muhammadilham.xyz/?id=${guest.barcode}

Please accept this message as our formal invitation.

⸻

❝ Even when love felt like war, I kept my weapon down for you. ❞
— a reminder of the peace we found in each other.

⸻

Note:
If the link does not open, please copy and paste it into Chrome or another browser.
For best viewing, kindly use Chrome or Safari and disable Dark Mode.

Warmest regards,
Hanida & Ilham`
  await navigator.clipboard.writeText(messageTemplate);
  alert('berhasil menyalin template pesan');
}

const sendToWhatsApp = (guest) => {
  const message = `Dear ${guest.name},

A little note from our hearts
We’re tying the knot! ♡
And it wouldn’t feel complete without you there.

With all the love and excitement,
we are delighted to invite you to share in the joy of our wedding day:

Hanida & Ilham

♡ Saturday, August 2nd, 2025
♡ Akad Ceremony at 2:00 PM
♡ Wedding Reception at 4:00 PM
♡ Kalyana Resort
Jl. Kaliurang KM 22, Pakem, Sleman, DIY 55585

We hope you can join us as we step into this new chapter of life, surrounded by the people who matter most.

Here’s our full invitation for more details:
⇢ https://wedding.muhammadilham.xyz/?id=${guest.barcode}

Please accept this message as our formal invitation.

⸻

❝ Even when love felt like war, I kept my weapon down for you. ❞
— a reminder of the peace we found in each other.

⸻

Note:
If the link does not open, please copy and paste it into Chrome or another browser.
For best viewing, kindly use Chrome or Safari and disable Dark Mode.

Warmest regards,
Hanida & Ilham`

  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${guest.phone}?text=${encodedMessage}`;
  window.open(url, '_blank');
};

// Delete guest
const deleteGuest = (guest) => {
  // In a real app, this would show a confirmation dialog
  if (confirm(`Are you sure you want to remove ${guest.name} from the guest list?`)) {
    guests.value = guests.value.filter(g => g.id !== guest.id);
    event.value.guestCount--;
    if (guest.checkedIn) {
      event.value.checkedInCount--;
    }
  }
};

// Add new guest
const addGuest = async () => {
  addingGuest.value = true;
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newGuestObj = {
      name: newGuest.name,
      email: newGuest.email,
      phone: newGuest.phone || null,
      vip: newGuest.vip,
    };

    const response = await apiClient.post(`/events/${eventId.value}/guests`, { guests: [newGuestObj] });
    await fetchGuests();

    newGuest.name = '';
    newGuest.email = '';
    newGuest.phone = '';
    newGuest.vip = false;
    
    showAddGuestModal.value = false;
  } catch (err) {
    console.error('Error adding guest:', err);
  } finally {
    addingGuest.value = false;
  }
};

// File input handlers
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file &&( file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    csvFile.value = file;
  } else {
    alert('Please select a valid CSV file');
  }
};

const onFileDrop = (e) => {
  dragover.value = false;
  const file = e.dataTransfer.files[0];
  if (file &&( file.type === 'text/csv' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    csvFile.value = file;
  } else {
    alert('Please drop a valid CSV file');
  }
};

// Import CSV
const importCSV = async () => {
  if (!csvFile.value) return;
  
  importing.value = true;
  
  try {
    const formData = new FormData();
    formData.append("guest_file", csvFile.value);
    await apiClient.post(`/events/${eventId.value}/guests/csv`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    alert('Successfully imported guests, this process might took a while');
  } catch (err) {
    console.error('Error importing CSV:', err);
    alert('Error importing CSV file');
  } finally {
    importing.value = false;
    showImportModal.value = false;
  }
};
</script>
