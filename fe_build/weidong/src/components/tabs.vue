<template>
  <div class="m-tabs" >
    <div class="tab" :class="{'z-active':tab.index == config.index}" v-for="tab in config.tabs"
         v-on:click="changeTab(tab)">{{tab.name}}
       <i class="arrow" v-if="tab.index == config.index"></i>
    </div>
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
      config: {
        require: true,
        twoWay: true
      }
    },
    methods: {
      changeTab(tab){
        this.config.index = tab.index;
      }
    }
  }
</script>
<style lang="less">
  @import "../styles/tabs.less";
</style>
