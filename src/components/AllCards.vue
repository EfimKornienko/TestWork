<template>
  <div class="all_cards">
    <!-- Полный список постов -->
    <button class="add_button" @click="modal = true, modal_add = true">Add post</button>
      <div v-for="post in posts" :key="post.id">
        <Card
          :post = 'post'
          :users = 'users'
          :comments = 'comments'
        />
      </div>
    <div v-if="modal == true">
      <Modal
        :modal =  "modal"
        :modal_add = "modal_add"
        :modal_edit = "modal_edit"
        :edit_id = "edit_id"
        :delete_id = "delete_id"
        :delete_status = "delete_status"
      />
    </div>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import Card from './Card.vue'
export default {
  name: 'AllCards',
  components:{
    Modal,
    Card
  },
  data: () => ({
    modal: false,
    modal_add: false,
    modal_edit: false,

    // данные для Add, Edit и Delete
    edit_id:null,
    delete_id: null,
    delete_status: false
  }),
  props: {
    posts: {
        type: Array,
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
  }
}

</script>

<style scoped>

</style>