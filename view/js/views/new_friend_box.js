define([
  'models/friend_box_model'
], function(FriendBoxModel){
  var NewFriendView = Backbone.View.extend({
    el: $('#modal'),
    events : {
      "click #new_friend_function" : "requestFriend"
    },
    initialize : function(){
      this.model = new FriendBoxModel();
    },
    render: function(){
      var self = this;
      self.baseText = $('#new_friend_box_template_base').html();
      
      //Does not change the view, just toggles a modal.      
      var template = Mustache.render(self.baseText, self.model.toJSON());
      $(self.el).empty().html(template);
      $(self.el).modal('toggle');
    },

    initModel : function(data){
      this.model.setAll(data);
    },

    requestFriend : function(){
      var self = this;
      var data = self.model.toJSON();

      data.requested = {
        name : window.forfuna.profile.get('name'),
        id : window.forfuna.profile.get('id'),
        uuid : window.forfuna.profile.get('uuid'),
        news : window.forfuna.profile.get('news'),
        status : window.forfuna.profile.get('status')
      }

      $(self.el).modal('toggle');
      $.post('/request_friend', JSON.stringify(data),function(ret){
        if (ret == "err"){
          //GLOBAL ERR HANDLER
          return;
        }
      });
    }

  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new NewFriendView;
});