<template>
  <div class="m-spinner">
    <p class="txt"><i class="icon u-icn-loading"></i>{{txt}}</p>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },
    props: {
      txt: String
    }
  }
</script>
<style lang="less">
  @import "../styles/spinner.less";
</style>
