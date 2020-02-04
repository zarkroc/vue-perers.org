<template>
  <section class="skills" v-if="skills.title">
    <h1>{{ skills.title }}</h1>
    <div class="skills-container" v-if="showSkills">
      <div v-for="(skill, _id) in skills.skills" v-bind:key="_id">
        <div v-if="showEditAbout" class="skills-container">
          <EditSkill :skill="skill" @clicked="showClickEdit" />
          <button v-on:click="showClickEdit" class="btnPrimary">
            Edit
          </button>
        </div>
        <div v-else class="skill">
          <p>Competence: {{ skill.name }} - level: {{ skill.level }}</p>
          <button v-on:click="showClickEdit" class="btnPrimary">
            Edit
          </button>
        </div>
      </div>
    </div>
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
      })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>
