/*global Backbone, App, $*/

App.Views.Compass = Backbone.View.extend({

  initialize: function(options) {
    this.options = options;

    this.$content = this.options.$content;
    this.$needle = this.$el.find('.js-Compass-needle');
  },

  setNeedle: function(north) {
    this.$needle.css({
      'transform': 'rotate('+north+'deg)'
    });
  },

  setBackground: function(left, top) {
    this.$content.css({
      'background-position': 'calc(50% + '+left+'px) calc(50% + '+top+'px)'
    });
  }

});


App.Views.FourOFour = Backbone.View.extend({

  el: document.body,

  initialize: function() {
    this.alpha = null;
    this.beta = null;
    this.gamma = null;

    this._initViews();
    this._initBindings();
  },

  _initViews: function() {
    this.compass = new App.Views.Compass({
      el: this.$('.js-Compass'),
      $content: this.$('.js-Content')
    });
  },

  _initBindings: function() {
    var _this = this;

    this.canHandleOrientation = null;

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', function(e) {
        var a = e.alpha;
        var canHandleOrientation = _this.canHandleOrientation = a;

        if (canHandleOrientation) {
          var a_ = Math.round(a);
          var b = Math.round(e.beta);
          var g = Math.round(e.gamma);

          _this.compass.setBackground(-g, -b);
          _this.compass.setNeedle(a_);
        }
      }, false);
    }

    if (!this.canHandleOrientation) {
      window.addEventListener('mousemove', function(e) {
        var width = $(this).width()/2;
        var height = $(this).height()/2;

        var posX = e.pageX - width;
        var diffX = width - $(this).width();
        var mouseXPer = posX / width * 20;
        var mouseXPer_ = posX / width * 5;

        var posY = e.pageY - height;
        var diffY = height - $(this).height();
        var mouseYPer = posY / height * 5;

        var g = diffX * (mouseXPer / 100);
        var g_ = diffX * (mouseXPer_ / 100);

        var b = diffY * (mouseYPer / 100);

        _this.compass.setBackground(g_, b);
        _this.compass.setNeedle(-g);
      }, false);
    }
  }
});


$(function() {
  window.FourOFour = new App.Views.FourOFour();
});
