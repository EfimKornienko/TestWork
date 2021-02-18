<template>
  <div class="comments">
    <h3>Comments:</h3>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="comment"
      :class="{ show: showComments }"
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
  name: 'CardComments',

  props: {
    comments: {
      type: Array,
      default() {
        return null
      },
    },
    showComments: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
}
</script>
