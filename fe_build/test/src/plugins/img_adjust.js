'use strict';


/**
 * 用于图片自适应容器大小的指令,会自动判断外层容器的大小
 * 需要在外层容器设置display:relative;overflow:hidden;
 * 使用方法<img v-img-adjust src='' alt=''>
 */


export default {
  install: function (Vue, options) {
    Vue.directive('img-adjust', {
      bind: function () {
        var _self = this;

        this.el.style.display = 'none';

        this.el.onload = function(){
          var _width = this.naturalWidth,
            _height = this.naturalHeight,
            _aspectRatio = _width/_height,
            _offsetParent = this.parentNode,
            _parentWidth = _offsetParent.clientWidth,
            _parentHeight = _offsetParent.clientHeight,
            _parentAspectRatio = _parentWidth/_parentHeight;

          if(_aspectRatio < _parentAspectRatio){
            this.style.cssText += ";position:absolute;width:100%;height:auto;left:0;top:50%;margin-left:0;margin-top:" + -1 * (_parentWidth/_width) * _height * 0.5 + 'px';
            this.style.display = '';
          }else if(_aspectRatio > _parentAspectRatio){
            this.style.cssText += ";position:absolute;width:auto;height:100%;top:0;left:50%;margin-top:0;margin-left:" + -1 * (_parentHeight/_height) * _width * 0.5 + 'px';
            this.style.display = '';
          }else{
            this.style.display = '';
          }
        }
      },
      update: function () {
      },
      unbind: function () {
      }
    })
  }
}

