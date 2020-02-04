<template>
  <main>
    <About msg="Welcome to Your Vue.js App" />
  </main>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'

export default {
  name: 'home',
  components: {
    About
  }
}
</script>
