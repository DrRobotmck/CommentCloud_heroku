var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities/tracks/affiliated?limit=50', this.addTracks.bind(this))
	},
	addTracks: function(user){
		var song;
		var newTracks = [];
		var numTracks = user.collection.length;
		for (var i = 0; i< numTracks; i += 1) {
			song = user.collection[i];
			if (song.origin.duration < 600000 && song.type.match(/t.{3}k(-r.{4}t)*/)) {
				newTracks.push(song);
			}
		}
		this.reset(newTracks);
	}
});