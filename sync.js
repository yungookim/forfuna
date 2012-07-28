//Transporation layer.
//Syncs encrypted messages in the server.

module.exports = {
	serverip : '',

	push_profile : function(data){
		this.serverip = data.server;
		
	}
}
