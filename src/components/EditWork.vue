<template>
  <section class="work">
    <h2>Editera</h2>
    <div class="work-container" v-if="work">
      <section v-if="work">
        <form @submit.prevent="submitForm">
          <label for="company"></label>
          <input type="text" v-model="work.company" />
          <label for="role"></label>
          <input type="text" v-model="work.role" />
          <label for="description"></label>
          <input type="text" v-model="work.description" />
          <label for="start"></label>
          <input type="text" v-model="work.start" />
          <label for="stop"></label>
          <input type="text" v-model="work.stop" />
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
      errors: []
    }
  },
  props: {
    work: {
      type: Object
    }
  },

  methods: {
    submitForm() {
      this.submitting = true
      if (process.env.NODE_ENV == 'production') {
        var apiHost = 'https://api.perers.org/workHistory'
      } else {
        var apiHost = 'http://localhost:1337/workHistory'
      }
      axios
        .put(
          apiHost,
          {
            id: this.work._id,
            company: this.work.company,
            role: this.work.role,
            description: this.work.description,
            start: this.work.start,
            stop: this.work.stop
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
          this.$emit('updated')
          this.submitting = false
        })
        .catch(e => {
          this.errors.push(e.response.data.errors.title)
        })
    }
  }
}
</script>
