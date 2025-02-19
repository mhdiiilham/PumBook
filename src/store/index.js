import router from '@/router';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    email: null,
    role: null,
    currentPage: 'events',
    accessToken: null,
    notification: {
      message: null,
      type: null,
    },
  },
  getters: {
  },
  mutations: {
    SET_IS_LOGGED(state, payload) {
      state.isLogged = payload;
    },
    SET_LOGGED_EMAIL(state, payload) {
      state.email = payload;
    },
    SET_LOGGED_ROLE(state, payload) {
      state.role = payload;
    },
    SET_ACCESS_TOKEN(state, payload) {
      state.accessToken = payload;
    },
    SET_NOTIFICATION_MESSAGE(state, payload) {
      state.notification.message = payload;
    },
    SET_NOTIFICATION_TYPE(state, payload) {
      state.notification.type = payload;
    },
  },
  actions: {
    setNotification({ commit, _ }, payload ) {
      commit('SET_NOTIFICATION_MESSAGE', payload.message);
      commit('SET_NOTIFICATION_TYPE', payload.type);
    },
    async setCredential({ commit,  }, payload) {
      const { data } = payload.response;
      commit('SET_IS_LOGGED', true);
      commit('SET_LOGGED_EMAIL', data.email);
      commit('SET_LOGGED_ROLE', data.role);
      commit('SET_ACCESS_TOKEN', data.access_token);
    
      localStorage.setItem('credentials', JSON.stringify(data));
      localStorage.setItem('remember', payload.remember);
    },
    async loadCredential({ commit, dispatch }, payload) {
      if (localStorage.getItem('credentials')) {
        let remember = localStorage.getItem('remember');
        let data = localStorage.getItem('credentials');
        data = JSON.parse(data);
        dispatch('setCredential', {response: { data }, remember: remember });
      }
    },
    async handleSignOut({ commit, dispatch }) {
      console.log('sign out...');
      localStorage.clear();
      commit('SET_IS_LOGGED', false);
      commit('SET_LOGGED_EMAIL', null);
      commit('SET_LOGGED_ROLE', null);
      router.push({ path: '/' }).catch(()=>{});
      dispatch('setNotification', {
        message: 'We hoping to see you again, soon!',
        type: 'success'
      });
    },
  },
  modules: {
  },
});
