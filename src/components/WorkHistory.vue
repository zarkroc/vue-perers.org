<template>
  <main class="workplaces" v-if="workPlaces">
    <h1>{{ workPlaces.title }}</h1>
    <section class="container">
      <div v-for="(work, _id) in workPlaces" v-bind:key="_id">
        <div v-if="showWork" class="work">
          <p>Company: {{ work.company }}</p>
          <p>Role: {{ work.role }}</p>
          <p>Description: {{ work.description }}</p>
          <p>Start date: {{ work.start }}</p>
          <p>Stop date: {{ work.stop }}</p>
          <div v-if="token">
            <button v-on:click="showClickEdit" class="btnPrimary">Edit</button>
          </div>
        </div>
        <div v-if="showEditWork">
          <EditWork :work="work" @updated="showClickEdit" />
        </div>
      </div>
    </section>
  </main>
  <main class="workPlaces" v-else>
    <h1>Error</h1>
    <p>No reponse from API</p>
  </main>
</template>

<script>
import axios from 'axios'
import EditWork from '@/components/EditWork.vue'

const apiKey = process.env.VUE_APP_API_KEY

export default {
  data() {
    return {
      errors: [],
      showEditWork: false,
      showWork: true,
      workPlaces: {},
      token: localStorage.token
    }
  },
  components: {
    EditWork
  },

  methods: {
    showClickEdit: function(e) {
      this.showEditWork = !this.showEditWork
      this.showWork = !this.showWork
    }
  },

  // Fetches posts when the component is created.
  created() {
    if (process.env.NODE_ENV == 'production') {
      var apiHost = 'https://api.perers.org/workHistory'
    } else {
      var apiHost = 'http://localhost:1337/workHistory'
    }
    axios
      .get(apiHost, {
        headers: { api_key: apiKey }
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.workPlaces = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
