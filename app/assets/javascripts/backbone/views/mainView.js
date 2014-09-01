var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
    // Initialize soundcloud connection / Authorize app
		SC.initialize({
			client_id: '456177910e695bec31abd882ed77fedb',
      redirect_uri: 'http://localhost:3000/home'
		});
		this.getUser();
    this.counter = 0;
	},
	getUser: function() {
    // Get user information and fill collection with user's tracks
		SC.connect(function() {
      SC.get('/me', function(user) {
      	this.user = user;
        this.collection.getTracks();
      }.bind(this));
    }.bind(this));
	},
  // DOM EVENTS
  events: {
    'click h1.start': 'getStream',
    'click h1.play-pause': 'playPause',
    'click h1.next': 'nextTrack',
    'click h1.back': 'previousTrack'
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
        _.each(comments, function(comment) {
          setTimeout(function(){
            var randomId = Math.floor(Math.random() * 3);
            var commentView = new CommentView({ model: comment });
            var leftShift = ($('#section').width() * Math.random() - 300) + 'px';
            commentView.$el.css({'left': leftShift, 'top': $('#section').height() + 400 + 'px'});
            mainView.$('#section').append(commentView.el);
            webkitRequestAnimationFrame(commentView.animate.bind(commentView)); 
          }, 1000);
        });
      }
    }, function(sound){
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
    this.getStream();
  },
  previousTrack: function() {
    clearInterval(this.playChecker);
    if(this.sound.playState == 1) { this.sound.stop(); }
    this.counter > 0 ? this.counter-- : this.counter; 
    this.getStream();
  }
});