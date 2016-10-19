<template>
  <div class="m-showGallery">
    <ul class="cardContainer">
      <slot></slot>
    </ul>
  </div>
</template>

<script>
  /**
   * 3D橱窗展示
   * 需要双向绑定index参数,标识当前第一个元素
   *<slide-gallery :index.sync="teacherIndex">
   *<li></li>
   *</slide-gallery>
   **/
  function _transform(element, value, key) {
    key = key || "Transform";
    ["Moz", "O", "Ms", "Webkit", ""].forEach(function (prefix) {
      element.style[prefix + key] = value;
    });

    return element;
  }

  function _setItemStyle(els, offset, width) {
    for (var i = 0; i < els.length; i++) {
      var _index = i - offset;

      if (_index != 0) {
        _transform(els[i], 'translate3d(' + (_index * width) + 'px, 0, 0)');
      } else {
        _transform(els[i], 'translate3d(0, 0, 36px)');
      }
    }
  }

  export default{
    data(){
      if(typeof this.index === 'undefined')
        this.index = 0;

      return {
        dragging: !1,
        userScrolling: !1,
        width: null,
        els: null
      };
    },
    props: {
      index: {
        type: Number,
        required: true,
        twoWay: true
      }
    },
    created () {
      this.dragState = {};
    },
    attached () {
      var _els = this.$el.querySelectorAll('.j-flag'),
        _el = this.$el,
        _self = this,
        _width = _els[0].clientWidth;

      this.width = _width;
      this.els = _els;

      _setItemStyle(_els, this.index, _width);

      _el.addEventListener('touchstart', function (event) {
        _self.dragging = true;
        _self.userScrolling = false;
        _self.doOnTouchStart(event);
      });

      _el.addEventListener('touchmove', function (event) {
        if (!_self.dragging) return;
        _self.doOnTouchMove(event);
      });

      _el.addEventListener('touchend', function (event) {
        if (_self.userScrolling) {
          _self.dragging = false;
          _self.dragState = {};
          return;
        }
        if (!_self.dragging) return;
        _self.doOnTouchEnd(event);
        _self.dragging = false;
      });

      setTimeout(function () {
        for (var i = 0; i < _els.length; i++) {
          _transform(_els[i], 'transform 0.6s ease', 'Transition');
          _els[i].addEventListener('click', (function (i) {
            return function () {
              _self.index = i;
              _setItemStyle(_els, i, _width);
            }
          }(i)), false)
        }
      }, 0);
    },
    methods: {
      doOnTouchStart: function (event) {
        var element = this.$el;
        var dragState = this.dragState;
        var touch = event.touches[0];

        dragState.startTime = new Date();
        dragState.startLeft = touch.pageX;
        dragState.startTop = touch.pageY;
        dragState.startTopAbsolute = touch.clientY;

        dragState.pageWidth = element.offsetWidth;
        dragState.pageHeight = element.offsetHeight;

      },
      doOnTouchMove: function (event) {
        var dragState = this.dragState;
        var touch = event.touches[0];

        dragState.currentLeft = touch.pageX;
        dragState.currentTop = touch.pageY;
        dragState.currentTopAbsolute = touch.clientY;

        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

        var distanceX = Math.abs(offsetLeft);
        var distanceY = Math.abs(offsetTop);
        if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
          this.userScrolling = true;
          return;
        } else {
          this.userScrolling = false;
          event.preventDefault();
        }

      },
      doOnTouchEnd: function () {

        var dragState = this.dragState;

        var dragDuration = new Date() - dragState.startTime;
        var towards = null;

        var offsetLeft = dragState.currentLeft - dragState.startLeft;
        var offsetTop = dragState.currentTop - dragState.startTop;
        var pageWidth = dragState.pageWidth;

        if (dragDuration < 300 && dragState.currentLeft === undefined) return;

        if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
          towards = offsetLeft < 0 ? 'next' : 'prev';
        }

        if(towards){
          if(towards === 'next'){
            this.index = this.index + 1 == this.els.length?this.index : this.index+1;
          }else if(towards == 'prev'){
            this.index = (this.index - 1) < 0?0: this.index - 1;
          }

          _setItemStyle(this.els, this.index, this.width);
        }

        this.dragState = {};
      }
    }

  }
</script>
