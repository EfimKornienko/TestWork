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
      }
    },
    user: {
      type: Object,
      default() {
        return null
      }
    }
  }
}
</script>

<style scoped>
.post-body {
  margin-top: 10px;
}
.button-group {
  font-size: 15px;
  margin-top: 15px;
  margin-left: 0;
  margin-right: 15px;
}
.user-email {
  margin-top: 25px;
}
.delete-button {
  color: red;
}
.user-name {
  display: inline-block;
}
.user-name:hover + .user_info {
  display: block;
}
.user-info {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.user-info:hover {
  display: block;
}
.user-info p {
  margin-left: 10px;
}
</style>
