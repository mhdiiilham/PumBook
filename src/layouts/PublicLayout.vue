<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation Bar -->
    <header class="border-b border-border">
      <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <img src="/logo.svg" alt="PumBook Logo" class="h-8 w-8" />
            <router-link to="/" class="text-xl font-bold text-primary">PumBook</router-link>
          </div>
          
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/" class="text-sm font-medium hover:text-primary">Home</router-link>
            <router-link to="/about" class="text-sm font-medium hover:text-primary">About</router-link>
            <router-link to="/login" class="text-sm font-medium hover:text-primary">Login</router-link>
            <router-link to="/signup" class="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90">Sign Up</router-link>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden">
            <Menu v-if="!isMenuOpen" class="h-6 w-6" />
            <X v-else class="h-6 w-6" />
          </button>
        </nav>
        
        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="md:hidden py-4 space-y-4">
          <router-link to="/" class="block text-sm font-medium hover:text-primary">Home</router-link>
          <router-link to="/about" class="block text-sm font-medium hover:text-primary">About</router-link>
          <router-link to="/login" class="block text-sm font-medium hover:text-primary">Login</router-link>
          <router-link to="/signup" class="block text-sm font-medium hover:text-primary">Sign Up</router-link>
        </div>
      </div>
    </header>
    
    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>
    
    <!-- Footer -->
    <footer class="border-t border-border bg-muted/50">
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="font-bold mb-4">PumBook</h3>
            <p class="text-sm text-muted-foreground">
              Simplifying guest management for event organizers.
            </p>
          </div>
          
          <div>
            <h3 class="font-bold mb-4">Links</h3>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/" class="hover:text-primary">Home</router-link></li>
              <li><router-link to="/about" class="hover:text-primary">About</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/privacy" class="hover:text-primary">Privacy Policy</router-link></li>
              <li><router-link to="/terms" class="hover:text-primary">Terms & Conditions</router-link></li>
            </ul>
          </div>
          
          <div>
            <h3 class="font-bold mb-4">Contact</h3>
            <p class="text-sm text-muted-foreground">
              Need help? <a href="mailto:support@pumbook.com" class="text-primary hover:underline">support@pumbook.com</a>
            </p>
          </div>
        </div>
        
        <div class="mt-8 pt-4 border-t border-border text-center text-sm text-muted-foreground">
          &copy; {{ new Date().getFullYear() }} PumBook. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Menu, X } from 'lucide-vue-next';

const isMenuOpen = ref(false);
</script>