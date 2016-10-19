<template>
  <li class="retainbb retainbt">
    <div class="f-cf">
      <div class="sideWrap f-fl">
        <p class="main">{{schedule.start | date 'HH:mm'}}</p>
        <p class="sub">{{schedule.course.length/60}}min</p>
      </div>
      <div class="mainWrap">
        <div class="container f-cf">
          <div class="imgWrap f-fl">
            <img v-if="schedule.course.photo" :src="schedule.course.photo | imgPostfix '120x120'" alt="课程图片"/>
          </div>
          <div class="txtWrap">
            <div class="header f-cf">
              <div class="titleWrap f-fl">
                <h3 class="title f-thide">{{schedule.course.name}}</h3>
              </div>
            </div>
            <div class="scheduleInfo">
              <p class="f-thide"><span class="txt">{{schedule.gym.name}}</span></p>
              <p class="f-thide"><span class="txt s-txt-warn">{{schedule.weixin.price}}元/人</span><span class="txt f-thide">还可报名{{schedule.capacity}}人</span></p>
            </div>
          </div>
          <div class="btnWrap">
            <button class="u-btn u-btn-sub btn-2" v-on:click="goOrder($event)">预约</button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script>

  export default{
    data(){
      return {

      }
    },
    props:{
      schedule:{
        required:true
      }
    },
    methods:{
      goOrder($event){
        $event.preventDefault();
        window.location.href=`/mobile/wx/gyms/${this.schedule.gym.id}/group/order/?schedule_id=${this.schedule.id}`;
      }
    }
  }
</script>
