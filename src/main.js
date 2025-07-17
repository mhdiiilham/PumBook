import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import './assets/tailwind.css';

// Create app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(store)

// Mount app
app.mount("#app")

// Initialize dark mode from localStorage
store.dispatch("initDarkMode")

// For development/testing: Mock login if needed
if (process.env.NODE_ENV === "development") {
  // Uncomment the line below to automatically log in for testing
  // store.dispatch('auth/mockLogin');
}
