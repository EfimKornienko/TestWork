<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <p v-if="modalAdd === true">Create new post</p>
            <p v-if="modalEdit === true">Edit post</p>
            <p v-if="deleteStatus === true" class="warning-title">
              Are you sure???
            </p>
          </slot>
        </div>

        <div v-if="deleteStatus === false">
          <div class="modal-body modal-title">
            <slot name="body">
              <p>Title</p>
              <textarea v-model="newTitle" />
            </slot>
          </div>

          <div class="modal-body modal-main">
            <slot name="body">
              <p>Main text</p>
              <textarea v-model="newBody" />
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button @click="$emit('closeModal')" class="modal-default-button">
                Back
              </button>
              <button
                v-if="modalAdd === true"
                class="modal-default-button"
                @click="$emit('createPost', newTitle, newBody)"
              >
                Create
              </button>
              <button
                v-if="modalEdit === true"
                class="modal-default-button"
                @click="$emit('editPost', editId, newTitle, newBody)"
              >
                Edit
              </button>
            </slot>
          </div>
        </div>

        <div v-else class="delete-buttons">
          <button @click="$emit('closeModal')" class="modal-default-button">
            No
          </button>
          <button
            @click="$emit('deletePost', deleteId)"
            class="modal-default-button delete-btn"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data: () => ({
    newBody: '',
    newTitle: ''
  }),
  props: {
    modal: {
      type: Boolean,
      default() {
        return false
      }
    },
    modalAdd: {
      type: Boolean,
      default() {
        return false
      }
    },
    modalEdit: {
      type: Boolean,
      default() {
        return false
      }
    },
    editId: {
      type: Number,
      default() {
        return null
      }
    },
    deleteId: {
      type: Number,
      default() {
        return null
      }
    },
    deleteStatus: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {
    editPost() {
      this.newTitle = ''
      this.newBody = ''
    },
    createPost() {
      this.newTitle = ''
      this.newBody = ''
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-mask p {
  font-size: 18px;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 400px;
  height: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-container textarea {
  width: 300px;
  height: 50px;
}
.modal-container button {
  font-size: 13px;
  margin-left: 10px;
  padding: 6px 4px 4px 4px;
  border: 1px solid black;
  background: #f6f6f6;
  border-radius: 8px;
}
.warning-title {
  font-size: 25px;
  margin-top: 25%;
  text-align: center;
}
.delete-buttons button {
  font-size: 17px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 25%;
}
.delete-btn {
  color: red;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media screen and (max-width: 500px) {
  .modal-container {
    width: 200px;
    height: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  .modal-container textarea {
    width: 100%;
  }
}
</style>
