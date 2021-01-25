<template>
  <div class="all_cards">
    <!-- Полный список постов -->
    <button class="add_button" @click="modal = true, modal_add = true">Add post</button>
      <div v-for="post in posts" :key="post.id">
        <Card
          :post = 'post'
          :users = 'users'
          :comments = 'comments'
          @edit_card="edit_card"
          @delete_card="delete_card"
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
        @close_modal= "close_modal"
        @create_post = "create_post"
        @edit_post = "edit_post"
        @delete_post = "delete_post"
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
  },
  methods: {
    edit_card(post){ 
      this.modal = true
      this.modal_edit = true
      this.edit_id = post
    },
    delete_card(post){
      this.modal = true
      this.delete_status = true
      this.delete_id = post
    },
    close_modal(){
        this.modal = false
        this.modal_edit =false
        this.modal_add = false
        this.delete_status = false   
    },
    create_post(title,body){
      this.modal = false
      this.modal_add = false
      this.$emit('create_post',title,body)
    }, 
    edit_post(id,title,body){
      this.modal_edit =false
      this.modal = false
      this.edit_id = null
      this.$emit('edit_post',id,title,body)
    },
    delete_post(id){
      this.modal = false 
      this.delete_status = false
      this.$emit('delete_post',id)
      }
    }  
  }


</script>
<style scoped>
.all_cards{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr; 
  margin: 0 auto;
  padding-right: 25%;
  padding-left: 25%;
  margin-top: 15px;
  box-sizing: border-box;
  margin-bottom: 10%;
}
</style>