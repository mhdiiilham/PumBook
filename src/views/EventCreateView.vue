<template>
  <div class="event animate__backInDown d-flex justify-content-center" style="padding-top: 2em;">
    <div class="container">
      <div class="card shadow p-4 mx-auto responsive-card">
        <h1 class="text-center">Plan your next event!</h1>
        <div class="alert alert-dark" role="alert" v-if="errorOccured">
          {{ errorMessage }}
        </div>
        <form @submit.prevent="handleCreateEvent">
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" v-model="eventDetail.name" class="form-control" id="name" placeholder="Your event name" required>
                  <div class="invalid-feedback">
                    Please provide the name of your event.
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col" id="host">
                <div class="mb-3">
                  <label for="host" class="form-label">Host</label>
                  <input type="text" v-model="eventDetail.host" class="form-control" id="host" placeholder="Who host the event?" required>
                </div>
              </div>
              <div class="col" id="type">
                <div class="mb-3">
                  <label for="event-type" class="form-label">Type of event: {{ eventDetail.eventType }}</label>
                  <select class="form-select" aria-label="Type of event" v-model="eventDetail.eventType">
                  <option value="" disabled selected>What kind of event you're hosting?</option>
                  <option v-for="(eventType, index) in eventTypes" :key="index" :value="eventType">
                    {{ formatEventType(eventType) }}
                  </option>
                </select>
                </div>
              </div>
            </div>
            <div class="row mb-3" id="location">
                <div class="mb-3">
                  <label for="location" class="form-label">Location</label>
                  <input type="text" v-model="eventDetail.location" class="form-control" id="location" placeholder="Where it'll be held?" required>
                </div>
              </div>
            <div class="row mb-3">
              <div class="col" id="start-date">
                <label for="start-date" class="form-label">Start Date</label>
                <input type="date" v-model="eventDetail.startDate" class="form-control" id="start-date" placeholder="When it'll be held?" required>
              </div>
              <div class="col" id="end-date">
                <div class="col">
                  <label for="end-date" class="form-label">End Date</label>
                  <input type="date" v-model="eventDetail.endDate" class="form-control" id="end-date" placeholder="When it'll be done?">
                </div>
              </div>
            </div>
            <div class="row" id="message-template">
              <div class="mb-3">
                <label for="whats-app-message-template" class="form-label">WhatsApp Message Template</label>
                <textarea class="form-control" id="whats-app-message-template" v-model="eventDetail.messageTemplate" rows="3"></textarea>
              </div>
            </div>
            <div class="row" id="invitation-url">
              <div class="mb-3">
                <label for="invitation-url" class="form-label">Digital Invitation Url (with query name parameter)</label>
                <input type="text" v-model="eventDetail.digitalInvitationURL" class="form-control" id="invitation-url" placeholder="https://wedding.muhammadilham.xyz/?name=ilham">
              </div>
            </div>
            <div class="row">
              <div>
                <div class="spinner-border" role="status" v-if="isLoading">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <button v-else type="submit" class="btn btn-primary">Create</button>
              </div>
            </div>
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
        eventType: '',
      },
      eventTypes: [
        'wedding',
        'networking',
        'conferences',
        'product_launches',
        'festival',
        'sport',
        'birthday',
        'charity',
        'cultural',
        'concert',
        'comedy',
        'gathering',
        'exhibition',
        'workshop',
        'team_building',
        'other'
      ],
    };
  },
  methods: {
    formatEventType(eventType) {
      return eventType
        .split('_') // Split by underscore
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
        .join(' '); // Join back with spaces
    },
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

        const response = await apiClient.post('/events', payload, {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }})
        const apiResponseData = response.data.data;
        const newlyCreatedEventUUID = apiResponseData.uuid;

        this.$store.dispatch('setNotification', { message: `Event: ${this.eventDetail.name} created!`, type: 'success' });

        router.push({ path: `/events/${newlyCreatedEventUUID}` });
      } catch ({ response }) {
        this.errorOccured = true;
        if (err instanceof DomainError) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Internal Server Error';
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
