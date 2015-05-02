app.factory("PlayersService", [function() {
	var player11;
	var player12;
	var player21;
	var player22;
	var current;
	var gameOn = false;

	return {
		setPlayer11: function(player) {
			player11 = player;
		},
		setPlayer12: function(player) {
			player12 = player;
		},
		setPlayer21: function(player) {
			player21 = player;
		},
		setPlayer22: function(player) {
			player22 = player;
		},
		setCurrent: function(curr){
			current = curr;
		},
		setPlayers: function(players){
			player11 = players[0];
			player12 = players[1];
			player21 = players[2];
			player22 = players[3];
		},

		getPlayer11: function() {
			return player11;
		},
		getPlayer12: function() {
			return player12;
		},
		getPlayer21: function() {
			return player21;
		},
		getPlayer22: function() {
			return player22;
		},
		getCurrent: function(){
			return current;
		},

		clearPlayers: function(){
			player11 = null;
			player12 = null;
			player21 = null;
			player22 = null;
			current = null;
		},

		clearCurrent: function(){
			current = null;
		},

		rematch: function(){
			var tmp = player11;
			player11 = player21;
			player21 = tmp;
			tmp = player12;
			player12 = player22;
			player22 = tmp;
		},

		setGameOn: function(game){
			gameOn = game;
		},

		getGameOn: function(){
			return  gameOn;
		}
	};
}]);