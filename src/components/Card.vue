<template>
  <div class="card">
    <div v-if="users !== null && comments !== null">
      <div v-for="user in filterUsers" :key="user.id">
        <Post
          :post="post"
          :user="user"
          @editCard="editCard"
          @deleteCard="deleteCard"
        />
        <Comments :comments="filterComments" :showComments="showComments" />
        <button @click="showComments = !showComments">
          Show more comments
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Post from './Post'
import Comments from './Comments'

export default {
  name: 'Card',
  components: {
    Post,
    Comments
  },
  data: () => ({
    showComments: false
  }),
  props: {
    post: {
      type: Object,
      default() {
        return null
      }
    },
    comments: {
      type: Array,
      default() {
        return null
      }
    },
    users: {
      type: Array,
      default() {
        return null
      }
    }
  },
  computed: {
    filterUsers() {
      return this.users.filter((user) => user.id === this.post.userId)
    },
    filterComments() {
      return this.comments.filter((comment) => comment.postId === this.post.id)
    }
  },
  methods: {
    editCard(post) {
      this.$emit('editCard', post)
    },
    deleteCard(post) {
      this.$emit('deleteCard', post)
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 15px;
  padding: 15px;
  box-sizing: border-box;
}
</style>
