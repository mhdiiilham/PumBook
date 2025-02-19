<template>
  <div v-if="visible" class="notification" :class="type">
    {{ message }}
  </div>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: "success", // success, error, warning, info
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    message(newMessage) {
      if (newMessage) {
        this.visible = true;
        setTimeout(() => {
          this.visible = false;
        }, 3000); // Auto-hide after 3 seconds
      }
    },
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: fade-in 0.3s ease-in-out;
}
.success {
  background: #28a745;
}
.error {
  background: #dc3545;
}
.warning {
  background: #ffc107;
  color: black;
}
.info {
  background: #17a2b8;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
