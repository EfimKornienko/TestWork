<template>
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
        <button @click="$emit('edit_card',post.id)">Edit</button>
        <button @click="$emit('delete_card',post.id)">Delete</button>
    </div>
  </div> 
</template>

<script>
export default {
  name: "Post",
  
  props: {
    post: {
      type: Object,
      default() {
        return null
      }
    },
    user: {
      type: Object,
      default() {
        return null
      }
    }   
  }
}
</script>

<style scoped>
.post_body{
  margin-top: 10px;
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
</style>