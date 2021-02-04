<template>
  <div class="comments">
    <h3>Comments:</h3>
    <div
      class="comment"
      :class="{ show: showComments }"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div>
        <h4 class="comment-title">{{ comment.name }}</h4>
        <p class="comment-body">{{ comment.body }}</p>
        <p class="comment-email">{{ comment.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',

  props: {
    comments: {
      type: Array,
      default() {
        return null
      }
    },
    showComments: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
.comments {
  margin-top: 10px;
}
.comment {
  margin-top: 20px;
}
.comment p {
  margin-bottom: 5px;
}
.comment-email {
  padding-bottom: 5px;
  border-bottom: solid 1px black;
}
.comment-button {
  all: unset;
  color: blue;
  margin-top: 10px;
}
.comment {
  display: block;
}
.comment:nth-child(n + 5) {
  display: none;
}
.show:nth-child(n + 5) {
  display: block;
}
</style>
