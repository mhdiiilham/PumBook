import { createStore } from 'vuex';
import auth from './modules/auth';
import events from './modules/events';
import users from './modules/users';
import checkIn from './modules/checkin';

// Create store
const store = createStore({
  modules: {
    auth,
    events,
    users,
    checkIn
  },
  // Global state
  state: {
    appLoading: false,
    appError: null,
    darkMode: false
  },
  // Mutations to change state
  mutations: {
    SET_LOADING(state, isLoading) {
      state.appLoading = isLoading;
    },
    SET_ERROR(state, error) {
      state.appError = error;
    },
    CLEAR_ERROR(state) {
      state.appError = null;
    },
    TOGGLE_DARK_MODE(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    SET_DARK_MODE(state, isDark) {
      state.darkMode = isDark;
      localStorage.setItem('darkMode', state.darkMode);
    }
  },
  // Actions to perform async operations
  actions: {
    setLoading({ commit }, isLoading) {
      commit('SET_LOADING', isLoading);
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error);
    },
    clearError({ commit }) {
      commit('CLEAR_ERROR');
    },
    toggleDarkMode({ commit }) {
      commit('TOGGLE_DARK_MODE');
    },
    initDarkMode({ commit }) {
      const darkMode = localStorage.getItem('darkMode') === 'true';
      commit('SET_DARK_MODE', darkMode);
    }
  },
  // Getters to access state
  getters: {
    isLoading: state => state.appLoading,
    hasError: state => !!state.appError,
    error: state => state.appError,
    isDarkMode: state => state.darkMode
  }
});

export default store;
