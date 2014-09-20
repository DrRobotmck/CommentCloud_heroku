var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities', this.addTracks.bind(this))
	},
	addTracks: function(user){
		console.log(user)
		newTracks = [];
		user.collection.forEach(function(song) {
			if (song.origin.duration < 600000 && song.type == 'track') { newTracks.push(song) }
		});
		this.reset(newTracks);
	}
});