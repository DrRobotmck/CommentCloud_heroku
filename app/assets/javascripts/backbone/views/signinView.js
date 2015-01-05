var SignInView = Backbone.View.extend({
	el: '#modal'
,	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.show();
	},
	events: {
		'click': 'soundcloudAuth'
	},
	soundcloudAuth: function() {
		this.remove();
    // Initialize soundcloud connection / Authorize app
    SC.initialize({
      client_id: '456177910e695bec31abd882ed77fedb',
      redirect_uri: 'https://commentcloud.mckenneth.com/home',
      // for development:
      // redirect_uri: 'http://localhost:3000/home',
      display: 'popup'
    });
    this.getUser();
  },
  getUser: function() {
    SC.connect(function() {
     	SC.get('/me', function(user) { soundcloudUser = user; });
     	tracksCollection = new SongCollection;
     	main = new MainView({collection: tracksCollection});
		});
  }
});