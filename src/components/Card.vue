<template>
  <div class="card">
    <div v-if="users !== null && comments !== null">
      <div v-for="user in filterUsers" :key="user.id">
        <CardPost
          :post="post"
          :user="user"
          @editCard="editCard"
          @deleteCard="deleteCard"
        />
        <CardComments :comments="filterComments" :showComments="showComments" />
        <button @click="showComments = !showComments">
          Show more comments
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CardPost from './CardPost'
import CardComments from './CardComments'

export default {
  name: 'Card',
  components: {
    CardPost,
    CardComments,
  },
  data() {
    return {
      showComments: false,
    }
  },
  props: {
    post: {
      type: Object,
      default() {
        return null
      },
    },
    comments: {
      type: Array,
      default() {
        return null
      },
    },
    users: {
      type: Array,
      default() {
        return null
      },
    },
  },
  computed: {
    filterUsers() {
      return this.users.filter((user) => user.id === this.post.userId)
    },
    filterComments() {
      return this.comments.filter((comment) => comment.postId === this.post.id)
    },
  },
  methods: {
    editCard(post) {
      this.$emit('editCard', post)
    },
    deleteCard(post) {
      this.$emit('deleteCard', post)
    },
  },
}
</script>
