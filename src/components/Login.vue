<template>
  <main v-if="token">
    <button class="btnPrimary" type="button" v-on:click="removeToken">
      Logout
    </button>
  </main>
  <main v-else>
    <div class="form-container" v-if="showRegister == false">
      <form @submit.prevent="submitForm">
        <label for="email">Email</label>
        <input type="text" v-model="user.email" />
        <label for="password">Password</label>
        <input type="password" v-model="user.password" />
        <div class="errors" v-if="errors.length">
          <p>{{ errors }}</p>
        </div>
        <div class="btn-container">
          <button class="btnPrimary" type="submit">Login</button>
          <button
            class="btnPrimary"
            v-on:click="showRegister = !showRegister"
            type="button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    <div class="register" v-else-if="(showRegiser = true)">
      <Register @clicked="showRegister = !showRegister" />
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import Register from '@/components/Register.vue'

const apiKey = process.env.VUE_APP_API_KEY

export default {
  data() {
    return {
      user: {},
      errors: [],
      showRegister: false,
      token: localStorage.token,
    }
  },
  components: {
    Register,
  },

  methods: {
    showClickEditAbout: function (e) {},
    removeToken: function () {
      localStorage.removeItem('token')
      this.$router.push(this.$route.query.redirect || '/')
    },
    submitForm() {
      if (process.env.NODE_ENV == 'production') {
        var apiHost = 'https://api.perers.org/login'
      } else {
        var apiHost = 'http://localhost:1337/login'
      }
      axios
        .post(
          apiHost,
          {
            email: this.user.email,
            password: this.user.password,
          },
          {
            headers: {
              api_key: apiKey,
              'Content-type': 'application/json',
            },
          }
        )
        .then((response) => {
          // JSON responses are automatically parsed.
          localStorage.token = response.data.token
          this.$router.push(this.$route.query.redirect || '/')
        })
        .catch((e) => {
          this.errors.push(e.response.data.errors.title)
        })
    },
  },
}
</script>
