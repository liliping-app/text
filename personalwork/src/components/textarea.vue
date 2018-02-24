<template>
  <div class="commentBox">
    <h3>发表评论</h3>
    <b v-if="type">你回复&nbsp;{{name}}</b>
    <textarea name="" value="请填写评论内容" v-model="commentText"></textarea>
    <button class="btn" @click="addComment">发表</button>
    <button class="btn" @click="canelComment">取消</button>
  </div>
  
</template>
<script>
  export default{
    props: ['type','name'],
    data () {
      return {
        commentText:''
      }
    },
    methods: {
      addComment: function() {
        console.log(3232)
        this.$emit("submit",this.commentText);
        this.commentText = "";
        console.log(this.commentText,"changeCommer");
      },
      canelComment: function() {
        this.$emit("canel");
        this.commentText = "";
      }
    }

  }
</script>
<style scoped lang="less">
  .commentBox h3 {
    color: #634322; 
    background: #94a3ac; 
    padding: 8px 15px; 
    text-align: left; 
    font-size: 16px;
  }
  .noComment {
    display:none;
  }
  .comment {
    margin-bottom:15px;
  }
  .comment + .comment, .reply + .reply{
    border-top:1px solid #ccc;
  }
  .comment b{
    color:#323435; 
    font-size:16px; 
    display:block; 
    margin:5px 0;
  }
  .comment b span {
    color:#333; 
    font-size:14px; 
    margin-left:20px;
  }
  .comment p {
    font-size:16px; 
    color:#333;
    cursor: pointer;
  }
  .commentBox textarea {
    overflow: auto; 
    width: 100%; 
    height: 95px; 
    outline: none; 
    resize: none;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .commentBox button {
    float:right; 
    margin-left:20px; 
    padding:5px 30px; 
    background:#cbd3dc; 
    text-decoration: none;
    border-radius:5px; 
    color:#666; 
    font-size:16px;
    border: 0 none;
  }
  .commentBox button:hover {
    background:#94a3ac;
    box-shadow: 2px 2px 3px #666;
    color: #000;
  }
  .reply {
    margin:15px 0 15px 50px;
  }
</style>