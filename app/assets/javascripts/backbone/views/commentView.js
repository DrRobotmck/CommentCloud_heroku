CommentView = Backbone.View.extend({
  className: 'comment',
  initialize: function() {
    this.render();
    this.top = 700;
  },
  render: function() {
    this.$el.html(HandlebarsTemplates['comments'](this.model));
  },
  animate: function() {
    if (this.top >= -500){
      this.$el.css('top', (this.top -= 10)+ 'px');
      this.animation = webkitRequestAnimationFrame(this.animate.bind(this))
    } else {
      cancelAnimationFrame(this.animation)
      this.$el.off();
      this.remove();
    }
  }
});