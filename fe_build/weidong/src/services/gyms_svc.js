/**
 * Created by lizifen on 16/8/19.
 */
var gymSvc = {};

gymSvc.getGymId = function () {
  var _reg = /^\/mobile\/wx\/gyms\/([a-zA-z0-9]+)\//;
  var _pathname = window.location.pathname;

  return _pathname.match(_reg) ? _pathname.match(_reg)[1] : '';
}

export default gymSvc;
