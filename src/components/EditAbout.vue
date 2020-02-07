<template>
  <section class="about">
    <h2>Editera</h2>
    <div class="about-container">
      <section v-if="about">
        <form @submit.prevent="submitForm">
          <label for="name"></label>
          <input type="text" v-model="about.name" />
          <label for="description"></label>
          <input type="text" v-model="about.description" />
          <label for="interest"></label>
          <input type="text" v-model="about.interest" />
          <label for="location"></label>
          <input type="text" v-model="about.location" />
          <button class="btnPrimary" type="submit">
            Save
          </button>
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
      errors: []
    }
  },
  props: {
    about: {
      type: Object
    }
  },

  methods: {
    showClickEditAbout: function(e) {},
    submitForm() {
      if (process.env.NODE_ENV == 'production') {
        var apiHost = 'https://api.perers.org/'
      } else {
        var apiHost = 'http://localhost:1337'
      }
      axios
        .put(
          apiHost,
          {
            name: this.about.name,
            description: this.about.description,
            homeTown: this.about.location,
            interest: this.about.interest
          },
          {
            headers: {
              api_key: apiKey,
              'Content-type': 'application/json',
              'x-access-token': localStorage.token
            }
          }
        )
        .then(response => {
          // JSON responses are automatically parsed.
          this.$emit('clicked')
          this.submitting = false
        })
        .catch(e => {
          this.errors.push(e.response.data.response)
        })
    }
  }

  // Fetches posts when the component is created.
  // created() {
  //
  // }
}
</script>
