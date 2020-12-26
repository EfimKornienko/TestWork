<template>
  <div v-if="search_post_array.length !== 0">
    <div class="all_cards">
        <div v-for="post in search_post_array" :key="post.id">
            <Card
                :post = 'post'
                :users = 'search_users_array'
                :comments = 'search_comments_array'
            />
        </div>
        <div v-if="modal == true">
            <Modal
                :modal =  "modal"
                :modal_edit = "modal_edit"
                :edit_id = "edit_id"
                :delete_id = "delete_id"
                :delete_status = "delete_status"
            />
        </div>
    </div>
  </div>
  <div v-else>
    <p>Not found</p>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import Card from './Card.vue'
export default {
    name: 'Search',
    components:{
        Card,
        Modal
    },
    data: () =>({
        modal: false,
        modal_add: false,
        modal_edit: false,
        // данные для Add, Edit и Delete
        edit_id:null,
        delete_id: null,
        delete_status: false
    }),
    props: {
        search_post_array: {
            type: Array,
            default() {
                return null
            }
        },
        search_comments_array: {
            type: Array,
            default() {
                return null
            }
        },
        search_users_array: {
            type: Array,
            default() {
                return null
            }
        },
        search_value:{
            type: String,
            default() {
                return ''
            }
        }
    },
}
</script>
<style scoped>

</style>