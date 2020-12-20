<template>
  <div class="main_card">
    <template v-if="!posts && !comments && !users">
      <div class="loader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    </template>
    <template v-else>
      <div class="all_cards">
        <div class="input_group">
          <!-- Поиск реализован по полному значению Title -->
            <button class="close_button" v-if="search_show == true" @click="search_show = false,search_post_array = [],search_comments_array = [],search_users_array = []">Back</button>
            <input v-model="search_value" placeholder="Edit me">
            <button v-if="search_value != ''" @click="search_value = '' "> Clean </button>
            <button @click="search_post(search_value), search_show = true">Search</button>
            <button @click="modal = true, modal_add = true">Add post</button>
        </div>
        <!-- Полный список постов -->
        <div v-if="search_show == false">
          <div class="card" v-for="post in posts" :key="post.id">
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
                  <div class="input_group">
                    <button @click="modal = true,modal_edit = true,edit_id = post.id">Edit</button>
                    <button  @click="modal = true,delete_status = true, delete_id = post.id">Delete</button>
                  </div>
              </div>
              <div :id ="'c' + post.id" class="comments">
                <h3>Comments:</h3>
                <div class="comment" v-for="comment in comments.filter(comment => comment.postId == post.id)" :key="comment.id">
                  <h4 class="comment_title">{{comment.name}}</h4>
                  <p class="comment_body">{{comment.body}}</p>
                  <p class="comment_email">{{comment.email}}</p>
                </div>
                <button class="comment_button" v-if="comments.filter(comment => comment.postId == post.id).length > 3" @click="comments_show(post.id)">Show more comments</button>
              </div>
            </div>
          </div>

          <!-- Модальное окно для редактирования, добавления и удаления постов. Редактирование и добавление работает только на Title и Body  -->
          <div v-if="modal == true" class="modal-mask">
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
                      <button @click="modal = false, modal_add =false,modal_edit =false" class="modal-default-button">
                        Back
                      </button>
                      <button v-if="modal_add == true" class="modal-default-button" @click="create_post(new_title,new_body),modal_add =false,modal = false,new_title='',new_body= ''">
                        Create
                      </button>
                      <button v-if="modal_edit == true" class="modal-default-button" @click="edit_post(edit_id,new_title,new_body),modal_edit =false, modal = false,new_title='',new_body= ''">
                        Edit
                      </button>
                    </slot>
                  </div>
                </div>

                <div v-else class="delete_buttons">
                  <button @click="modal = false, delete_status = false" class="modal-default-button">
                    No
                  </button>
                  <button class="modal-default-button" @click="delete_post(delete_id),modal = false, delete_status = false">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- Вывод постов удовлетворяющих поиску -->
        <div v-else>
          <div v-if="search_post_array.length !== 0">
            <div class="card" v-for="post in search_post_array" :key="post.id">
              <div v-for="user in search_users_array.filter(user => user.id == post.userId)" :key="user.id">
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
                </div>
                <div :id ="'c' + post.id" class="comments">
                  <h3>Comments:</h3>
                  <div class="comment" v-for="comment in search_comments_array.filter(comment => comment.postId == post.id)" :key="comment.id">
                    <h4 class="comment_title">{{comment.name}}</h4>
                    <p class="comment_body">{{comment.body}}</p>
                    <p class="comment_email">{{comment.email}}</p>
                  </div>
                  <button class="comment_button" v-if="search_comments_array.filter(comment => comment.postId == post.id).length > 3" @click="comments_show(post.id)">Show more comments</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
              <p>Not found</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

const axios = require("axios")
export default {
  name: 'Cards',
  data: () => ({
    posts: null,
    comments: null,
    users: null,
    //  Поиск
    search_value: '',
    search_show: false,
    search_post_array: [],
    search_comments_array: [],
    search_users_array: [],
    // Модальное
    modal: false,
    modal_add: false,
    modal_edit: false,
    delete_status: false,
    // данные для Add, Edit и Delete
    edit_id:null,
    new_title: '',
    new_body: '',
    delete_id: null

  }),

    mounted: function () {
      const safe = this
      this.$nextTick( function() {
        axios({ 
           method: 'get',
           url: 'http://jsonplaceholder.typicode.com/posts'
           
        })
        .then(function(response) {
          safe.posts = response.data
          console.log(response)
        })
        axios({ 
           method: 'get',
           url: 'http://jsonplaceholder.typicode.com/comments'
           
        })
        .then(function(response) {
          safe.comments = response.data
        })
        axios({ 
           method: 'get',
           url: 'http://jsonplaceholder.typicode.com/users'
           
        })
        .then(function(response) {
          safe.users = response.data
        })
      })
      
    },
    methods: {
      // Открытие и закрытие комментариев после 3го
      comments_show(id) {
        if(document.getElementById('c' + id).getAttribute("class") ==  "comments") {
          
          document.getElementById('c' + id).className = "comments toggled"
        }
        else {
          document.getElementById('c' + id).className = "comments"
        }
      },
      //  Поиск
      search_post(value){
        if(value != ''){
          value = value.replace(/\s/g, '')
          this.posts.forEach(post => {
            let post_array = post.title
            if(post_array.replace(/\s/g, '') == value){
              this.search_post_array.push (post)
              this.users.forEach(user => {
                if (user.id == post.userId){
                  this.search_users_array.push (user)
                }
              });
               this.comments.forEach(comment => {
              if (comment.postId == post.id){
                this.search_comments_array.push (comment)
              }
            });
            } 
          });
        }
        console.log(this.search_post_array,this.search_comments_array,this.search_users_array)
      },
      create_post(title,body){
        if(title !== '' && body !== ''){
          let newPost = {
          id: this.posts.length + 1,
          userId: 1,
          title: title,
          body: body
        }
        this.posts.push(newPost)
        console.log(newPost)
        }
      },
      edit_post(id,title,body){
        if(title !== '' && body !== ''){
          this.posts[id - 1].title = title,
          this.posts[id - 1].body = body,
          this.edit_id = null
        }
      },
      delete_post(id){
        if(id !== this.posts.length){
          this.posts.splice(id - 1,1)
          console.log(this.posts)
          this.posts.forEach(post => {
            post.id -= 1
          });
        }
        else{
          this.posts.splice(id - 1,1)
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all_cards{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr; 
  margin: 0 auto;
  padding-right: 25%;
  padding-left: 25%;
  box-sizing: border-box;
  margin-top: 15px;
  margin-bottom: 10%;
}


.input_group input{
  width: 30%;
  margin-left: 10px;
  margin-right: 10px;
	font-size: 13px;
	padding: 6px 0 4px 10px;
	border: 1px solid #cecece;
	background: #F6F6f6;
	border-radius: 8px;
}
.close_button{
  all: unset;
}
.input_group button{
  font-size: 13px;
  margin-right: 10px;
  padding: 6px 4px 4px 4px;
  border: 1px solid black;
	background: #F6F6f6;
	border-radius: 8px;
}

.card {
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 15px;
  padding:15px;
  box-sizing: border-box;
}
/* Post styles */
.post_body{
  margin-top: 10px;
}
.post .input_group button{
  font-size: 15px;
  margin-top: 15px;
  margin-left: 0;
  margin-right: 10px;
}
.post .input_group button:nth-child(2){
  color: #ff0000ce;
}
.user_email{
  margin-top: 25px;
}
.comments h3{
  margin-top: 10px;
}
.comment{
  margin-top: 20px;
}
.comment p{
  margin-top: 10px;
  margin-bottom: 5px;
}
.comment_email{
  padding-bottom: 5px;
  border-bottom: solid 1px black;
}
.comment:nth-child(n+5){
  display: none;
}
.toggled .comment:nth-child(n+5 ){
  display: block;
}
.comment_button{
  all: unset;
  color:blue;
  margin-top: 10px;
}


.user_name{
display: inline-block;
}
.user_name:hover + .user_info{
  display: block;
  flex-direction: column;
}

.user_info{
  display: none;

}
.user_info:hover{
  opacity:1;
  flex-direction: column;
}
.user_info p {
  margin-left: 10px;
}


/* Loader */
.loader{
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fcf;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fcf transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Modal window */
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
.modal-mask p{
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
.modal-container textarea{
  width: 300px;
  height: 50px;
}
.modal-container button{
  font-size: 13px;
  margin-left: 10px;
  padding: 6px 4px 4px 4px;
  border: 1px solid black;
	background: #F6F6f6;
	border-radius: 8px;
}
.warning_title{
  font-size: 25px;
  margin-top: 25%;
  text-align: center;
}
.delete_buttons button{
  font-size: 17px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 25%;
  padding: 6px 4px 4px 4px;
  border: 1px solid black;
	background: #F6F6f6;
	border-radius: 8px;
}
.delete_buttons button:nth-child(2){
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

@media screen and (max-width: 1024px) {
  .all_cards{
    grid-template-columns: 1fr;
    padding-right: 15px;
    padding-left: 15px;
  }
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
  .modal-container textarea{
  width: 100%;
  }
}
</style>