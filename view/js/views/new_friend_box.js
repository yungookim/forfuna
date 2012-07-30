define([
  'models/friend_box_model'
], function(FriendBoxModel){
  var NewFriendView = Backbone.View.extend({
    el: $('#modal'),
    events : {
    },
    initialize : function(){
      this.model = new FriendBoxModel();
    },
    render: function(){
      var self = this;
      self.baseText = $('#new_friend_box_template_base').html();
      //self.post_template = $('#post_template').html();
      var template = Mustache.render(self.baseText, self.model.toJSON());
      $(self.el).empty().html(template);
      $(self.el).modal('toggle');
      // self.post_sequence = 0;
      // $("#post1").empty();
      // $("#post2").empty();
      // $("#post3").empty();
      // _.each(self.model.get('posts'), function(each){
      //   $('#post' + (1)).prepend(Mustache.render(self.post_template, {post : each}));
      //   // $('#post' + (self.post_sequence%4)).prepend(Mustache.render(self.post_template, {post : each}));
      //   // self.post_sequence++;
      // });

      // $(".timeago").timeago();
      // $(".collapse").collapse('show');

      // //Register key listeners
      // $(".post-comment").focus().on({keydown : function(e){
      //   if(e.which == 13) {
      //     self.comment_on_post(e);
      //   }
      // }});
      // $("#commit_post").focus().on({keydown : function(e){
      //   if(e.which == 13) {
      //     self.commit_post(e);
      //   }
      // }});
    },
    initModel : function(data){
      this.model.setAll(data);
    }
  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new NewFriendView;
});