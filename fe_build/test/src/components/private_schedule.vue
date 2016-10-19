<template>
  <section>
    <ul class="schedules">
      <li class="retainbb">
        <header class="f-cf">
          <div class="sideWrap f-fl">
            <div class="imgWrap">
              <img v-if="course.image" :src="course.image | imgPostfix '120x120'" alt="课程图片"/>
            </div>
          </div>
          <div class="mainWrap">
            <div class="header f-cf">
              <div class="titleWrap f-fl">
                <h3 class="title f-thide">{{course.name}}</h3>
              </div>
            </div>
            <div class="infoWrap">
              <p class="txt">时长:{{course.length/60}}min</p>
              <p class="txt s-txt-warn">300元起</p>
            </div>
            <div class="btnWrap">
              <a class="btn u-btn-sub btn-2" :class="{'z-expansion':isExpended }" v-on:click="toggleTable($event)">{{isExpended
                ? '收起' : '选择时间'}}</a>
            </div>
          </div>
        </header>
        <section class="retainbt" v-if="isExpended">
          <ul class="timetables">
            <li :class="{'z-disabled': !item.can_order, 'z-active': item.selected}"
                v-on:click="selectSchedule($event,item)"
                v-for="item in slices.schedules">
              {{item.datetime | date 'HH:mm'}}<br/><span class="span">{{item.weixin.price}}元/人</span>
            </li>
          </ul>
          <empty-status class="f-dn" txt="该课程已约满!"></empty-status>
          <div class="txtWrap f-dn">
            <p>载入中...</p>
          </div>
          <div class="btnWrap f-cf">
            <div class="half f-fl">
              <a class="u-btn u-btn-full u-btn-white" href="" v-on:click="toggleTable($event)">取消</a>
            </div>
            <div class="half f-fl">
              <a class="u-btn u-btn-full u-btn-main" :class="{'z-disable' : !selectedSlice}"
                 v-on:click="goOrder($event)">确定预约</a>
            </div>
          </div>
        </section>
      </li>
    </ul>
  </section>
</template>
<script>
  import emptyStatus from "./empty_status.vue"
  import requests from "../services/requests"

  export default{
    data(){
      return {
        isExpended: !1,
        slices: null,
        selectedSlice: null
      }
    },
    props: {
      course: {
        required: true
      },
      params: {
        required: true
      }
    },
    components: {
      emptyStatus: emptyStatus
    },
    methods: {
      _getCourseSlices(){
        var _self = this;

        var _params = _.extend(this.params, {
          gym_id: this.course.gym.id,
          course_id: this.course.id
        });

        requests.privateSliceReq.get(_params).then(function (response) {
          if (response.data.status == 200) {
            _.forEach(response.data.data.schedules.schedules, function (schedule, key) {
              schedule.selected = !1;
            });
            _self.slices = response.data.data.schedules;
          }
        })
      },
      toggleTable($event){
        $event.preventDefault();
        this.isExpended = !this.isExpended;

        if (this.isExpended && !this.slices) {
          this._getCourseSlices();
        }
      },
      selectSchedule($event, item){
        $event.preventDefault();

        if (item.can_order) {
          _.forEach(this.slices.schedules, function (schedule, key) {
            schedule.selected = !1;
          });
          item.selected = !0;
          this.selectedSlice = item;
        }
      },
      goOrder($event){
        $event.preventDefault();
        window.location.href=`/mobile/wx/gyms/${this.course.gym.id}/private/order/?timetable_id=${this.selectedSlice.timetable_id}&start=${this.selectedSlice.datetime}`;
      }
    }
  }
</script>
