<template>
  <div class="event animate__backInDown d-flex justify-content-center" style="padding-top: 2em;">
    <div class="container">
      <div class="page-body">

        <div class="col">
          <div class="div" id="notification">
            <div class="row">
              <div class="alert alert-danger" role="alert" v-if="errorMessage">
                {{ errorMessage }}
              </div>
            </div>
            <div class="row">
              <div class="alert alert-primary" role="alert" v-if="detailMessage">
                {{ detailMessage }}
              </div>
            </div>
          </div>
          <div class="card shadow p-2 mx-auto responsive-card-guest">
            <div class="container">
              <div class="row">
                <h3 class="mt-4">
                  Event Detail
                </h3>
              </div>
            </div>
            <form @submit.prevent="handleUpdateEvent">
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label for="name" class="form-label">Name</label>
                      <div v-if="isLoading" class="skeleton-loader"></div>
                      <input v-else type="text" v-model="event.name" class="form-control" id="name" placeholder="Your event name">
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                  <div class="row">
                    <div class="col" id="host">
                      <div class="mb-3">
                        <label for="host" class="form-label">Host</label>
                        <div v-if="isLoading" class="skeleton-loader"></div>
                        <input v-else type="text" v-model="event.host" class="form-control" id="host" placeholder="Who host the event?">
                      </div>
                    </div>

                    <div class="col" id="location">
                      <div class="mb-3">
                        <label for="location" class="form-label">Location</label>
                        <div v-if="isLoading" class="skeleton-loader"></div>
                        <input v-else type="text" v-model="event.location" class="form-control" id="location" placeholder="Where it'll be held?">
                      </div>
                    </div>
                  </div>
              </div>
              <div class="mb-3">
                <div class="container">
                  <div class="row">
                    <div class="col">
                      <label for="start-date" class="form-label">Start Date</label>
                      <div v-if="isLoading" class="skeleton-loader"></div>
                      <input v-else type="date" v-model="event.startDate" class="form-control" id="start-date" placeholder="When it'll be held?">
                    </div>
                    <div class="col">
                      <label for="end-date" class="form-label">End Date</label>
                      <div v-if="isLoading" class="skeleton-loader"></div>
                      <input v-else type="date" v-model="event.endDate" class="form-control" id="end-date" placeholder="When it'll be done?">
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="mb-3">
                    <label for="whats-app-message-template" class="form-label">WhatsApp Message Template</label>
                    <div v-if="isLoading" class="skeleton-loader"></div>
                    <textarea v-else class="form-control" id="whats-app-message-template" v-model="event.messageTemplate" rows="3"></textarea>
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3">
                  <label for="invitation-url" class="form-label">Digital Invitation Url (with query name parameter)</label>
                  <div v-if="isLoading" class="skeleton-loader"></div>
                  <input v-else type="text" v-model="event.digitalInvitationURL" class="form-control" id="invitation-url" placeholder="https://wedding.muhammadilham.xyz/?name=ilham">
                </div>
                </div>
              </div>

              <div class="container text-center">
                <div class="row mb-3">
                  <div class="col">
                    <button type="button" :class="{ disabled: isLoading }" @click="ToggleGuestList" class="btn btn-outline-primary">Guest List</button>
                  </div>
                  <div class="col">
                    <button type="submit" :class="{ disabled: isLoading }" class="btn btn-outline-primary">Save</button>
                  </div>
                  <div class="col">
                    <button type="button" :class="{ disabled: isLoading }" @click="handleToCheckInPage" class="btn btn-outline-primary">Check-In Page</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div class="col mb-4" id="guest" >
          <div class="card shadow p-2 mx-auto responsive-card-guest mt-2" v-if="showGuest">

            <!-- PAGE SETTING CARD -->
            <div class="card" style="padding: 1em;">
              <div class="container">
                <div class="row">
                  <!-- Per Page Setting Pagination -->
                  <div class="col col-md-auto" id="per-page-pagination">
                    <label for="per-page" class="form-label me-2">Per Page:</label>
                    <select v-model="perPage" id="per-page" class="form-select w-auto d-inline">
                      <option v-for="option in perPageOptions" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- Per Page Setting Pagination -->
  
                  <!-- Filter by VIP status -->
                  <div class="col col-md-auto">
                    <div class="filter-controls">
                      <select v-model="vipFilter" id="vipFilter" class="form-select" aria-label="Default select example">
                        <option value="all">All</option>
                        <option value="vip">VIP</option>
                        <option value="non-vip">Non-VIP </option>
                      </select>
                    </div>
                  </div>
                  <!-- Filter by VIP status -->
  
                  <!-- Filter by confirmation status -->
                  <div class="col col-md-auto">
                    <div class="filter-controls">
                      <select v-model="attendanceStatusFilter" id="attendance-status-filter" class="form-select" aria-label="Default select example">
                        <option value="all">Show all</option>
                        <option value="waiting">Waiting for confirmation</option>
                        <option value="yes">Yes</option>
                        <option value="no">No </option>
                      </select>
                    </div>
                  </div>
                  <!-- Filter by confirmation status -->
  
                  <!-- Filter By Name or Phone Number -->
                  <div class="col">
                    <input type="text" class="form-control"
                      v-model="query" @change="filteredGuestList"
                      placeholder="Search by name or/and phone number">
                  </div>
                  <!-- Filter By Name or Phone Number -->
                </div>
              </div>
            </div>
            <!-- PAGE SETTING CARD -->

            <!-- ALERT MESSAGES -->
            <div class="alert alert-warning" role="alert" v-if="modelErrorMessage">
              {{ modelErrorMessage }}
            </div>
            <div class="alert alert-primary" role="alert" v-if="successMessage">
              {{ successMessage }}
            </div>
            <!-- ALERT MESSAGES -->

            <!-- Guest list's table -->
            <div class="table-responsive-guest" style="overflow-x: auto; max-width: 100%;">
              <table class="table table-bordered mt-2" id="guest-list" style="min-width: 1000px;">
                <thead>
                  <tr>
                    <th scope="col">
                      <input type="checkbox" v-model="selectAll" @change="handleSelectAll" id="select-all">
                    </th>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Will Attend?</th>
                    <th scope="col">VIP?</th>
                    <th scope="col">Sent Invitation</th>
                    <th scope="col">X</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colspan="2"></td>
                    <td><input v-model="newGuest.name" class="form-control" placeholder="Guest name" required></td>
                    <td><input v-model="newGuest.phone_number" class="form-control" placeholder="Phone"></td>
                    <td>
                      <select v-model="newGuest.will_attend_event" disabled class="form-select">
                        <option :value="true">Yes</option>
                        <option :value="false">No</option>
                      </select>
                    </td>
                    <td><input type="checkbox" v-model="newGuest.is_vip"></td>
                    <td><button class="btn btn-outline-primary btn-sm w-100 text-nowrap" @click="addGuest">Submit</button></td>
                  </tr>
                  <tr v-show="isRefetchinguest">
                    <td colspan="7">
                      <div class="skeleton-loader"></div>
                    </td>
                  </tr>
                  <tr v-show="!isRefetchinguest" class="align-middle" v-for="(guest, index) in paginatedGuests" :key="guest.uuid">
                    <th>
                      <input type="checkbox" 
                        :checked="selectedGuest.some(g => g.phone_number === guest.phone_number)"
                        @change="toggleGuestSelection(guest)"
                      >
                    </th>
                    <th scope="row">{{ index+1 }}</th>
                    <td><input v-model="guest.name" class="form-control"></td>
                    <td><input v-model="guest.phone_number" class="form-control"></td>
                    <td v-if="guest.will_attend_event == true">Yes</td>
                    <td v-if="guest.will_attend_event == false">No</td>
                    <td v-if="guest.will_attend_event == null">Waiting for confirmation</td>
                    <td>
                      <input type="checkbox" :disabled="successMessage" v-model="guest.is_vip" @change="updateVIPStatus(guest)">
                    </td>
                    <td><button class="btn btn-outline-primary btn-sm w-100 text-nowrap" @click="sentGuestInvitation(guest)">{{ guest.is_invitation_sent ? 'Re-' : '' }}Sent Invitation</button></td>
                    <td><button class="btn-close btn-sm w-100" @click="handleRemoveGuest(guest)"></button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Guest list's table -->

            <!-- Guest list's pagination -->
            <div class="container">
              <div class="row">
                <div class="col text-center text-md-end"> <!-- Center on mobile, right on desktop -->
                  <ul class="pagination d-inline-flex">
                    <li class="page-item">
                      <button class="page-link" @click="prevPage" :class="{ disabled: currentPage == 1 }">Previous</button>
                    </li>
                    <li class="page-item disabled">
                      <button class="page-link"><span class="mx-2">Page {{ currentPage }} of {{ totalPages }} (Total Guest: {{ filteredGuestList.length }}) </span></button>
                    </li>
                    <li class="page-item">
                      <button class="page-link" @click="nextPage" :class="{ disabled: currentPage >= totalPages }">Next</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- Guest list's pagination -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
import router from '@/router';

export default {
  components: {
  },
  data: function() {
    return {
      selectAll: false,
      isLoading: false,
      query: null,
      selectedGuest: [],
      showGuest: false,
      event: {
        id: null,
        name: null,
        location: null,
        startDate: null,
        endDate: null,
        digitalInvitationURL: null,
        guestList: [],
        host: null,
        messageTemplate: null,
      },
      errorMessage: null,
      newGuest: {
        name: '',
        phone_number: '',
        is_vip: false
      },
      perPage: 10, // Default items per page
      currentPage: 1, // Current active page
      perPageOptions: [5, 10, 15, 20, 'All'], // User options
      vipFilter: 'all',
      attendanceStatusFilter: 'all',
      modelErrorMessage: null,
      successMessage: null,
      detailMessage: null,
      isRefetchinguest: false,
    };
  },
  methods: {
    handleToCheckInPage() {
      router.push({ path: `/events/${this.event.uuid}/checkin` });
    },
    ToggleGuestList() {
      this.showGuest = true;
      this.$nextTick(() => {
        document.getElementById('guest').scrollIntoView({ behavior: "smooth", block: "start" });
      });
    },
    async fetchEventDetail() {
      try {
        this.isLoading = true;
        this.event.uuid = this.$route.params.id;
        const response = await apiClient.get(`events/${this.event.uuid}`, {
          headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }
        });

        const { data } = response.data;
        this.event.name = data.name;
        this.event.location = data.location;
        this.event.startDate = this.formatDateForInput(data.start_date);
        this.event.endDate = this.formatDateForInput(data.end_date);
        this.event.digitalInvitationURL = data.digital_invitation_url;
        this.event.guestList = data.guest_list;
        this.event.host = data.host;
        this.event.messageTemplate = data.message_template;

      } catch ({ response }) {
        if (response.data) {
          const { code, data } = response.data;
          if (code === 401 && data === 'AUTH_TOKEN_EXPIRED') {
            this.$store.dispatch('handleSignOut');
          }
        } else {
          this.errorMessage = 'Opps! Something is wrong in our end. Please contact him!'
        }
      } finally {
        this.isLoading = false;
      }
    },
    async reFetchEventDetailToUpdateGuest() {
      try {
        this.event.uuid = this.$route.params.id;
        const response = await apiClient.get(`events/${this.event.uuid}`, {
          headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }
        });

        const { data } = response.data;
        this.event.guestList = data.guest_list;
      } catch ({ response }) {
        if (response.data) {
          const { code, data } = response.data;
          if (code === 401 && data === 'AUTH_TOKEN_EXPIRED') {
            this.$store.dispatch('handleSignOut');
          }
        } else {
          this.errorMessage = 'Opps! Something is wrong in our end. Please contact him!'
        }
      }
    },
    formatDateForInput(isoString) {
      if (!isoString) return null;
      return new Date(isoString).toISOString().split('T')[0]; // Extract YYYY-MM-DD
    },
    async addGuest() {
      try {
        if (!this.newGuest.name || !this.newGuest.phone_number) {
          this.modelErrorMessage = 'Please fill new guest name and phone number before adding to the guest list.'
        } else {
          await apiClient.post(`/events/${this.event.uuid}/guests`, {
            'guests': [this.newGuest],
          }, {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }})
          this.newGuest = { name: '', phone_number: '', is_vip: false }
          this.fetchEventDetail();
          this.successMessage = `Guest ${this.newGuest.name} added to this event.`;
          setTimeout(() => {
            this.successMessage = null;
          }, 1000);
        }
      } catch (error) {
        this.modelErrorMessage= 'Failed to add new guest. Please contact support!';
      } finally {
        setTimeout(() => {
          this.modelErrorMessage = null;
        }, 1500);
      }
    },
    async handleUpdateEvent() {
      try {
        const startDate = new Date(this.event.startDate).toISOString();
        const endDate = new Date(this.event.endDate).toISOString();
        const payload = {
          'name': this.event.name,
          'location': this.event.location,
          'start_date': startDate,
          'end_date': endDate,
          'digital_invitation_url': this.event.digitalInvitationURL,
          'host': this.event.host,
          'message_template': this.event.messageTemplate,
        };

        await apiClient.patch(`/events/${this.event.uuid}`, payload, {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }})
        this.detailMessage = 'Event updated!';
      } catch (error) {
        this.errorMessage = 'Failed to update event';
      } finally {
        setTimeout(() => {
          this.detailMessage = null;
          this.fetchEventDetail();
        }, 500);
      }
    },
    async handleRemoveGuest(guest) {
      try {
        if (confirm(`Are you sure want to remove ${guest.name} from this event?`)) {
          await apiClient.delete(`/events/${this.event.uuid}/guests`, {
            headers: {Authorization: `Bearer ${this.$store.state.accessToken}`},
            data: { guests: [ { guest_uuid: guest.uuid } ] }
          })
          this.successMessage = `Guest: '${guest.name}' removed from this event.`
          this.fetchEventDetail()
          document.getElementById('guest').scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            this.successMessage = null;
          }, 1500);
        }
      } catch (error) {
        this.modelErrorMessage= 'Failed to remove new guest. Please contact support!';
      } finally {
        setTimeout(() => {
          this.modelErrorMessage = null;
        }, 1500);
      }
    },
    async sentGuestInvitation(guest) {
      try {
        if (guest.is_invitation_sent) {
          if (!confirm(`Are you going to resent WhatsApp Invitation Message to ${guest.name}?`)) {
            return
          }
        }
        await apiClient.post(`/events/${this.event.uuid}/guests/${guest.uuid}/invite`, null, {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }})
        this.fetchEventDetail()
        this.successMessage = `Invitation to ${guest.name} sent!`;
      } catch (error) {
        this.errorMessage = 'Internal Server Error';
      } finally {
        setTimeout(() => {
          this.successMessage = null;
        }, 1500);
      }
    },
    handleSelectAll() {
      if (this.selectAll) {
        this.selectedGuest = this.filteredGuestList.map(guest => ({
          name: guest.name,
          phone_number: guest.phone_number,
          is_vip: guest.is_vip
        }));
      } else {
        this.selectedGuest = [];
      }
    },
    toggleGuestSelection(guest) {
      const index = this.selectedGuest.findIndex(g => g.phone_number === guest.phone_number);
      if (index === -1) {
        this.selectedGuest.push({
          name: guest.name,
          phone_number: guest.phone_number,
          is_vip: guest.is_vip
        });
      } else {
        this.selectedGuest.splice(index, 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
      // this.$nextTick(() => {
      document.getElementById('guest').scrollIntoView({ behavior: "smooth", block: "start" });
      // })
    },
    async updateVIPStatus(guest) {
      try {
        this.isRefetchinguest = true;
        await apiClient.patch(`/events/${this.event.uuid}/guests/${guest.uuid}?is_vip=${guest.is_vip}`, {}, {
          headers: {Authorization: `Bearer ${this.$store.state.accessToken}`},
        })
        this.successMessage = `Guest: ${guest.name} ${guest.is_vip === true ? 'added to' : 'remove from'} VIP!`;
        document.getElementById('guest').scrollIntoView({ behavior: "smooth", block: "start" });
        this.reFetchEventDetailToUpdateGuest();
        setTimeout(() => {
          this.successMessage = null;
        }, 1500);
      } catch (error) {
        (error, 'error');
        this.modelErrorMessage= "Failed to update guest's vip status. Please contact support!";
      } finally {
        setTimeout(() => {
          this.modelErrorMessage = null;
          this.isRefetchinguest = false;
        }, 1500);
      }
    },
  },
  created() {
    this.fetchEventDetail()
  },
  computed: {
    filteredGuestList() {
      let guests = this.event.guestList || [];

      // Filter by search query
      if (this.query) {
        const searchQuery = this.query.toLowerCase();
        guests = guests.filter(guest => 
          guest.name.toLowerCase().includes(searchQuery) || 
          guest.phone_number.includes(this.query) // Keep phone numbers case-sensitive
        );
      }

      // Apply VIP filter
      if (this.vipFilter === 'vip') {
        guests = guests.filter(guest => guest.is_vip);
      } else if (this.vipFilter === 'non-vip') {
        guests = guests.filter(guest => !guest.is_vip);
      }

      // Aplly Attendance Status filter
      if (this.attendanceStatusFilter === 'yes') {
        guests = guests.filter(guests => guests.will_attend_event === true)
      } else if (this.attendanceStatusFilter === 'no') {
        guests = guests.filter(guests => guests.will_attend_event === false)
      } else if (this.attendanceStatusFilter === 'waiting') {
        guests = guests.filter(guests => guests.will_attend_event === null)
      }

      return guests;
    },
    paginatedGuests() {
      if (this.perPage === 'All') return this.filteredGuestList;
      
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredGuestList.slice(start, end);
    },
    totalPages() {
      if (this.perPage === 'All') return 1;
      return Math.ceil(this.filteredGuestList.length / this.perPage);
    },
    getEventName() {
      let eventName = this.event.name;
      if (eventName < 10) return eventName;
      return eventName.substring(0, 15)+"...";
    },
  }
};
</script>

<style scoped>
.responsive-card {
  width: 100%;
  max-width: 90%; /* Makes it wider on larger screens */
}

.custom-modal-width {
  max-width: 70%;
}

.skeleton-loader {
  width: 100%;
  height: 38px; /* Match input field height */
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}


@media (min-width: 768px) {
  .responsive-card {
    max-width: 90%; /* Wider card for desktop */
  }

  .responsive-card-guest {
    width: 100% !important;
  }
  .table-responsive {
    overflow-x: auto;
  }
  .pagination {
    flex-wrap: wrap;
    justify-content: center;
  }

  .table-responsive-guest{
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table {
    min-width: 1000px; /* Ensures it doesn't shrink */
  }
}
</style>
