<template>
  <section class="about" v-if="data.about">
    <h1>{{ data.title }}</h1>
    <div class="about-container" v-if="showAbout">
      <p>Name: {{ about.name }}</p>
      <p>Location: {{ about.location }}</p>
      <p>Description: {{ about.description }}</p>
      <p>Interest: {{ about.interest }}</p>
      <p>{{ about }}</p>
    </div>
    <div v-if="showEditAbout" class="about-container">
      <EditAbout :about="about" />
    </div>
    <button v-on:click="showClickEditAbout" class="btnPrimary">Edit</button>
  </section>
  <section class="about" v-else>
    <h1>Error</h1>
    <p>No reponse from API</p>
  </section>
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
      about: {}
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
    axios
      .get(`http://localhost:1337`, {
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
