define([
	'models/my_box_model'
], function(MY_BOX_MODEL){
  var MyBoxView = Backbone.View.extend({
    el: $('#container'),

    initialize : function(){
    	this.model = new MY_BOX_MODEL();
    },
    render: function(){
    	var self = this;

    	self.baseText = $('#temp_my_box').html();

    	var template = Mustache.render(self.baseText, self.model.toJSON());

    	$(self.el).collapse('show').empty().html(template);
    }
  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new MyBoxView;
});