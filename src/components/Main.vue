<template>
  <div>
    <div v-if="!posts || !comments || !users"> 
        <Loader/>
    </div>
    <div v-else>
      <div class="input_group">
        <button class="close_button" v-if="search_show == true" @click="close_button">Back</button>
        <input v-model="search_value" placeholder="Edit me">
        <button v-if="search_value != ''" @click="search_value = '' "> Clean </button>
        <button @click="search_post(search_value), search_show = true">Search</button>
      </div> 

      <div v-if="search_show !== true">
        <AllCards
          :posts = "posts"
          :comments = "comments"
          :users = "users"
          @create_post = "create_post"
          @edit_post = "edit_post"
          @delete_post = "delete_post"
        />
      </div>
      <div v-else> 
        <AllCards
          :posts = "search_post_array"
          :comments = "search_comments_array"
          :users = "search_users_array"
          @create_post = "create_post"
          @edit_post = "edit_post"
          @delete_post = "delete_post"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'
import AllCards from './AllCards'

export default {
  name: 'Main',
  components: {
    Loader,
    AllCards
  },
  data: () => ({
  posts: null,
  comments: null,
  users: null,

  search_value: '',
  search_show: false,
  search_post_array: [],
  search_comments_array: [],
  search_users_array: []
  }),

  mounted: function () {
    
    fetch('http://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.posts = data;
    });

    fetch('http://jsonplaceholder.typicode.com/comments')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.comments = data;
    });

    fetch('http://jsonplaceholder.typicode.com/users')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.users = data;
    });
  }, 
  methods: {
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
      this.posts[id - 1].body = body
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
    },
    close_button(){
      this.search_show = false,
      this.search_post_array = []
      this.search_comments_array = []
      this.search_users_array = []
    }
  }
}
</script>

<style lang="scss">

.input_group{
  padding-right: 25%;
  padding-left: 25%;
  margin-top: 15px;
}
@media screen and (max-width: 1024px) {
  .input_group{
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
  .user_info{
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
