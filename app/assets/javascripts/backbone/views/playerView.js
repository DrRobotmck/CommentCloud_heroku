var PlayerView = Backbone.View.extend({
  el: '#embedder',
  initialize: function () {
    console.log('New player view');
  },
  playSound: function () {
    var player = this;
    player.model.play({
      onload: function () {
        if (this.readyState === 2) { player.trigger('404'); }
        player.$('.play-pause').text('||');
      },
      onpause: function () {
        player.$('.play-pause').text('>');
      },
      onresume: function () {
        player.$('.play-pause').text('||');
      },
      onfinish: function () {
        player.trigger('finished');
      }
    });
  },
  togglePlay: function () {
    var sound = this.model;
    sound.paused ? sound.resume() : sound.pause();
  },
  toggleNextTrack: function () {
    var sound = this.model;
    sound.stop();
  },
  togglePreviousTrack: function () {
    var sound = this.model;
    sound.stop();
  }
});