<template>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <p v-if="modal_add == true">Create new post</p>
              <p v-if="modal_edit == true">Edit post</p>
              <p v-if="delete_status == true" class="warning_title">Are you sure???</p>
            </slot>
          </div>

          <div v-if="delete_status == false">
            <div class="modal-body modal-title">
              <slot name="body">
                  <p>Title</p>
                  <textarea v-model="new_title"></textarea>
              </slot>
            </div>

            <div class="modal-body modal-main">
              <slot name="body">
                <p>Main text</p>
                <textarea v-model="new_body"></textarea>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button @click="close_modal()" class="modal-default-button">
                  Back
                </button>
                <button v-if="modal_add == true" class="modal-default-button" 
                @click="create_post(new_title,new_body),new_title='',new_body= ''">
                  Create
                </button>
                <button v-if="modal_edit == true" class="modal-default-button" 
                @click="edit_post(edit_id,new_title,new_body),new_title ='',new_body= ''">
                  Edit
                </button>
              </slot>
            </div>
          </div>

          <div v-else class="delete_buttons">
            <button @click="close_modal()" class="modal-default-button">
              No
            </button>
            <button class="modal-default-button" @click="delete_post()">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div> 
</template>

<script>
export default {
    name: "Modal",
    data: () => ({
        new_body: '',
        new_title: ''
    }),
    props: {
        modal: {
            type: Boolean,
            default() {
                return null
            }
        },
        modal_add: {
            type: Boolean,
            default() {
                return null
            }
        },
        modal_edit: {
            type: Boolean,
            default() {
                return null
            }
        }, 
        edit_id: {
            type: Number,
            default() {
                return null
            }
        },
        delete_id: {
            type: Number,
            default() {
                return null
            }
        },
        delete_status: {
            type: Boolean,
            default() {
                return null
            }
        }   
    },
    methods: {
        create_post(title,body){
        if(title !== '' && body !== ''){
            let newPost = {
            id: this.$parent.$parent.$data.posts.length + 1,
            userId: 1,
            title: title,
            body: body
        }
        this.$parent.$parent.posts.push(newPost)
        console.log(newPost)
        }
        this.$parent.modal = false
        this.$parent.modal_add = false
        },
        edit_post(id,title,body){
        if(title !== '' && body !== ''){
            this.$parent.$parent.$data.posts[id - 1].title = title,
            this.$parent.$parent.$data.posts[id - 1].body = body,
            this.$parent.edit_id = null
            }
            this.$parent.modal_edit =false
            this.$parent.modal = false
        },
        delete_post(id){
        if(id !== this.$parent.$parent.$data.posts.length){
            this.$parent.$parent.$data.posts.splice(id - 1,1)
            console.log(this.posts)
            this.$parent.$parent.$data.posts.forEach(post => {
            post.id -= 1
            });
        }
        else{
            this.$parent.$parent.posts.splice(id - 1,1)
        }
        this.$parent.modal = false 
        this.$parent.delete_status = false
        },
        close_modal(){
            this.$parent.modal = false
            this.$parent.modal_edit =false
            this.$parent.modal_add = false
            this.$parent.delete_status = false   
        }
    }
}
</script>