/**
 * Created by lizifen on 16/8/11.
 */
import Vue from 'vue'
import App from '../pages/group_schedule_order_app.vue'
import {date,imgPostfix} from '../filters'

Vue.filter('date', date);
Vue.filter('imgPostfix',imgPostfix);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
});
