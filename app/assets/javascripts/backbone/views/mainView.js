var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
    // Initialize soundcloud connection / Authorize app
    this.counter = 0;
	},
	getUser: function() {
    // Get user information and fill collection with user's tracks
		SC.connect(function() {
      SC.get('/me', function(user) {
      	this.user = user;
        this.collection.getTracks();
        setTimeout(function(){this.getStream()}.bind(this), 1000);
      }.bind(this));
    }.bind(this));
	},
  // DOM EVENTS
  events: {
    'click h1.start': 'soundcloudAuth',
    'click h1.play-pause': 'playPause',
    'click h1.next': 'nextTrack',
    'click h1.back': 'previousTrack'
  },
  soundcloudAuth: function() {
    SC.initialize({
      client_id: '456177910e695bec31abd882ed77fedb',
      // redirect_uri: 'http://commentcloud.mckenneth.com/home',
      // for development:
      redirect_uri: 'http://localhost:3000/home',
      display: 'popup'
    });
    this.getUser();
  },
  // Get audio stream for track
  getStream: function(event) {
    if (this.$('.start').length) { 
      this.$('.start')
          .toggleClass('start')
          .toggleClass('play-pause')
          .text('||');
      this.$el.toggleClass('active')
    }
    var mainView = this;
    var track = mainView.collection.models[mainView.counter];
    mainView.$('#track').replaceWith(HandlebarsTemplates['track'](track.toJSON()));
    SC.stream('/tracks/'+ track.get('origin').id, {
      auto_play: true,
      // Get comments for track, create new views and start animation
      ontimedcomments: function(comments) {
        var randomId = Math.floor(Math.random() * 3);
        var commentView = new CommentView({ model: comments[0] });
        var leftShift = ($('#section').width() * Math.random() - 300) + 'px';
        commentView.$el.css({'left': leftShift, 'top': $('#section').height() + 400 + 'px'});
        mainView.$('#section').append(commentView.el);
        webkitRequestAnimationFrame(commentView.animate.bind(commentView)); 
      }
    }, function(sound){
      soundManager.stopAll();
      mainView.sound = sound;
      mainView.sound.play();
      mainView.playChecker = setInterval(function() {
        if (mainView.sound.playState == 0) { mainView.nextTrack(); }
      }, 1000);
    });
  },
  playPause: function() {
    if (this.$el.hasClass('active')) {
      this.sound.pause();
      this.$('.play-pause').text('>');
    } else {
      this.sound.resume();
      this.$('.play-pause').text('||');
    }
    this.$el.toggleClass('active')
  },
  nextTrack: function () {
    clearInterval(this.playChecker);
    if(this.sound.playState == 1) { this.sound.stop(); }
    this.counter++;
    if (this.sound.playState == 0) { this.getStream(); };
  },
  previousTrack: function() {
    clearInterval(this.playChecker);
    if(this.sound.playState == 1) { this.sound.stop(); }
    this.counter > 0 ? this.counter-- : this.counter; 
    this.getStream();
  }
});