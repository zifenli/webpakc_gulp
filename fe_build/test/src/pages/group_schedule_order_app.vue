<template>
  <div class="m-infoPanel g-divideWrap-2">
    <div class="container">
      <div class="imgWrap">
        <img v-if="schedule.course.photo" :src="schedule.course.photo | imgPostfix '120x120'" alt="">
      </div>
      <div class="txtWrap">
        <h3>{{schedule.course.name}}</h3>
        <p class="txt">上课地点：{{schedule.shop.name}} </p>
        <p class="txt">时长：{{schedule.course.length / 60}} min</p>
      </div>
    </div>
  </div>
  <div class="m-infoPanel-2 g-divideWrap">
    <p class="txt"><span>时间</span>{{schedule.start | date 'YYYY-MM-DD'}} {{schedule.start | date 'HH:mm'}}
      {{schedule.end | date 'HH:mm'}}</p>
    <p class="txt"><span>场地</span>{{schedule.space.name}}</p>
    <div class="txt"><span>教练</span>
      <div class="imgWrap">
        <img :src="schedule.teacher.avatar" alt="">
      </div>
      {{schedule.teacher.username}}
    </div>
  </div>
  <ul class="m-infoList g-divideWrap">
    <li class="item retainbt f-cf">
      <div class="left"><span class="content">支付方式</span></div>
      <div class="right">
        <p class="content">微信支付</p>
      </div>
    </li>
    <li class="item retainbt f-cf">
      <div class="left"><span class="content">预约人数</span></div>
      <div class="right">
        <p class="content">
          <counter :count.sync="count" :capacity="capacity"></counter>
        </p>
      </div>
    </li>
  </ul>
  <p class="u-gray-txt-2">联系人信息</p>
  <ul class="m-infoList g-divideWrap">
    <li class="item retainbt f-cf">
      <div class="left"><span class="content">联系人姓名</span></div>
      <div class="right">
        <input type="tel" class="input" v-model="user.username" placeholder="请填写姓名">
      </div>
    </li>
    <li class="item retainbt f-cf">
      <div class="left"><span class="content">手机号</span></div>
      <div class="right">
        <input type="tel" class="input" placeholder="请填写手机号码" v-model="user.phone">
      </div>
    </li>
    <li class="item retainbt f-cf" v-if="!gUserPhone || gUserPhone!==user.phone">
      <div class="left"><span class="content">验证码</span></div>
      <div class="right">
        <input type="tel" class="input input-2" placeholder="输入收到的验证码" v-model="verifyCode">
        <a href="" class="btn" v-on:click="getVerifyCode($event)">{{verifyTxt}}</a>
      </div>
    </li>
  </ul>
  <ul class="m-infoList g-divideWrap">
    <li class="item retainbt f-cf">
      <div class="left"><span class="content">备注</span></div>
      <div class="right">
        <input type="text" class="input" v-model="remarks">
      </div>
    </li>
  </ul>
  <div class="g-fix-btmWrap f-cf">
    <div class="f-fl">
      <span class="txt">{{currentRule.cost}}元/人 * {{count}}人</span>
    </div>
    <div class="f-fr">
      <p class="txt">总计 <span>{{currentRule.cost*count}}元</span></p>
      <a href="" class="btn u-btn-2 u-btn-red" v-on:click="createOrder($event)">去支付</a>
    </div>
  </div>
  <div class="g-infoWrap f-dn">
    <p class="txt">该课程只支持会员卡预约，有需要请<br/>电话联系健身房进行咨询</p>
    <p class="phone"><a href="tel:010-1234567">010-1234567</a></p>
  </div>
</template>

<script>
  import counter from '../components/counter.vue'
  import getUrlData from '../services/get_url_data'
  import requests from '../services/requests'
  import verifyCodeSvc from '../services/verify_code_svc'
  import gymSvc from '../services/gyms_svc'

  export default{
    data(){
      return {
        scheduleId: getUrlData.getUrlData().schedule_id,
        gymId: gymSvc.getGymId(),
        schedule: null,
        count: 1,
        capacity: '',
        currentRule: null,
        user: null,
        gUserPhone: '',
        remarks: '',
        verifyCode: '',
        verifyTxt: verifyCodeSvc.getVerifyTxt()
      }
    },
    components: {
      counter: counter
    },
    methods: {
      generateGroupRule (rules, tplId) {
        return _.find(rules, function (item) {
          return tplId == item.card_tpl_id
        })
      },
      getSchedule(){
        var _self = this;
        var _params = {
          schedule_id: this.scheduleId,
          gym_id: this.gymId
        }

        requests.schedulesDetailReq.get(_params).then(function (response) {
          if (response.data.status == 200) {
            _self.schedule = response.data.data.schedule;
            _self.capacity = response.data.data.schedule.current_max_capacity;
            _self.currentRule = _self.generateGroupRule(_self.schedule.rules, 1);

          }
        })
      },
      getVerifyTxt(){
        var _self = this;
        this.verifyTxt = verifyCodeSvc.getVerifyTxt();

        if (verifyCodeSvc.getCount() > 0) {
          setTimeout(function () {
            _self.getVerifyTxt();
          }, 1000)
        }
      },
      getVerifyCode($event){
        $event.preventDefault();
        var _self = this;

        if (!this.user.phone || !this.user.phone.match(/^1\d{10}/)) {
          alert('请填写正确的手机号码');
          return;
        }

        if (!verifyCodeSvc.checkData().result) {
          alert(verifyCodeSvc.checkData().info);
          return;
        }

        verifyCodeSvc.setSended(true);

        verifyCodeSvc.getVerifyCode(this.user.phone);

        verifyCodeSvc.setCount(60);

        verifyCodeSvc.countDown();

        _self.getVerifyTxt();

      },
      createOrder($event){
        $event.preventDefault();

        var _params = {gym_id: this.gymId};

        _params.user = {
          phone: this.user.phone,
          username: this.user.username,
          code: this.verifyCode
        };

        _params.meta = {
          shop_id: this.schedule.shop.id,
          schedule_id: this.scheduleId,
          count: this.count,
          card_id: this.currentRule.id,
          remark: this.remarks
        };

        requests.ordersCreateReq.save(_params).then(function (response) {

        });
      }
    },
    created(){
      this.getSchedule();
    },
    ready(){
      this.gUserPhone = window.g_user.phone;
      this.user = window.g_user;
    },
  }
</script>
<style>
  @import "../styles/reset.css";
</style>

<style lang="less">
  @import "../styles/index.less";
</style>
