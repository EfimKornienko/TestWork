<template>
    <div class="card">
        <div v-if="users != null && comments != null">
            <div v-for="user in users.filter(user => user.id == post.userId)" :key="user.id">
                <div class="post">
                    <h3 class="post_title">{{ post.title }}</h3>
                    <p class="post_body">{{ post.body  }}</p>
                    <p class="user_email"> Email: {{user.email}} </p>
                    <div class="user_name">
                        <p> Post by: {{user.name}} </p>
                    </div>
                    <div class="user_info">
                        <h4>Infomation about author:</h4>
                        <p> Name: {{user.name}} </p>
                        <p> Address: {{user.address.street}} </p>
                        <p> Tlephone number: {{user.phone}} </p>
                    </div>
                    <div class="button_group">
                        <button @click="edit_button()">Edit</button>
                        <button @click="delete_button()">Delete</button>
                    </div>
                </div>           
                <div class="comments">
                    <h3>Comments:</h3>
                        <div class="comment" :class="{show : show_comments}" v-for="comment in comments.filter(comment => comment.postId == post.id)" :key="comment.id">
                            <div>
                                <h4 class="comment_title">{{comment.name}}</h4>
                                <p class="comment_body">{{comment.body}}</p>
                                <p class="comment_email">{{comment.email}}</p>
                            </div>
                        </div>
                    <button class="comment_button" @click="show_comments = !show_comments">Show more comments</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
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
    methods: {
        edit_button(){ 
            this.$parent.modal = true
            this.$parent.modal_edit = true
            this.$parent.edit_id = this.post.id
        },
        delete_button(){
            this.$parent.modal = true
            this.$parent.delete_status = true
            this.$parent.delete_id = this.post.id
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
/* Post styles */
.post_body, .comments h3{
  margin-top: 10px;
  .comment p{
    margin-bottom: 5px;
  }
}
.button_group{
  font-size: 15px;
  margin-top: 15px;
  margin-left: 0;
  margin-right: 15px;
}
.button_group button:nth-child(2){
  color: #ff0000ce;
}
.user_email{
  margin-top: 25px;
}
.user_name{
  display: inline-block;
}
.user_name:hover + .user_info{
  display: block;
}
.user_info{ 
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
.user_info:hover{
  display: block;
}
.user_info p {
  margin-left: 10px;
}
// comments
.comment{
  margin-top: 20px;
  } 

.comment_email{
  padding-bottom: 5px;
  border-bottom: solid 1px black;
}
.comment_button{
  all: unset;
  color:blue;
  margin-top: 10px;
}
.comment{
    display: block;
}
.comment:nth-child(n + 5){
    display: none;
} 
.show:nth-child(n + 5){
    display: block;
}

</style>