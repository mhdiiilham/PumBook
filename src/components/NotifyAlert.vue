<template>
  <Transition name="notify-fade">
    <div v-if="modelValue" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div 
        class="bg-background rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        :class="[maxWidth]"
      >
        <!-- Header -->
        <div 
          class="px-4 py-3 flex justify-between items-center border-b border-border"
          :class="{
            'bg-red-50 text-red-900': type === 'error',
            'bg-green-50 text-green-900': type === 'success',
            'bg-amber-50 text-amber-900': type === 'warning',
            'bg-blue-50 text-blue-900': type === 'info',
          }"
        >
          <h3 class="text-lg font-semibold flex items-center">
            <component 
              :is="icon" 
              v-if="icon" 
              class="h-5 w-5 mr-2" 
            />
            {{ title }}
          </h3>
          <button 
            @click="close" 
            class="hover:opacity-70"
            aria-label="Close"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-4 sm:p-6">
          <div class="text-sm mb-6" v-if="$slots.default">
            <slot></slot>
          </div>
          <div class="text-sm mb-6" v-else>
            {{ message }}
          </div>
          
          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <button 
              v-if="showConfirm" 
              @click="confirm" 
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              {{ confirmText }}
            </button>
            <button 
              @click="close" 
              class="px-4 py-2 border border-border rounded-md hover:bg-muted"
            >
              {{ cancelText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-vue-next';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Notification'
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
  },
  showConfirm: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: 'Confirm'
  },
  cancelText: {
    type: String,
    default: 'OK'
  },
  maxWidth: {
    type: String,
    default: 'max-w-md'
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return CheckCircle;
    case 'error':
      return AlertCircle;
    case 'warning':
      return AlertTriangle;
    case 'info':
      return Info;
    default:
      return null;
  }
});

const close = () => {
  emit('update:modelValue', false);
  emit('cancel');
};

const confirm = () => {
  emit('update:modelValue', false);
  emit('confirm');
};
</script>

<style scoped>
.notify-fade-enter-active,
.notify-fade-leave-active {
  transition: opacity 0.2s ease;
}

.notify-fade-enter-from,
.notify-fade-leave-to {
  opacity: 0;
}
</style>
