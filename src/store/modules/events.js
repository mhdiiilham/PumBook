import apiClient from '../../api/axios';

// Mock data for development
const mockEvents = [
  {
    id: 1,
    name: 'The Wedding of Oca & Ilham',
    type: 'Wedding',
    startDate: new Date('2025-08-02T09:00:00'),
    endDate: new Date('2025-08-02T18:00:00'),
    location: 'The Kalyana Resort, Sleman. DI Yogyakarta.',
    description: 'The wedding of Oca & Ilham.',
    guestCount: 200,
    checkedInCount: 0,
    status: 'Upcoming'
  },
  {
    id: 2,
    name: 'Product Launch: XYZ',
    type: 'Launch Event',
    startDate: new Date('2025-05-28T14:00:00'),
    endDate: new Date('2025-05-28T20:00:00'),
    location: 'Grand Hotel, San Francisco',
    description: 'Exclusive product launch event for our new XYZ product line.',
    guestCount: 120,
    checkedInCount: 0,
    status: 'Upcoming'
  },
  {
    id: 3,
    name: 'Company Retreat 2025',
    type: 'Internal Event',
    startDate: new Date('2025-07-10T08:00:00'),
    endDate: new Date('2025-07-12T17:00:00'),
    location: 'Mountain Resort, Colorado',
    description: 'Annual company retreat for team building and strategic planning.',
    guestCount: 85,
    checkedInCount: 0,
    status: 'Upcoming'
  },
  {
    id: 4,
    name: 'Charity Gala Dinner',
    type: 'Fundraiser',
    startDate: new Date('2025-04-20T18:00:00'),
    endDate: new Date('2025-04-20T23:00:00'),
    location: 'Luxury Hotel, Miami',
    description: 'Annual fundraising gala to support local education initiatives.',
    guestCount: 200,
    checkedInCount: 178,
    status: 'Past'
  },
  {
    id: 5,
    name: 'Marketing Workshop',
    type: 'Workshop',
    startDate: new Date('2025-05-05T10:00:00'),
    endDate: new Date('2025-05-05T16:00:00'),
    location: 'Business Center, Chicago',
    description: 'Intensive marketing workshop for professionals.',
    guestCount: 50,
    checkedInCount: 42,
    status: 'Past'
  },
];

// Initial state
const state = {
  events: [],
  currentEvent: null,
  eventsLoading: false,
  eventsError: null
};

// Mutations
const mutations = {
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_CURRENT_EVENT(state, event) {
    state.currentEvent = event;
  },
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  UPDATE_EVENT(state, updatedEvent) {
    const index = state.events.findIndex(e => e.id === updatedEvent.id);
    if (index !== -1) {
      state.events.splice(index, 1, updatedEvent);
    }
  },
  DELETE_EVENT(state, eventId) {
    state.events = state.events.filter(e => e.id !== eventId);
  },
  SET_EVENTS_LOADING(state, isLoading) {
    state.eventsLoading = isLoading;
  },
  SET_EVENTS_ERROR(state, error) {
    state.eventsError = error;
  },
  CLEAR_EVENTS_ERROR(state) {
    state.eventsError = null;
  }
};

// Actions
const actions = {
  // Fetch all events
  async fetchEvents({ commit }) {
    commit('SET_EVENTS_LOADING', true);
    commit('CLEAR_EVENTS_ERROR');
    
    try {
      // Real API call for production
      const { data } = await apiClient.get('/events');
      const pagination = data.data;
      const { records } = pagination
      commit('SET_EVENTS', records);
      return response.data;
    } catch (error) {
      commit('SET_EVENTS_ERROR', error.response?.data?.message || 'Failed to fetch events');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch events' };
    } finally {
      commit('SET_EVENTS_LOADING', false);
    }
  },
  
  // Fetch single event
  async fetchEvent({ commit }, eventId) {
    commit('SET_EVENTS_LOADING', true);
    commit('CLEAR_EVENTS_ERROR');
    
    try {
      // Real API call for production
      const response = await apiClient.get(`/events/${eventId}`);
      commit('SET_CURRENT_EVENT', response.data.data);
      return response.data;
    } catch (error) {
      commit('SET_EVENTS_ERROR', error.response?.data?.message || 'Failed to fetch event');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch event' };
    } finally {
      commit('SET_EVENTS_LOADING', false);
    }
  },
  
  // Create new event
  async createEvent({ commit }, eventData) {
    commit('SET_EVENTS_LOADING', true);
    commit('CLEAR_EVENTS_ERROR');
    
    try {
      // Real API call for production
      const response = await apiClient.post('/events', eventData);
      return response.data;
    } catch (error) {
      commit('SET_EVENTS_ERROainR', error.response?.data?.message || 'Failed to create event');
      return { success: false, error: error.response?.data?.message || 'Failed to create event' };
    } finally {
      commit('SET_EVENTS_LOADING', false);
    }
  },
  
  // Update event
  async updateEvent({ commit }, { eventId, eventData }) {
    commit('SET_EVENTS_LOADING', true);
    commit('CLEAR_EVENTS_ERROR');
    
    try {
      // For development/testing, update mock event
      if (process.env.NODE_ENV === 'development') {
        const eventIndex = mockEvents.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
          throw new Error('Event not found');
        }
        
        const updatedEvent = {
          ...mockEvents[eventIndex],
          ...eventData,
          id: eventId
        };
        
        commit('UPDATE_EVENT', updatedEvent);
        return { success: true, data: updatedEvent };
      }
      
      // Real API call for production
      const response = await apiClient.put(`/events/${eventId}`, eventData);
      commit('UPDATE_EVENT', response.data);
      return response.data;
    } catch (error) {
      commit('SET_EVENTS_ERROR', error.response?.data?.message || 'Failed to update event');
      return { success: false, error: error.response?.data?.message || 'Failed to update event' };
    } finally {
      commit('SET_EVENTS_LOADING', false);
    }
  },
  
  // Delete event
  async deleteEvent({ commit }, eventId) {
    commit('SET_EVENTS_LOADING', true);
    commit('CLEAR_EVENTS_ERROR');
    
    try {
      // For development/testing, delete mock event
      if (process.env.NODE_ENV === 'development') {
        const eventIndex = mockEvents.findIndex(e => e.id === eventId);
        if (eventIndex === -1) {
          throw new Error('Event not found');
        }
        
        commit('DELETE_EVENT', eventId);
        return { success: true };
      }
      
      // Real API call for production
      await apiClient.delete(`/events/${eventId}`);
      commit('DELETE_EVENT', eventId);
      return { success: true };
    } catch (error) {
      commit('SET_EVENTS_ERROR', error.response?.data?.message || 'Failed to delete event');
      return { success: false, error: error.response?.data?.message || 'Failed to delete event' };
    } finally {
      commit('SET_EVENTS_LOADING', false);
    }
  }
};

// Getters
const getters = {
  allEvents: state => state.events,
  upcomingEvents: state => state.events.filter(e => e.status === 'Upcoming'),
  pastEvents: state => state.events.filter(e => e.status === 'Past'),
  currentEvent: state => state.currentEvent,
  eventsLoading: state => state.eventsLoading,
  eventsError: state => state.eventsError
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
