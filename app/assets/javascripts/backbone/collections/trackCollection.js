var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities/tracks/affiliated?limit=50', this.addTracks.bind(this))
	},
	addTracks: function(user){
		console.log(user)
		newTracks = [];
		user.collection.forEach(function(song) {
			console.log(song.origin.duration)
			if (song.origin.duration < 600000 && song.type.match(/t.{3}k(-r.{4}t)*/)) { newTracks.push(song); console.log(song) }
		});
		console.log(newTracks)
		this.reset(newTracks);
		console.log(this.models)
	}
});