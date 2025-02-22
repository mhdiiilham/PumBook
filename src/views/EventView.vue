<template>
  <div class="event animate__backInDown d-flex justify-content-center" style="padding-top: 2em;">
    <div class="container">
      <p class="photo-credit" style="font-size: 0.8em !important;">
        Photo by <a href="https://unsplash.com/@kellysikkema?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Kelly Sikkema</a>
        on <a href="https://unsplash.com/photos/six-white-sticky-notes--1_RZL8BGBM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </p>
      <div class="card shadow p-4 mb-4 mx-auto responsive-card list-event-card">
        <h1 class="text-center" style="font-family: 'Funnel Display', serif;">Your Events</h1>

        <div class="list-events">
          <div v-if="isLoading">
            <div class="card mb-3 skeleton-card" v-for="n in 5" :key="n">
              <div class="row g-0">
                <div class="col-12 col-md-8">
                  <div class="card-body">
                    <div class="skeleton-loader skeleton-title"></div>
                    <div class="row">
                      <div class="col">
                        <div class="skeleton-loader skeleton-text"></div>
                      </div>
                      <div class="col">
                        <div class="skeleton-loader skeleton-text"></div>
                      </div>
                    </div>
                    <div class="skeleton-loader skeleton-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="container" v-if="events.length === 0 && !isLoading">
            <div class="row">
              <p>You Don't have any event, yet. <router-link to="/events/create">Plan your event now!</router-link></p>
            </div>
          </div>

          <router-link
            v-show="!isLoading"
            :to="'/events/' + event.uuid"
            v-for="event in formattedEvents"
            :key="event.uuid"
            class="card mb-3 text-decoration-none clickable-card"
            style="max-height: 8em;"
          >
            <div class="row g-0">
              <div class="col-12 col-md-8" id="event-card-list">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <h5 class="card-title">{{ trimEventName(event.name) }}</h5>
                    </div>
                    <div class="row mb-2">
                      <div class="col">
                        <p class="card-text">Host: {{ event.host }}</p>
                      </div>
                      <div class="col">
                        <p class="card-text">Start Date: {{ event.formattedStartDate }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
        <nav aria-label="Page navigation example" v-if="events.length > 10">
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
      const tempName = name;
      return `${tempName.substring(0, 10)}...`
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
        formattedEndDate: this.parseDate(event.end_date),
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s',
      }));
    },
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&display=swap');

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

.table tbody tr {
  transition: all 0.3s ease-in-out;
}

.table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
  transform: scale(1.01); /* Slightly enlarges row */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Adds shadow */
  border-left: 4px solid #007bff; /* Blue left border */
}

.list-events .card {
  height: 8em; /* Keep the card's height fixed */
  display: flex;
  overflow: hidden;
}

.skeleton-loader {
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

/* Skeleton Styles */
.skeleton-card {
  height: 8em;
  display: flex;
  overflow: hidden;
}

.skeleton-image {
  width: 100%;
  height: 100%;
}

.skeleton-title {
  width: 50%;
  height: 20px;
  margin-bottom: 10px;
}

.skeleton-text {
  width: 100%;
  height: 15px;
  margin-bottom: 8px;
}

.event-card-list {
  overflow: scroll;
}

/* Background Styling */
.event {
  background: url('@/assets/events-bg.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Glossy Effect on Container */
.list-event-card {
  background: rgba(255, 255, 255, 0.2); /* Transparent white */
  backdrop-filter: blur(10px); /* Glassmorphism effect */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.list-events .card,
.skeleton-card {
  background: rgba(255, 255, 255, 0.15); /* Semi-transparent white */
  backdrop-filter: blur(10px); /* Glass effect */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
}

.list-events .card:hover {
  transform: scale(1.02);
}

.list-events .col-md-4 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* Ensure it takes full height */
}

.list-events .col-md-4 img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain; /* Keep aspect ratio and fit */
}

</style>
