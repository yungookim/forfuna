define ([
],
function(){
	var FriendBoxModel = Backbone.Model.extend({
		initialize : function () {
		},

		setAll : function(data){
			this.set('name', data.name);
			this.set('id', data.id);
			this.set('uuid', data.uuid);
			this.set('news', data.news);
			this.set('status', data.status);
		}
	});
	return FriendBoxModel;
});
