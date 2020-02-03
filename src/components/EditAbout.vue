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
          <button v-on:click="submitForm" class="btnPrimary" type="submit">
            Save
          </button>
          <div class="errors" v-if="errors.length">
            <p>{{ errors }}</p>
          </div>
        </form>
      </section>
    </div>
    <button v-on:click="showClickEditAbout" class="btnPrimary">Edit</button>
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
      axios
        .put(
          `http://localhost:1337`,
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
          console.log(response)
        })
        .catch(e => {
          console.log('====================================')
          console.log(e.response.data)
          console.log('====================================')
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
