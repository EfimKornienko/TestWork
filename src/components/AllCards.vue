<template>
  <div class="all-cards">
    <button class="add-button" @click="modalAddBtn">Add post</button>
    <div v-for="post in posts" :key="post.id">
      <Card
        :post="post"
        :users="users"
        :comments="comments"
        @editCard="editCard"
        @deleteCard="deleteCard"
      />
    </div>
    <div v-if="modal === true">
      <Modal
        :modal="modal"
        :modalAdd="modalAdd"
        :modalEdit="modalEdit"
        :editId="editId"
        :deleteId="deleteId"
        :deleteStatus="deleteStatus"
        @closeModal="closeModal"
        @createPost="createPost"
        @editPost="editPost"
        @deletePost="deletePost"
      />
    </div>
  </div>
</template>

<script>
import Modal from './Modal'
import Card from './Card'
export default {
  name: 'AllCards',
  components: {
    Modal,
    Card
  },
  data: () => ({
    modal: false,
    modalAdd: false,
    modalEdit: false,

    // данные для Add, Edit и Delete
    editId: null,
    deleteId: null,
    deleteStatus: false
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
    modalAddBtn() {
      this.modal = true
      this.modalSdd = true
    },
    editCard(post) {
      this.modal = true
      this.modalEdit = true
      this.editId = post
    },
    deleteCard(post) {
      this.modal = true
      this.deleteStatus = true
      this.deleteId = post
    },
    closeModal() {
      this.modal = false
      this.modalEdit = false
      this.modalAdd = false
      this.deleteStatus = false
    },
    createPost(title, body) {
      this.modal = false
      this.modalAdd = false
      this.$emit('createPost', title, body)
    },
    editPost(id, title, body) {
      this.modalEdit = false
      this.modal = false
      this.editId = null
      this.$emit('editPost', id, title, body)
    },
    deletePost(id) {
      this.modal = false
      this.deleteStatus = false
      this.$emit('deletePost', id)
    }
  }
}
</script>
<style scoped>
.all-cards {
  width: 50%;
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;
  margin-top: 15px;
  box-sizing: border-box;
  margin-bottom: 10%;
}
.add-button {
  width: 25%;
}
@media screen and (max-width: 1024px) {
  .all-cards {
    grid-template-columns: 1fr;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
