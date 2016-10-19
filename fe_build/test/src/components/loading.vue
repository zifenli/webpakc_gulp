<template>
  <div class="m-loading">
    <i class="icon u-icn-loading"></i>加载中...
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    props:['show']
  }
</script>
