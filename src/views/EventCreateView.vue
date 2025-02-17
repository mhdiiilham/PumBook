<template>
  <div class="event animate__backInDown d-flex justify-content-center" style="padding-top: 2em;">
    <div class="container">
      <div class="card shadow p-4 mx-auto responsive-card">
        <h1 class="text-center">Events</h1>
        <div class="alert alert-dark" role="alert" v-if="errorOccured">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="handleCreateEvent">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input type="text" v-model="eventDetail.name" class="form-control" id="name" placeholder="Your event name">
          </div>
          <div class="mb-3">
            <label for="host" class="form-label">Host</label>
            <input type="text" v-model="eventDetail.host" class="form-control" id="host" placeholder="Who host the event?">
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Location</label>
            <input type="text" v-model="eventDetail.location" class="form-control" id="location" placeholder="Where it'll be held?">
          </div>
          <div class="mb-3">
            <div class="container text-center">
              <div class="row align-items-start">
                <div class="col">
                  <label for="start-date" class="form-label">Start Date</label>
                  <input type="date" v-model="eventDetail.startDate" class="form-control" id="start-date" placeholder="When it'll be held?">
                </div>
                <div class="col">
                  <label for="end-date" class="form-label">End Date</label>
                  <input type="date" v-model="eventDetail.endDate" class="form-control" id="end-date" placeholder="When it'll be done?">
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="whats-app-message-template" class="form-label">WhatsApp Message Template</label>
            <textarea class="form-control" id="whats-app-message-template" v-model="eventDetail.messageTemplate" rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="invitation-url" class="form-label">Digital Invitation Url (with query name parameter)</label>
            <input type="text" v-model="eventDetail.digitalInvitationURL" class="form-control" id="invitation-url" placeholder="https://wedding.muhammadilham.xyz/?name=ilham">
          </div>
          <div>
            <div class="spinner-border" role="status" v-if="isLoading">
              <span class="visually-hidden">Loading...</span>
            </div>
            <button v-else type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios.js';
import router from '@/router';

export default {
  data: function() {
    return {
      errorOccured: false,
      errorMessage: "Sorry, there was something wrong in our side.",
      isLoading: false,
      eventDetail: {
        name: null,
        location: null,
        startDate: null,
        endDate: null,
        digitalInvitationURL: null,
        host: null,
        messageTemplate: null,
      },
    };
  },
  methods: {
    async handleCreateEvent() {
      this.isLoading = true;
      const startDate = new Date(this.eventDetail.startDate).toISOString();
      const endDate = new Date(this.eventDetail.endDate).toISOString();
      try {
        const payload = {
          'name': this.eventDetail.name,
          'location': this.eventDetail.location,
          'start_date': startDate,
          'end_date': endDate,
          'digital_invitation_url': this.digitalInvitationURL,
          'host': this.eventDetail.host,
          'message_template': this.eventDetail.messageTemplate,
        };

        await apiClient.post('/events', payload, {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }})
        router.push({ path: '/events' })
      } catch ({ response }) {
        this.errorOccured = true;
        if (response.data) {
          const { code, message, data } = response.data;
          if (code === 401 && data === 'AUTH_TOKEN_EXPIRED') {
            this.$store.dispatch('handleSignOut');
          } else {
            this.errorMessage = message;
          }
        }
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 250);
      }
    },
  },
};
</script>

<style scoped>
.responsive-card {
  width: 100%;
  max-width: 90%; /* Makes it wider on larger screens */
}

@media (min-width: 768px) {
  .responsive-card {
    max-width: 700px; /* Wider card for desktop */
  }
}
</style>
