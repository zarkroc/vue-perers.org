<template>
  <section class="login">
    <h2>Register</h2>
    <div class="login-container">
      <section>
        <form @submit.prevent="submitForm">
          <label for="email"></label>
          <input type="text" v-model="user.email" />
          <label for="password"></label>
          <input type="password" v-model="user.password" />
          <button class="btnPrimary" type="submit">
            Register
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
      user: {},
      errors: []
    }
  },

  methods: {
    showClickEditAbout: function(e) {},
    submitForm() {
      axios
        .post(
          `http://localhost:1337/register`,
          {
            email: this.user.email,
            password: this.user.password
          },
          {
            headers: {
              api_key: apiKey,
              'Content-type': 'application/json'
            }
          }
        )
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.token = response.data.token
          this.$emit('clicked')
          this.submitting = false
        })
        .catch(e => {
          this.errors.push(e.response.data.errors.title)
        })
    }
  }

  // Fetches posts when the component is created.
  // created() {
  //
  // }
}
</script>
