App.Views.Index = Backbone.View.extend({
  el: 'body',

  events: {
    'click': '_closeDialogs'
  },

  initialize: function() {
    this._initViews();
  },

  _closeDialogs: function() {
    this.tooltip.close();
  },

  _initViews: function() {
    this.tooltip = new CDBUI.Tooltip();
    this.navbar = new CDBUI.Navbar();
  }
});

$(function() {
  window.Index = new App.Views.Index();
});
