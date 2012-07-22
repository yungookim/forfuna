define ([
],
function(){
	var MyBoxModel = Backbone.Model.extend({
		defaults : {
			name : "danny",
			id : "cookies!",
			server : '168.192.0.0',
			thoughts : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
		},
		initialize : function () {

		}
	});
	return MyBoxModel;
});