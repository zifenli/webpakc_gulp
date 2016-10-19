/**
 * Created by lizifen on 16/8/15.
 */
var getUrlDataSvc = {}

getUrlDataSvc.getUrlData = function () {
  var url,urlDataArr,dataObj;

  url = decodeURIComponent(window.location.search);
  dataObj = {};

  if (!!url) {
    urlDataArr = url.split('&');
    for (var item in urlDataArr) {
      var str = urlDataArr[item].replace(/\?/, '');
      dataObj[str.split('=')[0]] = str.split('=')[1];
    }
  }


  return dataObj;
}

export default getUrlDataSvc;
