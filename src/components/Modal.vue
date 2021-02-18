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
  data() {
    return {
      newBody: '',
      newTitle: '',
    }
  },
  props: {
    modal: {
      type: Boolean,
      default() {
        return false
      },
    },
    modalAdd: {
      type: Boolean,
      default() {
        return false
      },
    },
    modalEdit: {
      type: Boolean,
      default() {
        return false
      },
    },
    editId: {
      type: Number,
      default() {
        return null
      },
    },
    deleteId: {
      type: Number,
      default() {
        return null
      },
    },
    deleteStatus: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  methods: {
    editPost() {
      this.newTitle = ''
      this.newBody = ''
    },
    createPost() {
      this.newTitle = ''
      this.newBody = ''
    },
  },
}
</script>
