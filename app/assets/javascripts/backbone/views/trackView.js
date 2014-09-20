var TrackView = Backbone.View.extend({
	initialize: function() {
		console.log('New TrackView');
		this.render();
	},
	render: function() {
		this.$el.html(HandlebarsTemplates['track'](this.model.toJSON()));
	}
});