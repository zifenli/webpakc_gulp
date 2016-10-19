/**
 * Created by lizifen on 16/8/11.
 */
import Vue from 'vue'
import App from '../pages/coach_order_list_app.vue'
import {dayTxt,date,imgPostfix} from '../filters'

Vue.filter('dayTxt', dayTxt);
Vue.filter('date', date);
Vue.filter('imgPostfix',imgPostfix);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
});
