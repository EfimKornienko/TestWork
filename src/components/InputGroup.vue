<template>
  <div class="input-group">
    <button v-if="searchShow" class="back-btn" @click="$emit('closeButton')">
      Back
    </button>
    <input v-model.trim="searchValue" placeholder="Edit me" />
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
      searchValue: '',
    }
  },
  props: {
    searchShow: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>
