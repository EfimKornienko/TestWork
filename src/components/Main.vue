<template>
  <div>
    <div v-if="posts === null || posts.length === 0">
      <Loader />
    </div>
    <div v-else>
      <div class="input-group">
        <button v-if="searchShow" @click="closeButton">
          Back
        </button>
        <input v-model="searchValue" placeholder="Edit me" />
        <button v-if="searchValue !== ''" @click="searchValue = ''">
          Clean
        </button>
        <button @click="searchPost()">Search</button>
      </div>

      <div v-if="searchShow !== true">
        <AllCards
          :posts="posts"
          :comments="comments"
          :users="users"
          @createPost="createPost"
          @editPost="editPost"
          @deletePost="deletePost"
        />
      </div>
      <div v-else>
        <AllCards
          :posts="searchPostArray"
          :comments="comments"
          :users="users"
          @createPost="createPost"
          @editPost="editPost"
          @deletePost="deletePost"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader'
import AllCards from './AllCards'
import { getPosts, getComments, getUsers } from '../queries'

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

    searchValue: '',
    searchShow: false,
    searchPostArray: []
  }),

  mounted() {
    this.posts = getPosts
    this.comments = getComments
    this.users = getUsers
  },
  methods: {
    searchPost() {
      let value = this.searchValue
      if (value != '') {
        value = value.replace(/\s/g, '').toLowerCase()
        this.searchPostArray = this.posts.filter(
          (post) => post.title.replace(/\s/g, '').toLowerCase() === value
        )
      }
      this.searchShow = true
    },
    createPost(title, body) {
      if (title !== '' && body !== '') {
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
    editPost(id, title, body) {
      if (title !== '' && body !== '') {
        this.posts[id - 1].title = title
        this.posts[id - 1].body = body
      }
    },
    deletePost(id) {
      if (id !== this.posts.length) {
        this.posts.splice(id - 1, 1)
        console.log(this.posts)
        this.posts.forEach((post) => {
          post.id -= 1
        })
      } else {
        this.posts.splice(id - 1, 1)
      }
    },
    closeButton() {
      this.searchShow = false
      this.searchPostArray = []
    }
  }
}
</script>

<style lang="scss">
.input-group {
  padding-right: 25%;
  padding-left: 25%;
  margin-top: 15px;
}
@media screen and (max-width: 1024px) {
  .input-group {
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
  .modal-container textarea {
    width: 100%;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    position: relative;
  }
}
</style>
