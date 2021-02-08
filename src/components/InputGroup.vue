<template>
  <div class="input-group">
    <button v-if="searchShow" @click="$emit('closeButton')">
      Back
    </button>
    <input v-model="searchValue" placeholder="Edit me" />
    <button v-if="searchValue !== ''" @click="searchValue = ''">
      Clean
    </button>
    <button @click="$emit('searchPost', searchValue)">Search</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchValue: ''
    }
  },
  props: {
    searchShow: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
<style scoped>
.input-group {
  padding-right: 25%;
  padding-left: 25%;
  margin-top: 15px;
}
@media screen and (max-width: 1024px) {
  .input-group {
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
