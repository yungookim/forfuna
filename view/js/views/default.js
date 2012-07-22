define([
  'text!texts/home.html'
], function(homeTemplate){
  var homeView = Backbone.View.extend({
    el: $('#container'),
    render: function(){
    	var self = this;
    }
  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new homeView;
});