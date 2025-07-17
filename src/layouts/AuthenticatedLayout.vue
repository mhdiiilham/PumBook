<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 overflow-y-auto z-10 transition-all duration-300 ease-in-out border-r border-border bg-card"
      :class="[
        sidebarCollapsed ? 'w-16' : 'w-64',
        'md:block',
        { 'hidden': mobileMenuHidden }
      ]"
    >
      <div class="p-4 border-b border-border flex items-center justify-between">
        <div class="flex items-center overflow-hidden w-full">
          <div 
            @click="toggleSidebar" 
            class="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0 cursor-pointer"
            :class="{ 'mx-auto': sidebarCollapsed }"
          >
            P
          </div>
          <h1 class="ml-2 text-xl font-bold transition-opacity duration-300 whitespace-nowrap" :class="{ 'opacity-0 w-0': sidebarCollapsed }">PumBook</h1>
          <button 
            v-if="!sidebarCollapsed"
            @click="toggleSidebar" 
            class="p-1 rounded-md hover:bg-muted text-muted-foreground ml-auto hidden md:flex md:items-center md:justify-center flex-shrink-0"
          >
            <ChevronLeft class="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <nav class="p-4">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/dashboard" 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                $route.path === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
            >
              <LayoutDashboard class="h-5 w-5 flex-shrink-0" />
              <span class="ml-2 transition-opacity duration-300 whitespace-nowrap" :class="{ 'opacity-0 w-0 hidden': sidebarCollapsed }">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/events" 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                $route.path === '/events' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
            >
              <Calendar class="h-5 w-5 flex-shrink-0" />
              <span class="ml-2 transition-opacity duration-300 whitespace-nowrap" :class="{ 'opacity-0 w-0 hidden': sidebarCollapsed }">Events</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/check-in" 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                $route.path === '/check-in' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
            >
              <QrCode class="h-5 w-5 flex-shrink-0" />
              <span class="ml-2 transition-opacity duration-300 whitespace-nowrap" :class="{ 'opacity-0 w-0 hidden': sidebarCollapsed }">Check-in</span>
            </router-link>
          </li>
          <li>
            <router-link 
              to="/profile" 
              class="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="[
                $route.path === '/profile' ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted',
                sidebarCollapsed ? 'justify-center' : ''
              ]"
            >
              <User class="h-5 w-5 flex-shrink-0" />
              <span class="ml-2 transition-opacity duration-300 whitespace-nowrap" :class="{ 'opacity-0 w-0 hidden': sidebarCollapsed }">Profile</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    
    <!-- Main Content -->
    <div 
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'"
    >
      <!-- Header -->
      <header class="h-16 border-b border-border bg-card flex items-center justify-between px-6">
        <div class="flex items-center">
          <!-- Mobile menu toggle -->
          <button 
            @click="toggleMobileMenu" 
            class="p-2 rounded-md hover:bg-muted md:hidden"
          >
            <Menu class="h-5 w-5" />
          </button>
        </div>
        
        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="p-2 rounded-md hover:bg-muted">
            <Bell class="h-5 w-5" />
          </button>
          
          <!-- User Menu -->
          <div class="relative" ref="userMenuRef">
            <button 
              @click="toggleUserMenu" 
              class="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
            >
              <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                {{ userInitials }}
              </div>
              <ChevronDown class="h-4 w-4" />
            </button>
            
            <!-- Dropdown Menu -->
            <div 
              v-if="userMenuOpen" 
              class="absolute right-0 mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-10"
            >
              <router-link 
                to="/profile" 
                class="block px-4 py-2 text-sm hover:bg-muted"
              >
                Profile
              </router-link>
              <button 
                @click="logout" 
                class="block w-full text-left px-4 py-2 text-sm hover:bg-muted"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Main Content Area -->
      <main class="p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { 
  LayoutDashboard, Calendar, QrCode, User, Bell, ChevronDown, 
  ChevronLeft, ChevronRight, Menu
} from 'lucide-vue-next';

// Sidebar state
const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'true');
const mobileMenuHidden = ref(true);

// User menu state
const userMenuOpen = ref(false);
const userMenuRef = ref(null);

// Get user from store
const store = useStore();
const router = useRouter();
const user = computed(() => store.getters['auth/currentUser']);

// Get user initials
const userInitials = computed(() => {
  if (!user.value || !user.value.name) return 'U';
  
  return user.value.name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
});

// Toggle sidebar
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value;
  localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value);
};

// Toggle mobile menu
const toggleMobileMenu = () => {
  mobileMenuHidden.value = !mobileMenuHidden.value;
};

// Toggle user menu
const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    userMenuOpen.value = false;
  }
};

// Close mobile menu when route changes
watch(() => router.currentRoute.value, () => {
  mobileMenuHidden.value = true;
});

// Logout user
const logout = () => {
  store.dispatch('auth/logout');
  router.push('/login');
};

// Add and remove event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Add any additional styles here if needed */
.w-0 {
  width: 0;
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style>
