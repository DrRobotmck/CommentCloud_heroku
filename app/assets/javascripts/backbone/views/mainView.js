var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
    this.listenTo(this.collection, "reset", this.getStream);
    this.collection.getTracks();
    this.counter = 0;
    this.player = new PlayerView;
    this.track = new TrackView;
    this.track.listenTo(this, 'new track', this.track.render);
  },
  // Get audio stream for track
  getStream: function(event) {
    var mainView = this;
    var trackModel = mainView.collection.models[mainView.counter];
    mainView.track.model = trackModel;
    mainView.player.model = null;
    mainView.trigger('new track');
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
        mainView.listenTo(mainView.player, 'finished', mainView.getStream);
        mainView.listenTo(mainView.player, 'next track', mainView.nextTrack);
        mainView.listenTo(mainView.player, 'previous track', mainView.previousTrack);
        mainView.player.playSound();
      }
    });
  },
  nextTrack: function () {
    this.counter++;
    this.getStream();
  },
  previousTrack: function() {
    this.counter > 0 ? this.counter -= 1 : this.counter;
    this.getStream();
  }
});
