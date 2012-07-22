define([

], function(){
  var homeView = Backbone.View.extend({
    el: $('#container'),
    baseText : '',
    initialize : function(){
      var self = this;

    },

    render: function(){
      var self = this;
      self.baseText = $('#temp_home').html();
      $(self.el).collapse('show').empty().html(self.baseText).collapse('show');
    }
  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new homeView;
});