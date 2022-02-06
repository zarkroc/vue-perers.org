<template>
  <main class="about" v-if="about">
    <h1>{{ about.name }}</h1>
    <section class="container" v-if="showAbout">
      <p>Name: {{ about.name }}</p>
      <p>Location: {{ about.location }}</p>
      <p>Description: {{ about.description }}</p>
      <p>Interest: {{ about.interest }}</p>
      <div v-if="token">
        <button v-on:click="showClickEditAbout" class="btnPrimary">Edit</button>
      </div>
    </section>
    <div v-if="showEditAbout && token" class="about">
      <EditAbout :about="about" @clicked="showClickEditAbout" />
    </div>
  </main>
  <main class="about" v-else>
    <h1>Error</h1>
    <p>No reponse from API</p>
    <p>{{ errors }}</p>
  </main>
</template>

<script>
import axios from 'axios'
import EditAbout from '@/components/EditAbout.vue'

export default {
  data() {
    return {
      errors: [],
      showEditAbout: false,
      showAbout: true,
      about: {},
      token: localStorage.token,
      apiKey: process.env.VUE_APP_API_KEY,
    }
  },
  components: {
    EditAbout,
  },

  methods: {
    showClickEditAbout: function (e) {
      this.showEditAbout = !this.showEditAbout
      this.showAbout = !this.showAbout
    },
  },

  // Fetches posts when the component is created.
  created() {
    if (process.env.NODE_ENV == 'production') {
      var apiHost = 'https://api.perers.org/'
      var name = 'Tomas Perers'
    } else {
      var apiHost = 'http://localhost:1337'
      var name = 'Tomas Perers'
    }
    axios
      .get(apiHost, {
        headers: { api_key: this.apiKey },
        params: {
          name: name,
        },
      })
      .then((response) => {
        // JSON responses are automatically parsed.
        this.about = response.data
        localStorage.setItem('userId', response.data._id)
      })
      .catch((e) => {
        this.errors.push(e.response.response)
      })
  },
}
</script>
