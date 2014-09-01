var SongCollection = Backbone.Collection.extend({
	initialize: function() {
		console.log('New Collection')
	},
	model: SongModel,
	getTracks: function(){
		SC.get('/me/activities', this.addTracks.bind(this))
	},
	addTracks: function(user){
		user.collection.forEach(function(song){
			SC.get('/tracks/'+ song.origin.id+ '/comments', function(data){
				if (data.length && !data.hasOwnProperty('errors')){
					song.comments = data;
					this.add(song);
				} else {
					song.comments = [{body: 'No Comments...Lame', user:{username:'Lame Oh'}}]
					this.add(song);
				}
			}.bind(this))
		}.bind(this));
	}
});