<template>
  <div class="m-teacherInfo">
    <div class="innerPanel">
      <div class="imgWrap">
        <img v-if="coach.user.avatar" :src="coach.user.avatar | imgPostfix '120x120'" alt="">
      </div>
      <div class="nameWrap">
        <p class="name">{{coach.user.username}}</p>
        <i :class="{'u-icn-male' : coach.user.gender==0,'u-icn-female':coach.user.gender==1}"></i>
      </div>
      <div class="starWrap">
        <score-star class="stars" :score="coach.score"></score-star>
        {{coach.score}}
      </div>
      <ul class="labels">
        <li class="u-label label" v-for="item in coach.tag">{{item}}</li>
      </ul>
    </div>
  </div>
  <calendar-header class="g-divideWrap" :current-date.sync="currentDate"></calendar-header>
  <tabs :config.sync="tabConfig"></tabs>
  <ul class="m-groupScheduleList" v-if="tabConfig.index==1">
    <group-schedule :schedule="schedule" v-for="schedule in groupSchedules | orderBy orderByTime"
                    v-if="groupSchedules && groupSchedules.length"></group-schedule>
    <empty-status v-if="groupSchedules && groupSchedules.length==0" txt="该教练暂无团体课程"
                  icon-class="u-icn-emptyCourse"></empty-status>
    <loading v-if="groupLoading"></loading>
  </ul>
  <div v-if="tabConfig.index==2">
    <div class="m-privateScheduleList">
      <private-schedule :course="course" :params="privateParams" v-for="course in privateSchedules"
                        v-if="privateSchedules && privateSchedules.length"></private-schedule>
      <empty-status v-if="privateSchedules && privateSchedules.length==0" txt="该教练暂无私教课程"
                    icon-class="u-icn-emptyCourse"></empty-status>
    </div>
    <loading v-if="privateLoading"></loading>
  </div>
</template>
<script>
  import calendarHeader from '../components/calendar_header.vue'
  import emptyStatus from '../components/empty_status.vue'
  import groupSchedule from '../components/group_schedule.vue'
  import privateSchedule from '../components/private_schedule.vue'
  import tabs from '../components/tabs.vue'
  import scoreStar from '../components/score_star.vue'
  import imgAdjust from '../plugins/img_adjust'
  import loading from '../components/loading.vue'
  import requests from '../services/requests'
  import commonSvc from '../services/common_svc'
  import $moment from 'moment'
  import _ from 'lodash'

  export default{
    data(){
      return {
        coachId: '',
        currentDate: new Date(),
        tabConfig: null,
        privateParams: null,
        coach: null,
        groupSchedules: null,
        privateSchedules: null,
        isPullData: !0,
        groupLoading: !1,
        privateLoading: !1
      }
    },
    components: {
      calendarHeader: calendarHeader,
      emptyStatus: emptyStatus,
      groupSchedule: groupSchedule,
      privateSchedule: privateSchedule,
      tabs: tabs,
      scoreStar: scoreStar,
      imgAdjust: imgAdjust,
      loading: loading
    },
    methods: {
      setTabConfig(){
        var _tabs = [
          {index: 1, name: '团课课程'},
          {index: 2, name: '私教课程'}
        ];
        this.tabConfig = {
          tabs: _tabs,
          index: 1
        }
      },
      setParams(){
        this.privateParams = {
          coach_id: this.coachId,
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }
      },
      orderByTime: commonSvc.timeCompare,
      getCoachId(){
        var _reg = /mobile\/wx\/coaches\/([a-zA-z0-9]+)\/schedules\//;
        var _path = window.location.pathname;
        this.coachId = _path.match(_reg) ? _path.match(_reg)[1] : '';
      },
      _mergeSchedules(schedules){
        var _schedules = [];

        schedules.forEach(function (item) {
          var _temps = item.schedules || item.courses;

          _temps.forEach(function (schedule) {
            schedule.gym = item.gym;
            _schedules.push(schedule);
          })
        })

        return _schedules;
      },
      getCoachDetail(){
        var _self = this;

        requests.coachDetailReq.get({coachId: this.coachId}).then(function (response) {
          if (response.data.status == 200) {
            _self.coach = response.data.data.coach;
          }
        })
      },
      getGroupSchedules(){
        this.groupLoading = !0;

        var _self = this;
        var _params = {
          coachId: this.coachId,
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }

        requests.coachGroupSchedulesReq.get(_params).then(function (response) {
          _self.groupLoading = !1;
          if (response.data.status == 200) {
            _self.groupSchedules = _self._mergeSchedules(response.data.data.schedules);
          }
        })
      },
      getPrivateSchedules(){
        this.privateLoading = !0;

        var _self = this;
        var _params = {
          coachId: this.coachId,
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }

        requests.coachPrivateSchedulesReq.get(_params).then(function (response) {
          _self.privateLoading = !1;
          if (response.data.status == 200) {
            _self.privateSchedules = _self._mergeSchedules(response.data.data.courses);
          }
        })
      },
      getSchedules(){
        if (!this.isPullData) return;

        if (this.tabConfig.index == 1) {
          this.getGroupSchedules();
        } else {
          this.getPrivateSchedules();
        }

        this.isPullData = !1;
      },
    },
    created(){
      this.setTabConfig();
      this.getCoachId();
      this.setParams();
      this.getCoachDetail();
      this.getSchedules();
    },
    watch: {
      currentDate(newVal, oldVal){
        if (newVal !== oldVal) {
          this.isPullData = !0;
          this.groupSchedules = null;
          this.privateSchedules = null;
          this.getSchedules();
        }
      },
      tabConfig: {
        handler: function (newVal) {
          var _self = this;
          if (newVal) {
            _self.isPullData = ((newVal.index == 1 && !_self.groupSchedules) || (newVal.index == 2 && !_self.privateSchedules)) ? !0 : !1;
            _self.getSchedules();
          }
        },
        deep: true
      }
    }
  }
</script>
<style>
  @import "../styles/reset.css";
</style>

<style lang="less">
  @import "../styles/index.less";
</style>
