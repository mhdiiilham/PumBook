<template>
  <div class="min-h-screen bg-background text-foreground">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import PublicLayout from './layouts/PublicLayout.vue';
import AuthenticatedLayout from './layouts/AuthenticatedLayout.vue';

const route = useRoute();
const layoutType = ref(null);

// Determine which layout to use based on the route
const layout = computed(() => {
  // If the route is in the authenticated area
  if (route.meta.requiresAuth) {
    layoutType.value = AuthenticatedLayout;
    return AuthenticatedLayout;
  }
  // Default to public layout
  layoutType.value = PublicLayout;
  return PublicLayout;
});
</script>