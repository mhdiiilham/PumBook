<template>
  <div class="event animate__backInDown d-flex justify-content-center" style="padding-top: 2em;">
    <div class="container">
      <div class="card shadow p-4 mx-auto responsive-card">
        <h1 class="text-center">Events</h1>
        
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Host</th>
                <th scope="col">Location</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
              </tr>
            </thead>
            <tbody>
              <!-- Show skeleton loader when loading -->
              <tr v-if="isLoading">
                <td colspan="6">
                  <div class="skeleton-loader"></div>
                </td>
              </tr>

              <!-- Show message when no events -->
              <tr v-else-if="events.length === 0">
                <td colspan="6">There are no events at the moment...</td>
              </tr>

              <!-- Show actual data -->
              <tr v-for="(event, index) in formattedEvents" :key="index">
                <td><router-link :to="'/events/'+event.uuid" style="font-weight: bold;">{{ trimEventUUID(event.uuid) }}</router-link></td>
                <td><router-link :to="'/events/'+event.uuid">{{ trimEventName(event.name) }}</router-link></td>
                <td>{{ event.host }}</td>
                <td>{{ event.location }}</td>
                <td>{{ event.formattedStartDate }}</td>
                <td>{{ event.formattedEndDate }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage == 1 }">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item" :class="{ 'disabled': events.length < 10 }">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
export default {
  data() {
    return {
      currentPage: 1,
      events: [],
      isLoading: true, // Added loading state
    };
  },
  methods: {
    async fetchEvents() {
      this.isLoading = true; // Start loading
      try {
        const response = await apiClient.get('/events', {headers: { 'Authorization': `Bearer ${this.$store.state.accessToken}` }});
        const { records } = response.data.data;
        this.events = records;
      } catch (error) {
        (error);
      } finally {
        this.isLoading = false; // Stop loading
      }
    },
    parseDate(isoString) {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date);
    },
    trimEventUUID(id) {
      return `${id.substring(0, 5)}...`;
    },
    trimEventName(name) {
      return name.substring(0, 20)+"..."
    }
  },
  created() {
    this.fetchEvents();
  },
  computed: {
    formattedEvents() {
      return this.events.map(event => ({
        ...event,
        formattedStartDate: this.parseDate(event.start_date),
        formattedEndDate: this.parseDate(event.end_date)
      }));
    },
  }
};
</script>

<style scoped>
.responsive-card {
  width: 100%;
  max-width: 95%;
}

@media (min-width: 768px) {
  .responsive-card {
    max-width: 800px;
  }
}

@media (min-width: 1024px) {
  .responsive-card {
    max-width: 1000px;
  }
}

@media (min-width: 1440px) {
  .responsive-card {
    max-width: 1200px;
  }
}

/* Skeleton Loader */
.skeleton-loader {
  width: 100%;
  height: 20px;
  background: linear-gradient(90deg, #f3f3f3 25%, #ecebeb 50%, #f3f3f3 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
