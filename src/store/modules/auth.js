import apiClient from '../../api/axios';
import router from '../../router';

// Initial state
const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  authLoading: false,
  authError: null,
  isDemo: false,
};

// Mutations
const mutations = {
  SET_USER(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem('token', token);
  },
  SET_REFRESH_TOKEN(state, refreshToken) {
    state.refreshToken = refreshToken;
    localStorage.setItem('refreshToken', refreshToken);
  },
  SET_AUTHENTICATED(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
    localStorage.setItem('isAuthenticated', isAuthenticated);
  },
  SET_AUTH_LOADING(state, isLoading) {
    state.authLoading = isLoading;
  },
  SET_AUTH_ERROR(state, error) {
    state.authError = error;
  },
  CLEAR_AUTH_ERROR(state) {
    state.authError = null;
  },
  CLEAR_AUTH(state) {
    state.user = null;
    state.token = null;
    state.refreshToken = null;
    state.isAuthenticated = false;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isAuthenticated');
  },
  SET_IS_DEMO(state, isDemo) {
    state.isDemp = isDemo;
  },
};

// Actions
const actions = {
  // Login action
  async login({ commit, dispatch }, credentials) {
    commit('SET_AUTH_LOADING', true);
    commit('CLEAR_AUTH_ERROR');
    
    try {
      // Real API call for production
      const response = await apiClient.post('/auth', credentials);
      const { access_token, user } = response.data.data;

      commit('SET_USER', user);
      commit('SET_TOKEN', access_token);
      commit('SET_AUTHENTICATED', true);
      
      router.push('/dashboard');
      return response.data;
    } catch (error) {
      commit('SET_AUTH_ERROR', error.response?.data?.message || 'Login failed');
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    } finally {
      commit('SET_AUTH_LOADING', false);
    }
  },
  
  // Register action
  async register({ commit }, userData) {
    commit('SET_AUTH_LOADING', true);
    commit('CLEAR_AUTH_ERROR');
    
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      commit('SET_AUTH_ERROR', error.response?.data?.message || 'Registration failed');
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    } finally {
      commit('SET_AUTH_LOADING', false);
    }
  },
  
  // Logout action
  logout({ commit }) {
    commit('CLEAR_AUTH');
    router.push('/login');
  },
  
  // Refresh token action
  async refreshToken({ commit, state }) {
    if (!state.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await apiClient.post('/auth/refresh-token', {
        refreshToken: state.refreshToken
      });
      
      const { token, refreshToken } = response.data;
      
      commit('SET_TOKEN', token);
      commit('SET_REFRESH_TOKEN', refreshToken);
      
      return response.data;
    } catch (error) {
      commit('CLEAR_AUTH');
      throw error;
    }
  },
  
  // Check auth status
  checkAuth({ commit, state }) {
    const isAuthenticated = !!state.token && !!state.user;
    commit('SET_AUTHENTICATED', isAuthenticated);
    return isAuthenticated;
  },
  
  // Mock login for testing
  mockLogin({ commit }) {
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'eo_admin'
    };
    
    const mockToken = 'mock-jwt-token';
    const mockRefreshToken = 'mock-refresh-token';
    
    commit('SET_USER', mockUser);
    commit('SET_TOKEN', mockToken);
    commit('SET_REFRESH_TOKEN', mockRefreshToken);
    commit('SET_AUTHENTICATED', true);
    commit('SET_IS_DEMO', true);
    
    return { success: true };
  }
};

// Getters
const getters = {
  isAuthenticated: state => state.isAuthenticated,
  currentUser: state => state.user,
  userRole: state => state.user?.role || null,
  authLoading: state => state.authLoading,
  authError: state => state.authError
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
