CDBUI.Tooltip = Backbone.View.extend({
  el: '.tooltip-container',

  events: {
    'click': '_onClickTooltip',
    'click .tooltip-link': '_onClickTooltipLink'
  },

  initialize: function(options) {
    this.$tooltip = this.$('.tooltip');

    this.model = new Backbone.Model({ hidden: true });

    this.model.on('change:hidden', this._toggleTooltip, this);
  },

  _onClickTooltip: function(e) {
    if (!$(e.target).is('.tooltip-item')) {
      e.preventDefault();
      e.stopPropagation();
    }
  },

  _onClickTooltipLink: function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.model.get('hidden')) {
      this.open();
      this.$el.addClass('selected');
    } else {
      this.close();
      this.$el.removeClass('selected');
    }
  },

  toggle: function() {
    this.model.set('hidden', !this.model.get('hidden'));
  },

  open: function() {
    this.model.set('hidden', false);
  },

  close: function() {
    this.model.set('hidden', true);
  },

  _openTooltip: function() {
    this.$tooltip.css({
      display: 'block',
      top: 36
    }).animate({
      opacity: 1,
      top: 46
    }, 150);
  },

  _closeTooltip: function() {
    var that = this;

    this.$tooltip.animate({
      opacity: 0,
      top: 56
    }, 150, function() {
      that.$tooltip.hide();
    });
  },

  _toggleTooltip: function() {
    var that = this;

    if (this.model.get('hidden')) {
      this._closeTooltip();
    } else {
      this._openTooltip();
    }
  }
});
