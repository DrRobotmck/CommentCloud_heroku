var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
    this.listenTo(this.collection, "reset", this.getStream);
    this.collection.getTracks();
    console.log(this.collection)
    this.counter = 0;
    this.player = new PlayerView;
    this.listenTo(this.player, 'finished', this.nextTrack);
    this.track = new TrackView({model: new SongModel});
  },
  events: {
    'click .next': 'nextTrack',
    'click .play-pause': 'playPause',
    'click .back': 'previousTrack'
  },
  // Get audio stream for track
  getStream: function(event) {
    var mainView = this;
    var trackModel = mainView.collection.models[mainView.counter];
    mainView.track.model.set(trackModel.toJSON());
    mainView.player.model = null;

    SC.stream('/tracks/'+ trackModel.get('origin').id, {
      // Get comments for track, create new views and start animation
      ontimedcomments: function(comments) {
        var randomId = Math.floor(Math.random() * 3);
        var commentView = new CommentView({ model: comments[0] });
        var leftShift = ($('#section').width() * Math.random() - 300) + 'px';
        commentView.$el.css({'left': leftShift, 'top': $('#section').height() + 800 + 'px'});
        mainView.$('#section').append(commentView.el);
        requestAnimationFrame(commentView.animate.bind(commentView));
      }
    }, function(sound){
      // Will load songs in multiple parts, prevents multiple tracks from playing.
      if (!mainView.player.model) {
        console.log('new track started');
        mainView.player.model = sound;
        mainView.player.playSound();
      }
    });
  },
  nextTrack: function () {
    this.player.toggleNextTrack();
    this.counter += 1;
    this.getStream();
  },
  playPause: function () {
    this.player.togglePlay();
  },
  previousTrack: function () {
    this.player.togglePreviousTrack();
    this.counter > 0 ? this.counter -= 1 : this.counter;
    this.getStream();
  }
});
