<template>
  <div class="m-infoPanel g-divideWrap-2">
    <div class="container">
      <div class="imgWrap">
        <img v-if="gym.photo" :src="gym.photo | imgPostfix '120x120'" alt="工作室图片">
      </div>
      <div class="txtWrap">
        <h3>{{gym.name}}</h3>
        <p class="txt">营业时间：10:00 - 19:00</p>
      </div>
    </div>
  </div>
  <ul class="m-infoList-2">
    <li class="item retainbb" v-on:click="call(gym.contact)">
      <i class="icon u-icn-phone"></i>
      <span class="txt"><a :href="tel:{{gym.contact}}">{{gym.contact}}</a></span>
      <i class="arrow u-icon-arrow-right"></i>
    </li>
    <li class="item">
      <i class="icon u-icn-address"></i>
      <span class="txt">{{gym.address}}</span>
      <i class="arrow u-icon-arrow-right"></i>
    </li>
  </ul>
  <p class="u-gray-txt">/ 健身房课程 /</p>
  <calendar-header class="retainbt" :current-date.sync="currentDate"></calendar-header>
  <tabs :config.sync="tabConfig"></tabs>
  <ul class="m-groupScheduleList" v-if="tabConfig.index==1">
    <group-schedule v-for="item in groupSchedules | orderBy orderByTime " :schedule="item"></group-schedule>
    <empty-status v-if="groupSchedules && groupSchedules.length==0" txt="该教练暂无团体课程"
                  icon-class="u-icn-emptyCourse"></empty-status>
    <loading v-if="groupLoading"></loading>
  </ul>
  <div v-if="tabConfig.index==2">
    <slide-gallery v-if="teachers && teachers.length" class="gray g-divideWrap" :index.sync="currentTeacherIndex">
      <li class="m-showCard f-cf j-flag" v-for="teacher in teachers">
        <div class="showCard-sideWrap">
          <div class="showCard-imgWrap">
            <img class="img" :src="teacher.image" alt="教练头像">
          </div>
          <p class="name f-thide">{{teacher.name}}</p>
          <score-star :score="teacher.score"></score-star>
        </div>
        <div class="showCard-mainWrap">
          <p class="des">(近30天记录)</p>
          <ul class="statLst">
            <li class="statItem">
              <p class="count">{{teacher.schedules_count}}</p>
              <p class="type">上课数</p>
            </li>
            <li class="statItem">
              <p class="count">{{teacher.members_count}}</p>
              <p class="type">服务会员数</p>
            </li>
          </ul>
          <ul class="tagLst">
            <li class="u-mark u-mark-light tag" v-for="tag in teacher.tags">减脂</li>
          </ul>
        </div>
      </li>
    </slide-gallery>
    <div class="m-privateScheduleList" v-if="currentTeacher.courses.length">
      <i class="icon"></i>
      <private-schedule class="retainbt"
                        v-for="item in currentTeacher.courses"
                        :params="privateParams"
                        :course="item"></private-schedule>
    </div>
    <empty-status v-if="teachers && teachers.length==0" txt="该工作室暂无教练"
                  icon-class="u-icn-emptyCourse"></empty-status>
    <empty-status v-if="currentTeacher && currentTeacher.courses.length==0" txt="该教练暂无私教课程"
                  icon-class="u-icn-emptyCourse"></empty-status>
    <loading v-if="teacherLoading"></loading>
  </div>
</template>
<script>
  import calendarHeader from "../components/calendar_header.vue"
  import emptyStatus from '../components/empty_status.vue'
  import slideGallery from '../components/slide_gallery.vue'
  import scoreStar from '../components/score_star.vue'
  import groupSchedule from '../components/group_schedule.vue'
  import privateSchedule from '../components/private_schedule.vue'
  import tabs from '../components/tabs.vue'
  import loading from '../components/loading.vue'
  import requests from '../services/requests'
  import commonSvc from '../services/common_svc'
  import $moment from 'moment'
  import _ from 'lodash'

  export default{
    data(){
      return {
        gymId: '',
        gym: null,
        currentDate: new Date(),
        teachers: null,
        currentTeacherIndex: 0,
        groupSchedules: null,
        currentTeacher: null,
        privateParams: null,
        tabConfig: null,
        isPullData: !0,
        groupLoading: !1,
        teacherLoading: !1
      }
    },
    components: {
      calendarHeader: calendarHeader,
      emptyStatus: emptyStatus,
      slideGallery: slideGallery,
      scoreStar: scoreStar,
      tabs: tabs,
      groupSchedule: groupSchedule,
      privateSchedule: privateSchedule,
      loading: loading
    },
    methods: {
      orderByTime: commonSvc.timeCompare,
      getGymId(){
        var _reg = /mobile\/wx\/gyms\/([a-zA-z0-9]+)\/schedules\//;
        var _path = window.location.pathname;
        this.gymId = _path.match(_reg) ? _path.match(_reg)[1] : '';
      },
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
          coach_id: this.currentTeacher.id,
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }
      },
      getShop(){
        var _self = this;

        requests.gymDetailReq.get({gymId: this.gymId}).then(function (response) {
          if (response.data.status == 200) {
            _self.gym = response.data.data.gym;
          }
        })
      },
      _addGym(schedules, gymId){

        schedules.forEach(function (item) {
          item.gym = {
            id: gymId
          }
        })

        return schedules;
      },
      getTeachers(){
        this.teacherLoading = !0;

        var _self = this;
        var _params = {
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }

        requests.gymDailyCoachesReq.get({gymId: this.gymId}, _params).then(function (response) {
          _self.teacherLoading = !1;
          if (response.data.status == 200) {
            _self.teachers = response.data.data.coaches;
            _self.teachers.forEach(function (item) {
              item.courses = _self._addGym(item.courses, _self.gymId);
            });
            _self.currentTeacher = _self.teachers[_self.currentTeacherIndex];
            _self.setParams();
          }
        })
      },
      getGroupSchedules(){
        this.groupLoading = !0;

        var _self = this;
        var _param = {
          date: $moment(this.currentDate).format('YYYY-MM-DD')
        }
        requests.gymGroupSchedulesReq.get({gymId: this.gymId}, _param).then(function (response) {
          _self.groupLoading = !1;
          if (response.data.status == 200) {
            _self.groupSchedules = _self._addGym(response.data.data.schedules.schedules, _self.gymId);
          }
        })
      },
      getSchedules(){

        if (!this.isPullData) return;

        if (this.tabConfig.index == 1) {
          this.getGroupSchedules();
        } else {
          this.getTeachers();
        }

        this.isPullData = !1;
      },
      call(phone){
        window.location.href = `tel:${phone}`;
      }
    },
    created(){
      this.getGymId();
      this.setTabConfig();
      this.getShop();
      this.getSchedules();
    },
    watch: {
      currentDate(newVal, oldVal){
        if (newVal !== oldVal) {
          this.isPullData = !0;
          this.groupSchedules = null;
          this.teachers = null;
          this.currentTeacher = null;

          this.getSchedules();
        }
      },
      tabConfig: {
        handler: function (newVal) {
          var _self = this;
          if (newVal) {
            _self.isPullData = ((newVal.index == 1 && !_self.groupSchedules) || (newVal.index == 2 && !_self.teachers)) ? !0 : !1;
            _self.getSchedules();
          }
        },
        deep: true
      },
      currentTeacherIndex(newVal){
        this.currentTeacher = this.teachers[newVal];
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
