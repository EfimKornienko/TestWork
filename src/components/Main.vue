<template>
  <div>
    <div v-if="!posts && !comments && !users"> 
        <Loader/>
    </div>
    <div v-else>
         <div class="input_group">
            <button class="close_button" v-if="search_show == true" @click="search_show = false,search_post_array = [],search_comments_array = [],search_users_array = []">Back</button>
            <input v-model="search_value" placeholder="Edit me">
            <button v-if="search_value != ''" @click="search_value = '' "> Clean </button>
            <button @click="search_post(search_value), search_show = true">Search</button>
        </div> 

        <div v-if="search_show !== true">
          <AllCards
            :posts = "posts"
            :comments = "comments"
            :users = "users"
        />
        </div>
        <div v-else> 
            <Search
                :search_post_array = "search_post_array"
                :search_comments_array = "search_comments_array"
                :search_users_array = "search_users_array"
            />
        </div>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue'
import Loader from './Loader.vue'
import AllCards from './AllCards.vue'

export default {
  name: 'Main',
  components: {
    Search,
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
    search_users_array: [],


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
      }
    }
  }
</script>

<style lang="scss">
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
.input_group{
  padding-right: 25%;
  padding-left: 25%;
  margin-top: 15px;
}
.add_button{
  width: 25%;
}

//adaptation
@media screen and (max-width: 1024px) {
  .all_cards{
    grid-template-columns: 1fr;
    padding-right: 15px;
    padding-left: 15px;
  }
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
