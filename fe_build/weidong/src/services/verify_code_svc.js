/**
 * Created by lizifen on 16/8/16.
 */
import requests from '../services/requests'

var _sended = !1;
var _count;

function _countDown() {
  _count--;
  if (_count > 0) {

    setTimeout(function () {
      if (_sended) {
        _countDown();
      } else {
        _count = 0;
      }
    }, 1000);

  } else {
    _sended = !1;
  }
}

var verifyCodeSvc = {
  setSended: function (sended) {
    _sended = sended
  },
  getSended: function () {
    return _sended;
  },
  setCount: function (count) {
    _count = count;
  },
  getCount:function(){
    return _count;
  },
  getVerifyCode: function (phone) {
    requests.verifyCodeReq.save({phone: phone}, function (response) {
    });
  },
  countDown: function () {
    _countDown();
  },
  checkData: function () {
    if (_sended) {
      return {
        result: !1,
        info: '验证码已经发送'
      }
    } else {
      return {
        result: !0
      }
    }
  },
  getVerifyTxt: function () {
    if (!_count) {
      return '获取验证码';
    } else {
      return '已发送（' + _count + ')';
    }
  }
}

export default verifyCodeSvc;
