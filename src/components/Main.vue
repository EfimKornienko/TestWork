<template>
  <div>
    <InputGroup
      :searchShow="searchShow"
      @searchPost="searchPost"
      @closeButton="closeButton"
    />

    <Loader v-if="!posts.length || !comments.length || !users.length" />

    <div v-else>
      <div v-if="searchShow">
        <AllCards
          :posts="searchPostArray"
          :comments="comments"
          :users="users"
          @createPost="createPost"
          @editPost="editPost"
          @deletePost="deletePost"
        />
      </div>
      <div v-else>
        <AllCards
          :posts="posts"
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
import InputGroup from './InputGroup'
import { getPosts, getComments, getUsers } from '../queries'

export default {
  name: 'Main',
  components: {
    Loader,
    AllCards,
    InputGroup
  },
  data: () => ({
    posts: [],
    comments: [],
    users: [],

    searchShow: false,
    searchPostArray: []
  }),

  mounted() {
    this.posts = getPosts
    this.comments = getComments
    this.users = getUsers
  },
  methods: {
    searchPost(value) {
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
