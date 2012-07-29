define([
	'models/friend_box_model'
], function(FBM){

	var collection = Backbone.Collection.extend({
		model : FBM
	});

	return collection;
});

