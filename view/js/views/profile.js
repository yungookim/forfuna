define([
], function(homeTemplate){
  var homeView = Backbone.View.extend({
    el: $('#container'),
    temp : '',
    events : {
      'click #save' : 'saveProfile' 
    },
    render: function(){
    	var self = this;
      self.temp = $('#template_profile_base').html();
      self.model = window.forfuna.profile;
      var template = Mustache.render(self.temp, self.model.toJSON());

      $(this.el).html(template);
    },

    saveProfile : function(){
      var self = this;
      self.model.set('name', $('#name').val());
      self.model.set('id', $('#id').val());
      self.model.set('status', $('#status').val());
      self.model.saveProfile();
    }


  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new homeView;
});