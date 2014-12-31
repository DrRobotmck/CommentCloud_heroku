var TrackView = Backbone.View.extend({
	el: '#track',
	initialize: function() {
		console.log('New TrackView');
	},
	render: function() {
		console.log(this.model.toJSON())
		this.$el.html(HandlebarsTemplates['track'](this.model.toJSON()));
	},
	events: {
		'click': 'repostTrack'
	},
	repostTrack: function() {
		console.log(this)
	}
});
