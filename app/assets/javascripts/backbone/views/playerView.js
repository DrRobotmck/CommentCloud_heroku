var PlayerView = Backbone.View.extend({
	el: '#embedder',
	initialize: function () {
		console.log('New player view');
	},
	playSound: function () {
		var player = this;
		player.model.play({
			onload: function () {
				if (this.readyState === 2) { player.toggleNextTrack(); }
				player.$('.play-pause').text('||');
			},
			onpause: function () {
				player.$('.play-pause').text('>');
			},
			onresume: function () {
				player.$('.play-pause').text('||')
			},
			onfinish: function () {
				player.trigger('finished');
				console.log('sup')
			}
		});
	},
	togglePlay: function() {
		var sound = this.model;
		sound.paused ? sound.resume() : sound.pause();
		console.log(sound.playState);
	},
	toggleNextTrack: function () {
		var sound = this.model;
		sound.stop();
		if (sound.playState === 0) {this.trigger('next track'); }
	},
	togglePreviousTrack: function () {
		var sound = this.model;
		sound.stop();
		this.trigger('previous track');
	},
  // DOM EVENTS
  events: {
    'click .play-pause': 'togglePlay',
    'click .next': 'toggleNextTrack',
    'click .back': 'togglePreviousTrack'
  }
});