<template>
  <section class="skills" v-if="data.skills">
    <h1>{{ data.title }}</h1>
    <div class="skills-container" v-if="showSkills">
      <div v-for="(skill, _id) in skills" v-bind:key="_id">
        <p>Name: {{ skill[0] }}</p>
      </div>
    </div>
    <div v-if="showEditAbout" class="skills-container">
      <EditSkill :skills="skills" />
    </div>
    <button v-on:click="showClickEdit" class="btnPrimary">Edit</button>
  </section>
  <section class="skills" v-else>
    <h1>Error</h1>
    <p>No reponse from API</p>
  </section>
</template>

<script>
import axios from 'axios'
import EditSkill from '@/components/EditSkill.vue'

const apiKey = process.env.VUE_APP_API_KEY

export default {
  data() {
    return {
      data: {},
      errors: [],
      showEditAbout: false,
      showSkills: true,
      skills: {}
    }
  },
  components: {
    EditSkill
  },

  methods: {
    showClickEdit: function(e) {
      this.showEditAbout = !this.showEditAbout
      this.showAbout = !this.showAbout
    }
  },

  // Fetches posts when the component is created.
  created() {
    axios
      .get(`http://localhost:1337/competence`, {
        headers: { api_key: apiKey }
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.skills = response.data.data
        this.data = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
