<template>
  <!-- <div class="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div> -->
  <img class="loader" src="https://i.gifer.com/72gi.gif" />
</template>

<script>
export default {
  name: 'Cards'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
}
</style>
