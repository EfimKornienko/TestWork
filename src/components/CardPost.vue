<template>
  <div class="post">
    <h3 class="post-title">{{ post.title }}</h3>
    <p class="post-body">{{ post.body }}</p>
    <p class="user-email">Email: {{ user.email }}</p>
    <div class="user-name">
      <p>Post by: {{ user.name }}</p>
    </div>
    <div class="user-info">
      <h4>Infomation about author:</h4>
      <p>Name: {{ user.name }}</p>
      <p>Address: {{ user.address.street }}</p>
      <p>Tlephone number: {{ user.phone }}</p>
    </div>
    <div class="button-group">
      <button @click="$emit('editCard', post.id)">Edit</button>
      <button class="delete-button" @click="$emit('deleteCard', post.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',

  props: {
    post: {
      type: Object,
      default() {
        return null
      },
    },
    user: {
      type: Object,
      default() {
        return null
      },
    },
  },
}
</script>
