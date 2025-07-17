import apiClient from '../../api/axios';

// Mock data for development
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(555) 123-4567',
  jobTitle: 'Event Manager',
  address: '123 Main St, Anytown, CA 12345',
  role: 'eo_admin'
};

const mockCompany = {
  id: 1,
  name: 'Acme Events',
  email: 'info@acmeevents.com',
  phone: '(555) 987-6543',
  website: 'https://acmeevents.com',
  address: '456 Business Ave, Suite 789, Anytown, CA 12345',
  description: 'Premier event management company specializing in corporate events and conferences.'
};

const mockCrewMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Event Manager',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    role: 'Check-in Staff',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'Guest Relations',
    status: 'Pending'
  }
];

// Initial state
const state = {
  profile: null,
  company: null,
  crewMembers: [],
  usersLoading: false,
  usersError: null
};

// Mutations
const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile;
  },
  SET_COMPANY(state, company) {
    state.company = company;
  },
  SET_CREW_MEMBERS(state, crewMembers) {
    state.crewMembers = crewMembers;
  },
  ADD_CREW_MEMBER(state, crewMember) {
    state.crewMembers.push(crewMember);
  },
  UPDATE_CREW_MEMBER(state, updatedCrewMember) {
    const index = state.crewMembers.findIndex(c => c.id === updatedCrewMember.id);
    if (index !== -1) {
      state.crewMembers.splice(index, 1, updatedCrewMember);
    }
  },
  REMOVE_CREW_MEMBER(state, crewMemberId) {
    state.crewMembers = state.crewMembers.filter(c => c.id !== crewMemberId);
  },
  SET_USERS_LOADING(state, isLoading) {
    state.usersLoading = isLoading;
  },
  SET_USERS_ERROR(state, error) {
    state.usersError = error;
  },
  CLEAR_USERS_ERROR(state) {
    state.usersError = null;
  }
};

// Actions
const actions = {
  // Fetch user profile
  async fetchProfile({ commit }) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      const response = await apiClient.get('/auth/profile');
      const { data: profile } = response.data;
      commit('SET_PROFILE', profile);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to fetch profile');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch profile' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Update user profile
  async updateProfile({ commit }, profileData) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, update mock data
      if (process.env.NODE_ENV === 'development') {
        const updatedProfile = { ...mockUser, ...profileData };
        commit('SET_PROFILE', updatedProfile);
        return { success: true, data: updatedProfile };
      }
      
      // Real API call for production
      const response = await apiClient.put('/users/profile', profileData);
      commit('SET_PROFILE', response.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to update profile');
      return { success: false, error: error.response?.data?.message || 'Failed to update profile' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Fetch company info
  async fetchCompany({ commit }) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // Real API call for production
      const response = await apiClient.get('/auth/companies');
      commit('SET_COMPANY', response.data.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to fetch company');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch company' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Update company info
  async updateCompany({ commit }, companyData) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, update mock data
      if (process.env.NODE_ENV === 'development') {
        const updatedCompany = { ...mockCompany, ...companyData };
        commit('SET_COMPANY', updatedCompany);
        return { success: true, data: updatedCompany };
      }
      
      // Real API call for production
      const response = await apiClient.put('/companies/current', companyData);
      commit('SET_COMPANY', response.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to update company');
      return { success: false, error: error.response?.data?.message || 'Failed to update company' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Fetch crew members
  async fetchCrewMembers({ commit }) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, use mock data
      if (process.env.NODE_ENV === 'development') {
        commit('SET_CREW_MEMBERS', mockCrewMembers);
        return { success: true, data: mockCrewMembers };
      }
      
      // Real API call for production
      const response = await apiClient.get('/users/crew');
      commit('SET_CREW_MEMBERS', response.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to fetch crew members');
      return { success: false, error: error.response?.data?.message || 'Failed to fetch crew members' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Invite crew member
  async inviteCrewMember({ commit }, inviteData) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, create mock crew member
      if (process.env.NODE_ENV === 'development') {
        const newCrewMember = {
          id: mockCrewMembers.length + 1,
          name: inviteData.email.split('@')[0], // Placeholder name from email
          email: inviteData.email,
          role: inviteData.role,
          status: 'Pending'
        };
        
        commit('ADD_CREW_MEMBER', newCrewMember);
        return { success: true, data: newCrewMember };
      }
      
      // Real API call for production
      const response = await apiClient.post('/users/invite', inviteData);
      commit('ADD_CREW_MEMBER', response.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to invite crew member');
      return { success: false, error: error.response?.data?.message || 'Failed to invite crew member' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Update crew member
  async updateCrewMember({ commit }, { crewMemberId, crewMemberData }) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, update mock crew member
      if (process.env.NODE_ENV === 'development') {
        const crewMemberIndex = mockCrewMembers.findIndex(c => c.id === crewMemberId);
        if (crewMemberIndex === -1) {
          throw new Error('Crew member not found');
        }
        
        const updatedCrewMember = {
          ...mockCrewMembers[crewMemberIndex],
          ...crewMemberData,
          id: crewMemberId
        };
        
        commit('UPDATE_CREW_MEMBER', updatedCrewMember);
        return { success: true, data: updatedCrewMember };
      }
      
      // Real API call for production
      const response = await apiClient.put(`/users/crew/${crewMemberId}`, crewMemberData);
      commit('UPDATE_CREW_MEMBER', response.data);
      return response.data;
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to update crew member');
      return { success: false, error: error.response?.data?.message || 'Failed to update crew member' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  },
  
  // Remove crew member
  async removeCrewMember({ commit }, crewMemberId) {
    commit('SET_USERS_LOADING', true);
    commit('CLEAR_USERS_ERROR');
    
    try {
      // For development/testing, remove mock crew member
      if (process.env.NODE_ENV === 'development') {
        const crewMemberIndex = mockCrewMembers.findIndex(c => c.id === crewMemberId);
        if (crewMemberIndex === -1) {
          throw new Error('Crew member not found');
        }
        
        commit('REMOVE_CREW_MEMBER', crewMemberId);
        return { success: true };
      }
      
      // Real API call for production
      await apiClient.delete(`/users/crew/${crewMemberId}`);
      commit('REMOVE_CREW_MEMBER', crewMemberId);
      return { success: true };
    } catch (error) {
      commit('SET_USERS_ERROR', error.response?.data?.message || 'Failed to remove crew member');
      return { success: false, error: error.response?.data?.message || 'Failed to remove crew member' };
    } finally {
      commit('SET_USERS_LOADING', false);
    }
  }
};

// Getters
const getters = {
  userProfile: state => state.profile,
  userCompany: state => state.company,
  allCrewMembers: state => state.crewMembers,
  activeCrewMembers: state => state.crewMembers.filter(c => c.status === 'Active'),
  pendingCrewMembers: state => state.crewMembers.filter(c => c.status === 'Pending'),
  usersLoading: state => state.usersLoading,
  usersError: state => state.usersError
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
