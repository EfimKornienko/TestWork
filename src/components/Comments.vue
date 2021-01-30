<template>
  <div class="comments">
    <h3>Comments:</h3>
    <div class="comment" :class="{show : show_comments}" v-for="comment in comments" :key="comment.id">
      <div>
        <h4 class="comment_title">{{comment.name}}</h4>
        <p class="comment_body">{{comment.body}}</p>
        <p class="comment_email">{{comment.email}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  
  props: {
    comments: {
      type: Array,
      default() {
        return null
      }
    },
    show_comments: {
      type: Boolean,
      default() {
        return false
      }
    } 
  }
}
</script>

<style scoped>
.comments{
  margin-top: 10px;
}
.comment{
  margin-top: 20px;
  } 
.comment p{
    margin-bottom: 5px;
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