<template>
  <div id="app">
    <header>
      <h1>Welcome to TestPage</h1>
    </header>
    <div>
      <Main />
    </div>
  </div>
</template>

<script>
import Main from './components/Main.vue'

export default {
  name: 'App',
  components: {
    Main,
  },
}
</script>
<style>
@import './assets/style.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin: 0;
  padding: 0;
}
header {
  text-align: center;
}
</style>
