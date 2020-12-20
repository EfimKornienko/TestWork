<template>
  <div id="app">
    <header>
      <h1>Welcome to TestPage</h1>
    </header>
    <Cards/>
  </div>
</template>

<script>
import Cards from './components/Cards.vue'

export default {
  name: 'App',
  components: {
    Cards
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
* {
  margin:0;
  padding: 0;
}
header {
  text-align: center;
  
}
</style>
