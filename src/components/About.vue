<template>
  <main class="about" v-if="data.about">
    <h1>{{ data.title }}</h1>
    <section class="container" v-if="showAbout">
      <p>Name: {{ about.name }}</p>
      <p>Location: {{ about.location }}</p>
      <p>Description: {{ about.description }}</p>
      <p>Interest: {{ about.interest }}</p>
      <div v-if="token">
        <button v-on:click="showClickEditAbout" class="btnPrimary">
          Edit
        </button>
      </div>
    </section>
    <div v-if="showEditAbout && token" class="about">
      <EditAbout :about="about" @clicked="showClickEditAbout" />
    </div>
  </main>
  <main class="about" v-else>
    <h1>Error</h1>
    <p>No reponse from API</p>
  </main>
</template>

<script>
import axios from 'axios'
import EditAbout from '@/components/EditAbout.vue'

const apiKey = process.env.VUE_APP_API_KEY

export default {
  data() {
    return {
      data: {},
      errors: [],
      showEditAbout: false,
      showAbout: true,
      about: {},
      token: localStorage.token
    }
  },
  components: {
    EditAbout
  },

  methods: {
    showClickEditAbout: function(e) {
      this.showEditAbout = !this.showEditAbout
      this.showAbout = !this.showAbout
    }
  },

  // Fetches posts when the component is created.
  created() {
    if (process.env.NODE_ENV == 'production') {
      var apiHost = 'http://api.perers.org/'
    } else {
      var apiHost = 'http://localhost:1337'
    }
    axios
      .get(apiHost, {
        headers: { api_key: apiKey }
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.about = response.data.data.about
        this.data = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
