import Moment from "moment"
import _ from 'lodash'

export function date(date, format) {
  format = format || 'YYYY-MM-DD';

  return Moment(date).format(format);
}

export function dayTxt(date) {
  var _dayTxtList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    _todayTxtList = ['今天', '明天', '后天'],
    _txt;

  function _isToday() {
    return Moment(date).format('YYYY-MM-DD') === Moment(new Date()).format('YYYY-MM-DD');
  }

  function _isDayNearToday(offset) {
    var _date = new Date();
    _date.setDate(_date.getDate() + offset);
    return Moment(date).format('YYYY-MM-DD') === Moment(_date).format('YYYY-MM-DD');
  }

  if (_isToday()) {
    _txt = _todayTxtList[0]
  } else if (_isDayNearToday(1)) {
    _txt = _todayTxtList[1]
  } else if (_isDayNearToday(2)) {
    _txt = _todayTxtList[2]
  }

  if (!_txt)
    _txt = _dayTxtList[Moment(date).day()];

  return _txt;
}

export function weekTxt(date) {
  var _dayTxtList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

  return _dayTxtList[Moment(date).day()] || '';
}

export function imgPostfix(url, format, divider) {
  //format为
  var _divider = divider || '!',
    _url = url.split(_divider)[0];
  return format ? [_url, _divider, format].join('') : _url;
}

export function number(number, length) {
  if (typeof number !== 'undefined' && number.toFixed) {
    return number.toFixed(length || 0)
  } else {
    return ''
  }
}

export function search2obj(str) {
  var searchString = str.split('?')[1] || str || '';

  var _arr, _obj = {};

  if (searchString) {
    _arr = searchString.split('&');
  }

  _.forEach(_arr, function (item) {
    _obj[item.split('=')[0]] = item.split('=')[1];
  });

  return _obj;
}

export function obj2search(obj) {
  var _arr = [];

  _.forEach(obj, function (value, key) {
    if (!key || value == undefined) return;
    _arr.push(camel2underline(key) + '=' + value);
  });

  return _arr.join('&');
}

//驼峰法命名转下划线方法
export function camel2underline(str) {
  var reg = /([A-Z])/g;
  return str.replace(reg, function (s0, s1) {
    return '_' + s1.toLowerCase();
  })
}

//下划线法命名转驼峰法
export function underline2camel(str) {
  var reg = /_([a-z])/g;
  return str.replace(reg, function (s0, s1) {
    return s1.toUpperCase();
  })
}


export function ship2txt(obj) {
  if (obj.username && obj.phone) {
    return `${obj.username}(${obj.phone})`;
  }
}

export function orderStatus2txt(status) {
  var _statusArr = ['已预约', '已完成', '已取消', '', '已签到'];
  return _statusArr[status] || '';
}

export function cardType2Unit(cardType) {
  var _units = ['元', '次', '天'];
  return _units[cardType-1]||'';
}
