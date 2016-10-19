/**
 * Created by lizifen on 16/8/12.
 */
import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource);

if (document.querySelector('[name=csrfmiddlewaretoken]'))
  Vue.http.headers.common['X-CSRFToken'] = document.querySelector('[name=csrfmiddlewaretoken]').getAttribute('value');
Vue.http.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
Vue.http.headers.put['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";

var requests = {};
//教练团课列表
requests.coachGroupSchedulesReq = Vue.resource('/api/partner/coaches/{coachId}/schedules/');
//教练私教列表
requests.coachPrivateSchedulesReq = Vue.resource('/api/partner/coaches/{coachId}/courses/');
//私教时间段
requests.privateSliceReq = Vue.resource('/api/partner/private/course/slice/');
//教练详情
requests.coachDetailReq = Vue.resource('/api/partner/coaches/{coachId}/detail/');
//团课预约页面
requests.schedulesDetailReq = Vue.resource('/api/partner/schedules/confirm/');
//私教预约页面
requests.timetablesDetailReq = Vue.resource('/api/partner/timetables/confirm/');
//验证码接口
requests.verifyCodeReq=Vue.resource('/api/send/verify/');
//创建订单
requests.ordersCreateReq=Vue.resource('/api/partner/orders/create/');
//工作室详情
requests.gymDetailReq=Vue.resource('/api/partner/gyms/{gymId}/detail/');
//工作室团课列表
requests.gymGroupSchedulesReq = Vue.resource('/api/partner/gyms/{gymId}/schedules/');
//工作室私教列表
requests.gymPrivateSchedulesReq = Vue.resource('/api/partner/gyms/{gymId}/courses/');
//工作室教练列表
requests.gymDailyCoachesReq = Vue.resource('/api/partner/gyms/{gymId}/daily/coaches/');

export default requests;
