<template>
  <div id="profile" class="m-5 p-4 card shadow">
    <div class="container">
      <div class="row">
        <div class="col" id="detail">
          <div class="card p-4">
            <table>
              <tr>
                <td>Name </td>
                <td>: Muhammad Ilham</td>
              </tr>
              <tr>
                <td>Email </td>
                <td>: {{ $store.state.email }}</td>
              </tr>
              <tr>
                <td>Phone </td>
                <td>: {{ user.country_code }} {{user.phone_number}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
import DomainError from '@/helpers/error';


export default {
  data: function() {
    return {
      user: null
    }
  },
  methods: {
    async fetchUser() {
      try {
        const response = await apiClient.get("/auth/profile", {
          headers: { Authorization: `Bearer ${this.$store.state.accessToken}` }
        })

        this.user = response.data.data;
        this.$store.dispatch('setNotification', { message: `Welcome ${this.user.first_name} ${this.user.last_name}`, type: 'success' });
      } catch (err) {
        console.log('err', err);
        if (err instanceof DomainError) {
          this.$store.dispatch('setNotification', { message: err.message, type: 'error' });
        }

        this.$store.dispatch('setNotification', { message: 'Internal Server Error', type: 'error' });
      }
    },
  },
  mounted() {
    this.fetchUser()
  },
};
</script>