var TrackView = Backbone.View.extend({
	el: '#track',
	initialize: function() {
		console.log('New TrackView');
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html(HandlebarsTemplates['track'](this.model.toJSON()));
	},
	events: {
		'click .follow': 'followArtist',
		'click .unfollow': 'unfollowArtist'
	},
	followArtist: function () {
		var userID = this.model.get('origin').user_id;
		SC.put('/me/followings/' + userID, function (user, error) {
			$('.follow').toggleClass('follow')
									.toggleClass('unfollow')
									.text('You are now following ' + user.username);
		});
	},
	unfollowArtist: function () {
		var userID = this.model.get('origin').user_id;
		SC.delete('/me/followings/' + userID, function (user, error) {
			$('.unfollow').toggleClass('follow')
										.toggleClass('unfollow')
										.text('follow artist');
		});
	}
});
