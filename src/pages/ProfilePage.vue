<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Profile</h1>
    
    <!-- Profile Tabs -->
    <div class="border-b border-border mb-6">
      <div class="flex space-x-4">
        <button 
          @click="activeTab = 'personal'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'personal' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Personal Information
        </button>
        <button 
          v-if="userRole === 'eo_admin'"
          @click="activeTab = 'company'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'company' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Company Information
        </button>
        <button 
          v-if="userRole === 'eo_admin'"
          @click="activeTab = 'crew'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'crew' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Crew Management
        </button>
        <button
          disabled
          @click="activeTab = 'security'" 
          class="px-4 py-2 border-b-2 font-medium text-sm"
          :class="activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'"
        >
          Security
        </button>
      </div>
    </div>
    
    <!-- Personal Information Tab -->
    <div v-if="activeTab === 'personal'" class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <h2 class="text-lg font-semibold mb-4">Personal Information</h2>
      
      <form @submit.prevent="savePersonalInfo" class="space-y-4">
        <div class="flex items-center mb-6">
          <div class="relative mr-4">
            <div class="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {{ getInitials(user.name) }}
            </div>
            <button 
              type="button"
              class="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full"
            >
              <Upload class="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 class="text-lg font-medium">{{ user.name }}</h3>
            <p class="text-muted-foreground">{{ getRoleName(userRole) }}</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium">Full Name</label>
            <input 
              id="name" 
              v-model="user.name" 
              type="text" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium">Email Address</label>
            <input 
              id="email" 
              v-model="user.email" 
              type="email" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="phone" class="text-sm font-medium">Phone Number</label>
            <input 
              id="phone" 
              v-model="user.phone" 
              type="tel" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          
          <!-- <div class="space-y-2">
            <label for="jobTitle" class="text-sm font-medium">Job Title</label>
            <input 
              id="jobTitle" 
              v-model="user.jobTitle" 
              type="text" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div> -->
        </div>
        
        <!-- <div class="space-y-2">
          <label for="address" class="text-sm font-medium">Address</label>
          <textarea 
            id="address" 
            v-model="user.address" 
            rows="3" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
          ></textarea>
        </div> -->
        
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            type="button" 
            @click="resetPersonalInfo" 
            class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <!-- Company Information Tab (EO Admin only) -->
    <div v-if="activeTab === 'company' && userRole === 'eo_admin'" class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <h2 class="text-lg font-semibold mb-4">Company Information</h2>
      
      <form @submit.prevent="saveCompanyInfo" class="space-y-4">
        <div class="flex items-center mb-6">
          <div class="relative mr-4">
            <div class="h-24 w-24 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {{ getInitials(company.name) }}
            </div>
            <button 
              type="button"
              class="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full"
            >
              <Upload class="h-4 w-4" />
            </button>
          </div>
          <div>
            <h3 class="text-lg font-medium">{{ company.name }}</h3>
            <p class="text-muted-foreground">Event Organizer Company</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="companyName" class="text-sm font-medium">Company Name</label>
            <input 
              id="companyName" 
              v-model="company.name" 
              type="text" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div class="space-y-2">
            <label for="companyEmail" class="text-sm font-medium">Company Email</label>
            <input 
              id="companyEmail" 
              v-model="company.email" 
              type="email" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label for="companyPhone" class="text-sm font-medium">Company Phone</label>
            <input 
              id="companyPhone" 
              v-model="company.phone" 
              type="tel" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
              required
            />
          </div>
          
          <div class="space-y-2">
            <label for="companyWebsite" class="text-sm font-medium">Website</label>
            <input 
              id="companyWebsite" 
              v-model="company.website" 
              type="url" 
              class="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
        </div>
        
        <div class="space-y-2">
          <label for="companyAddress" class="text-sm font-medium">Company Address</label>
          <textarea 
            id="companyAddress" 
            v-model="company.address" 
            rows="3" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
            required
          ></textarea>
        </div>
        
        <div class="space-y-2">
          <label for="companyDescription" class="text-sm font-medium">Company Description</label>
          <textarea 
            id="companyDescription" 
            v-model="company.description" 
            rows="3" 
            class="w-full px-3 py-2 border border-border rounded-md bg-background"
          ></textarea>
        </div>
        
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            type="button" 
            @click="resetCompanyInfo" 
            class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
    
    <!-- Crew Management Tab (EO Admin only) -->
    <div v-if="activeTab === 'crew' && userRole === 'eo_admin'" class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Crew Management</h2>
        <button 
          @click="showInviteModal = true" 
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center"
        >
          <UserPlus class="h-4 w-4 mr-2" />
          Invite Crew Member
        </button>
      </div>
      
      <div class="bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-muted/50">
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                <th class="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th class="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="crew in crewMembers" :key="crew.id" class="border-t border-border hover:bg-muted/50">
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                      {{ getInitials(crew.name) }}
                    </div>
                    <span>{{ crew.name }}</span>
                  </div>
                </td>
                <td class="px-4 py-4">{{ crew.email }}</td>
                <td class="px-4 py-4">{{ crew.role }}</td>
                <td class="px-4 py-4">
                  <span 
                    class="px-2 py-1 text-xs font-medium rounded-full" 
                    :class="crew.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                  >
                    {{ crew.status }}
                  </span>
                </td>
                <td class="px-4 py-4 text-right">
                  <div class="flex justify-end space-x-2">
                    <button 
                      @click="editCrewMember(crew)" 
                      class="p-1 text-muted-foreground hover:text-foreground" 
                      title="Edit Crew Member"
                    >
                      <Edit class="h-4 w-4" />
                    </button>
                    <button 
                      @click="confirmRemoveCrew(crew)" 
                      class="p-1 text-muted-foreground hover:text-destructive" 
                      title="Remove Crew Member"
                    >
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="crewMembers.length === 0">
                <td colspan="5" class="px-4 py-8 text-center text-muted-foreground">
                  No crew members found. Invite your first crew member to get started.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Security Tab -->
    <div v-if="activeTab === 'security'" class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
      <h2 class="text-lg font-semibold mb-4">Security Settings</h2>
      
      <form @submit.prevent="saveSecuritySettings" class="space-y-6">
        <div>
          <h3 class="text-md font-medium mb-3">Change Password</h3>
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="currentPassword" class="text-sm font-medium">Current Password</label>
              <input 
                id="currentPassword" 
                v-model="security.currentPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              />
            </div>
            
            <div class="space-y-2">
              <label for="newPassword" class="text-sm font-medium">New Password</label>
              <input 
                id="newPassword" 
                v-model="security.newPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              />
              <p class="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include a number and a special character.
              </p>
            </div>
            
            <div class="space-y-2">
              <label for="confirmPassword" class="text-sm font-medium">Confirm New Password</label>
              <input 
                id="confirmPassword" 
                v-model="security.confirmPassword" 
                type="password" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              />
            </div>
          </div>
        </div>
        
        <div class="border-t border-border pt-4">
          <h3 class="text-md font-medium mb-3">Two-Factor Authentication</h3>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm">Enhance your account security by enabling two-factor authentication.</p>
              <p class="text-xs text-muted-foreground mt-1">
                You'll be asked for a verification code when logging in from a new device.
              </p>
            </div>
            <button 
              type="button" 
              class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
            >
              Setup 2FA
            </button>
          </div>
        </div>
        
        <div class="border-t border-border pt-4">
          <h3 class="text-md font-medium mb-3">Login Sessions</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between bg-muted/30 p-3 rounded-md">
              <div>
                <p class="text-sm font-medium">Current Session</p>
                <p class="text-xs text-muted-foreground">
                  Chrome on Windows • IP: 192.168.1.1 • Last active: Just now
                </p>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            
            <div class="flex items-center justify-between bg-muted/30 p-3 rounded-md">
              <div>
                <p class="text-sm font-medium">Mobile App</p>
                <p class="text-xs text-muted-foreground">
                  iPhone 13 • IP: 192.168.1.2 • Last active: 2 days ago
                </p>
              </div>
              <button class="text-xs text-destructive hover:underline">
                Revoke
              </button>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end space-x-2 pt-4">
          <button 
            type="button" 
            @click="resetSecuritySettings" 
            class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
    
    <!-- Invite Crew Member Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-md">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">Invite Crew Member</h2>
          
          <form @submit.prevent="sendInvitation" class="space-y-4">
            <div class="space-y-2">
              <label for="inviteEmail" class="text-sm font-medium">Email Address</label>
              <input 
                id="inviteEmail" 
                v-model="invitation.email" 
                type="email" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="crew@example.com"
                required
              />
            </div>
            
            <div class="space-y-2">
              <label for="inviteRole" class="text-sm font-medium">Role</label>
              <select 
                id="inviteRole" 
                v-model="invitation.role" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                required
              >
                <option value="Event Manager">Event Manager</option>
                <option value="Check-in Staff">Check-in Staff</option>
                <option value="Guest Relations">Guest Relations</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label for="inviteMessage" class="text-sm font-medium">Personal Message (Optional)</label>
              <textarea 
                id="inviteMessage" 
                v-model="invitation.message" 
                rows="3" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="Join our team to help manage upcoming events..."
              ></textarea>
            </div>
            
            <div class="flex justify-end space-x-2 pt-4">
              <button 
                type="button" 
                @click="showInviteModal = false" 
                class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Remove Crew Confirmation Modal -->
    <div v-if="showRemoveModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background rounded-lg shadow-lg w-full max-w-md">
        <div class="p-6">
          <h2 class="text-xl font-bold mb-2">Remove Crew Member</h2>
          <p class="text-muted-foreground mb-4">
            Are you sure you want to remove {{ crewToRemove?.name }} from your crew? They will no longer have access to your events.
          </p>
          
          <div class="flex justify-end space-x-2">
            <button 
              @click="showRemoveModal = false" 
              class="px-4 py-2 border border-border rounded-md bg-background hover:bg-muted"
            >
              Cancel
            </button>
            <button 
              @click="removeCrewMember" 
              class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Toast -->
    <div 
      v-if="showSuccessToast" 
      class="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-start max-w-md"
    >
      <CheckCircle class="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      <div>
        <p class="font-bold">Success</p>
        <p>{{ successMessage }}</p>
      </div>
      <button @click="showSuccessToast = false" class="ml-4 text-green-700">
        <X class="h-4 w-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  Upload, UserPlus, Edit, Trash2, CheckCircle, X 
} from 'lucide-vue-next';
import store from '../store';

// User role (can be 'eo_admin', 'crew_member', or 'independent_host')
const userRole = ref('eo_admin');

// Active tab
const activeTab = ref('personal');

// User information
const user = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  jobTitle: 'Event Manager',
  address: '123 Main St, Anytown, CA 12345'
});

// Company information (for EO Admin)
const company = ref({
  name: 'Acme Events',
  email: 'info@acmeevents.com',
  phone: '(555) 987-6543',
  website: 'https://acmeevents.com',
  address: '456 Business Ave, Suite 789, Anytown, CA 12345',
  description: 'Premier event management company specializing in corporate events and conferences.'
});

// Crew members (for EO Admin)
const crewMembers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Event Manager',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Check-in Staff',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Guest Relations',
    status: 'Pending'
  }
]);

// Security settings
const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

// Invitation form
const invitation = ref({
  email: '',
  role: 'Check-in Staff',
  message: ''
});

// Modal states
const showInviteModal = ref(false);
const showRemoveModal = ref(false);
const crewToRemove = ref(null);

// Toast notification
const showSuccessToast = ref(false);
const successMessage = ref('');

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Helper function to get role display name
const getRoleName = (role) => {
  const roleMap = {
    'super_admin': 'Super Admin',
    'eo_admin': 'Event Organizer Admin',
    'crew_member': 'Crew Member',
    'independent_host': 'Independent Host'
  };
  
  return roleMap[role] || role;
};

// Save personal information
const savePersonalInfo = () => {
  // In a real app, you would send this to your API
  console.log('Saving personal info:', user.value);
  
  // Show success message
  successMessage.value = 'Your personal information has been updated successfully.';
  showSuccessToast.value = true;
  
  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

// Reset personal information form
const resetPersonalInfo = () => {
  // In a real app, you would reset to the original values from the API
  user.value = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    jobTitle: 'Event Manager',
    address: '123 Main St, Anytown, CA 12345'
  };
};

// Save company information
const saveCompanyInfo = () => {
  // In a real app, you would send this to your API
  console.log('Saving company info:', company.value);
  
  // Show success message
  successMessage.value = 'Company information has been updated successfully.';
  showSuccessToast.value = true;
  
  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

// Reset company information form
const resetCompanyInfo = () => {
  // In a real app, you would reset to the original values from the API
  company.value = {
    name: 'Acme Events',
    email: 'info@acmeevents.com',
    phone: '(555) 987-6543',
    website: 'https://acmeevents.com',
    address: '456 Business Ave, Suite 789, Anytown, CA 12345',
    description: 'Premier event management company specializing in corporate events and conferences.'
  };
};

// Save security settings
const saveSecuritySettings = () => {
  // Validate passwords
  if (security.value.newPassword !== security.value.confirmPassword) {
    alert('New passwords do not match');
    return;
  }
  
  // In a real app, you would send this to your API
  console.log('Saving security settings:', security.value);
  
  // Show success message
  successMessage.value = 'Your password has been updated successfully.';
  showSuccessToast.value = true;
  
  // Reset form
  security.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  
  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

// Reset security settings form
const resetSecuritySettings = () => {
  security.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

// Send invitation to crew member
const sendInvitation = () => {
  // In a real app, you would send this to your API
  console.log('Sending invitation:', invitation.value);
  
  // Add to crew members with pending status
  crewMembers.value.push({
    id: crewMembers.value.length + 1,
    name: invitation.value.email.split('@')[0], // Placeholder name from email
    email: invitation.value.email,
    role: invitation.value.role,
    status: 'Pending'
  });
  
  // Show success message
  successMessage.value = `Invitation sent to ${invitation.value.email} successfully.`;
  showSuccessToast.value = true;
  
  // Reset form and close modal
  invitation.value = {
    email: '',
    role: 'Check-in Staff',
    message: ''
  };
  showInviteModal.value = false;
  
  // Auto-hide toast after 3 seconds
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};

// Edit crew member
const editCrewMember = (crew) => {
  // In a real app, you would open an edit modal
  console.log('Editing crew member:', crew);
  
  // For this demo, we'll just toggle their status
  const index = crewMembers.value.findIndex(c => c.id === crew.id);
  if (index !== -1) {
    crewMembers.value[index].status = crew.status === 'Active' ? 'Inactive' : 'Active';
    
    // Show success message
    successMessage.value = `${crew.name}'s status has been updated.`;
    showSuccessToast.value = true;
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }
};

// Confirm remove crew member
const confirmRemoveCrew = (crew) => {
  crewToRemove.value = crew;
  showRemoveModal.value = true;
};

// Remove crew member
const removeCrewMember = () => {
  if (crewToRemove.value) {
    // In a real app, you would send this to your API
    console.log('Removing crew member:', crewToRemove.value);
    
    // Remove from crew members array
    crewMembers.value = crewMembers.value.filter(c => c.id !== crewToRemove.value.id);
    
    // Show success message
    successMessage.value = `${crewToRemove.value.name} has been removed from your crew.`;
    showSuccessToast.value = true;
    
    // Close modal
    showRemoveModal.value = false;
    crewToRemove.value = null;
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }
};

// Load data on component mount
onMounted(async () => {
  await store.dispatch('users/fetchProfile');
  await store.dispatch('users/fetchCompany');
  user.value = store.getters['users/userProfile'];
  userRole.value = user.value.role;
  company.value = store.getters['users/userCompany'];
});
</script>
