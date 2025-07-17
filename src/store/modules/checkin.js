import apiClient from '../../api/axios';

// Mock data for development
const mockGuests = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '(555) 123-4567', checkedIn: false, vip: false, barcode: 'GUEST-001' },
  { id: 2, name: 'Emily Johnson', email: 'emily.j@example.com', phone: '(555) 234-5678', checkedIn: false, vip: true, barcode: 'GUEST-002' },
  { id: 3, name: 'Michael Brown', email: 'michael.b@example.com', phone: '(555) 345-6789', checkedIn: false, vip: false, barcode: 'GUEST-003' },
  { id: 4, name: 'Sarah Davis', email: 'sarah.d@example.com', phone: '(555) 456-7890', checkedIn: false, vip: false, barcode: 'GUEST-004' },
  { id: 5, name: 'David Wilson', email: 'david.w@example.com', phone: '(555) 567-8901', checkedIn: false, vip: true, barcode: 'GUEST-005' },
  { id: 6, name: 'Jennifer Lee', email: 'jennifer.l@example.com', phone: '(555) 678-9012', checkedIn: false, vip: true, barcode: 'GUEST-006' },
  { id: 7, name: 'Robert Taylor', email: 'robert.t@example.com', phone: '(555) 789-0123', checkedIn: false, vip: true, barcode: 'GUEST-007' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa.a@example.com', phone: '(555) 890-1234', checkedIn: false, vip: false, barcode: 'GUEST-008' }
];

// Initial state
const state = {
  selectedEventId: null,
  guests: [],
  checkInLogs: [],
  recentScans: [],
  isScanning: false,
  checkInLoading: false,
  checkInError: null
};

// Mutations
const mutations = {
  SET_SELECTED_EVENT(state, eventId) {
    state.selectedEventId = eventId;
  },
  SET_GUESTS(state, guests) {
    state.guests = guests;
  },
  SET_CHECK_IN_LOGS(state, logs) {
    state.checkInLogs = logs;
  },
  ADD_CHECK_IN_LOG(state, log) {
    state.checkInLogs.unshift(log);
  },
  REMOVE_CHECK_IN_LOG(state, guestId) {
    state.checkInLogs = state.checkInLogs.filter(log => log.guestId !== guestId);
  },
  UPDATE_GUEST_CHECK_IN(state, { barcode, checkedIn }) {
    const guest = state.guests.find(g => g.barcode === barcode);
    if (guest) {
      guest.checkedIn = checkedIn;
    }
  },
  ADD_SCAN(state, scan) {
    state.recentScans.unshift(scan);
  },
  SET_SCANNING(state, isScanning) {
    state.isScanning = isScanning;
  },
  SET_CHECK_IN_LOADING(state, isLoading) {
    state.checkInLoading = isLoading;
  },
  SET_CHECK_IN_ERROR(state, error) {
    state.checkInError = error;
  },
  CLEAR_CHECK_IN_ERROR(state) {
    state.checkInError = null;
  },
  RESET_CHECK_IN_STATE(state) {
    state.guests = [];
    state.checkInLogs = [];
    state.recentScans = [];
    state.isScanning = false;
  }
};

// Actions
const actions = {
  // Select event for check-in
  selectEvent({ commit, dispatch }, eventId) {
    commit('SET_SELECTED_EVENT', eventId);
    commit('RESET_CHECK_IN_STATE');
    
    if (eventId) {
      dispatch('fetchGuests', eventId);
    }
  },
  
  // Fetch guests for an event
  async fetchGuests({ commit }, eventId) {
    commit('SET_CHECK_IN_LOADING', true);
    commit('CLEAR_CHECK_IN_ERROR');
    
    try {
      // Real API call for production
      const response = await apiClient.get(`/events/${eventId}/guests`);
      commit('SET_GUESTS', response.data.data);
      return response.data;
    } catch (error) {
      commit('SET_CHECK_IN_ERROR', error.response?.data?.message || 'Failed to fetch guests');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch guests' };
    } finally {
      commit('SET_CHECK_IN_LOADING', false);
    }
  },
  
  // Check in a guest
  async checkInGuest({ commit, state }, payload) {
    commit('SET_CHECK_IN_LOADING', true);
    commit('CLEAR_CHECK_IN_ERROR');
    
    try {
      const guest = state.guests.find(g => g.barcode === payload.barcode);
      if (!guest) {
        throw new Error('Guest not found');
      }
      
      // Real API call for production
      const response = await apiClient.post(`/events/${state.selectedEventId}/guests/arrived?barcode_id=${payload.barcode}&is_arrived=1`);
      
      commit('UPDATE_GUEST_CHECK_IN', { barcode: payload.barcode, checkedIn: true });
      commit('ADD_CHECK_IN_LOG', response.data);
      return response.data.data;
    } catch (error) {
      commit('SET_CHECK_IN_ERROR', error.response?.data?.message || 'Failed to check in guest');
      return { success: false, error: error.response?.data?.message || 'Failed to check in guest' };
    } finally {
      commit('SET_CHECK_IN_LOADING', false);
    }
  },
  
  // Undo check-in for a guest
  async undoCheckIn({ commit, state }, guestId) {
    commit('SET_CHECK_IN_LOADING', true);
    commit('CLEAR_CHECK_IN_ERROR');
    
    try {
      const guest = state.guests.find(g => g.id === guestId);
      if (!guest) {
        throw new Error('Guest not found');
      }
      
      // For development/testing, update mock data
      if (process.env.NODE_ENV === 'development') {
        // Update guest check-in status
        commit('UPDATE_GUEST_CHECK_IN', { guestId, checkedIn: false });
        
        // Remove from check-in logs
        commit('REMOVE_CHECK_IN_LOG', guestId);
        return { success: true };
      }
      
      // Real API call for production
      await apiClient.delete(`/events/${state.selectedEventId}/check-in/${guestId}`);
      
      commit('UPDATE_GUEST_CHECK_IN', { guestId, checkedIn: false });
      commit('REMOVE_CHECK_IN_LOG', guestId);
      return { success: true };
    } catch (error) {
      commit('SET_CHECK_IN_ERROR', error.response?.data?.message || 'Failed to undo check-in');
      return { success: false, error: error.response?.data?.message || 'Failed to undo check-in' };
    } finally {
      commit('SET_CHECK_IN_LOADING', false);
    }
  },
  
  // Add a barcode scan
  addScan({ commit }, scan) {
    commit('ADD_SCAN', scan);
  },

  // Add a recent scan
  addRecentScan({ commit }, scan) {
    commit("ADD_SCAN", scan)
  },
  
  // Set scanning state
  setScanning({ commit }, isScanning) {
    commit('SET_SCANNING', isScanning);
  }
};

// Getters
const getters = {
  selectedEventId: state => state.selectedEventId,
  allGuests: state => state.guests,
  checkedInGuests: state => state.guests.filter(g => g.checkedIn),
  notCheckedInGuests: state => state.guests.filter(g => !g.checkedIn),
  checkInLogs: state => state.checkInLogs,
  recentScans: state => state.recentScans,
  isScanning: state => state.isScanning,
  checkInLoading: state => state.checkInLoading,
  checkInError: state => state.checkInError
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
