<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold">Forgot Password</h1>
        <p class="text-muted-foreground mt-2">Enter your email to reset your password</p>
      </div>
      
      <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
        <div v-if="!emailSent">
          <form @submit.prevent="handleResetRequest" class="space-y-4">
            <div class="space-y-2">
              <label for="email" class="text-sm font-medium">Email</label>
              <input 
                id="email" 
                v-model="email" 
                type="email" 
                class="w-full px-3 py-2 border border-border rounded-md bg-background"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <button 
              type="submit" 
              class="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              :disabled="isLoading || !email"
            >
              <span v-if="isLoading">
                <Loader2 class="h-4 w-4 animate-spin inline mr-2" />
                Sending...
              </span>
              <span v-else>Reset Password</span>
            </button>
          </form>
        </div>
        
        <div v-else class="text-center py-4">
          <CheckCircle class="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 class="text-xl font-bold mb-2">Check Your Email</h3>
          <p class="text-muted-foreground mb-4">
            We've sent a password reset link to <strong>{{ email }}</strong>. 
            Please check your inbox and follow the instructions to reset your password.
          </p>
          <p class="text-sm text-muted-foreground">
            Didn't receive the email? Check your spam folder or 
            <button 
              @click="handleResetRequest" 
              class="text-primary hover:underline"
              :disabled="isLoading"
            >
              try again
            </button>
          </p>
        </div>
      </div>
      
      <div class="text-center mt-6">
        <p class="text-sm text-muted-foreground">
          Remember your password?
          <router-link to="/login" class="text-primary hover:underline">
            Back to login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Loader2, CheckCircle } from 'lucide-vue-next';

const email = ref('');
const isLoading = ref(false);
const emailSent = ref(false);

const handleResetRequest = async () => {
  if (!email.value) return;
  
  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    emailSent.value = true;
  } catch (error) {
    console.error('Password reset request failed:', error);
    // Handle error (show error message, etc.)
  } finally {
    isLoading.value = false;
  }
};
</script>