var TrackView = Backbone.View.extend({
	el: '#track',
	initialize: function() {
		console.log('New TrackView');
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.userID = this.model.get('origin').user_id;
		this.$el.html(HandlebarsTemplates['track'](this.model.toJSON()));
		this.checkIfFollowing();
	},
	events: {
		'click .follow': 'followArtist',
		'click .unfollow': 'unfollowArtist'
	},
	checkIfFollowing: function() {
		var userID = this.userID;
		SC.get('/me/followings/', function(result, error) {
			var followings = result.map(function(user) { return user.id });
			if (followings.indexOf(userID) !== -1) {
				$('.follow').toggleClass('follow')
										.toggleClass('unfollow')
										.text('Unfollow');
			}
		});
	},
	followArtist: function() {
		SC.put('/me/followings/' + this.userID, function(user, error) {
			$('.follow').toggleClass('follow')
									.toggleClass('unfollow')
									.text('You are now following ' + user.username);
		});
	},
	unfollowArtist: function() {
		SC.delete('/me/followings/' + this.userID, function(user, error) {
			$('.unfollow').toggleClass('follow')
										.toggleClass('unfollow')
										.text('follow artist');
		});
	}
});
