<template>
  <section class="skill">
    <h2>Editera</h2>
    <div class="skill-container">
      <section v-if="skill">
        <form @submit.prevent="submitForm">
          <label for="name"></label>
          <input type="text" v-model="skill.name" />
          <label for="level"></label>
          <input type="number" v-model="skill.level" />
          <button class="btnPrimary" type="submit">Save</button>
          <div class="errors" v-if="errors.length">
            <p>{{ errors }}</p>
          </div>
        </form>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
const apiKey = process.env.VUE_APP_API_KEY

export default {
  data() {
    return {
      data: {},
      errors: [],
    }
  },
  props: {
    skill: {
      type: Object,
    },
  },

  methods: {
    submitForm() {
      this.submitting = true
      if (process.env.NODE_ENV == 'production') {
        var apiHost = 'https://api.perers.org/competence'
      } else {
        var apiHost = 'http://localhost:1337/competence'
      }

      axios
        .put(
          apiHost,
          {
            name: this.skill.name,
            level: this.skill.level,
          },
          {
            headers: {
              api_key: apiKey,
              'Content-type': 'application/json',
              'x-access-token': localStorage.token,
            },
          }
        )
        .then((response) => {
          // JSON responses are automatically parsed.
          this.$emit('clicked')
          this.submitting = false
        })
        .catch((e) => {
          this.errors.push(e.response.data.errors.title)
        })
    },
  },

  // Fetches posts when the component is created.
  // created() {
  //
  // }
}
</script>
