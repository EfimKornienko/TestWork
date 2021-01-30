<template>
  <div class="card">
    <div v-if="users != null && comments != null">
      <div v-for="user in filter_users" :key="user.id">
        <Post
          :post = "post"
          :user = "user"
          @edit_card="edit_card"
          @delete_card="delete_card"
        />          
        <Comments
          :comments = "filter_comments"
          :show_comments = "show_comments"
        />
        <button class="comment_button" @click="show_comments = !show_comments">Show more comments</button>
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
    show_comments: false
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
    filter_users(){
      return this.users.filter(user => user.id == this.post.userId)
    },
    filter_comments(){
      return this.comments.filter(comment => comment.postId == this.post.id)
    }
  },
  methods: {
    edit_card(post){ 
      this.$emit('edit_card',post)
    },
    delete_card(post){
      this.$emit('delete_card',post)
    }
  }
}
</script>
<style scoped lang="scss">
.card {
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 15px;
  padding:15px;
  box-sizing: border-box;
}


</style>