<template>
  <div class="m-counter">
    <i class="icon" v-on:click="changeCount($event,-1)">-</i>
    <span class="count"><em class="em">{{count}}</em>/{{capacity}}人</span>
    <i class="icon" v-on:click="changeCount($event,1)">+</i>
  </div>
</template>
<style lang="less">
	@import "../styles/counter.less";
</style>
<script>
  export default{
    data(){
    },
    props: {
      count: {
        require: true
      },
      capacity: {
        require: true
      }
    },
    methods: {
      changeCount($event, offset){
        var _count = this.count + offset;

        if (_count > this.capacity) {
          this.count = this.capacity;
          return;
        }

        if (_count < 0) {
          this.count = 0;
          return;
        }

        this.count = _count;
      }
    }
  }
</script>
