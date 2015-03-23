app.factory("SocketService", ["$http", function($http) {
	var socket;
	return {
		setConnected: function(theSocket) {
			socket = theSocket;
		},
		getSocket: function() {
			return socket;
		}
	};
}]);