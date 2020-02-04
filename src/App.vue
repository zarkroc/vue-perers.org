<template>
  <div id="app">
    <header>
      <Navigation />
    </header>
    <router-view />
    <Footer>
      <a href="https://www.linkedin.com/in/tomasperers/">Linkedin</a>
      <a href="https://github.com/zarkroc">GitHub</a>
    </Footer>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
  components: {
    Navigation
  }
}
</script>

<style>
@import url(assets/style.css);
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
