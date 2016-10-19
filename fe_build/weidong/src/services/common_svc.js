/**
 * Created by lizifen on 16/8/19.
 */
import Moment from "moment"

var services = {};

services.timeCompare = function (a, b) {
  return Moment(b.start).isBefore(a.start) ? 1 : -1;
}

export default services;
