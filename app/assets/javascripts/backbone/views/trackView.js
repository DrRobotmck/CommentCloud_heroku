var TrackView = Backbone.View.extend({
	el: '#track',
	initialize: function() {
		console.log('New TrackView');
		this.render();
	},
	render: function() {
		this.$el.replaceWith(HandlebarsTemplates['track'](this.model.toJSON()));
	}
});
