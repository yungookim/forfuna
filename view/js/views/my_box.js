define([
	'models/my_box_model'
], function(MY_BOX_MODEL){
  var MyBoxView = Backbone.View.extend({
    el: $('#container'),
    _id : '',
    
    events : {
      'click #edit_thought' : 'edit_thought',
      'click #commit' : 'commit_thought',
      'click #thought_comment_btn' : 'comment_on_thought'
    },
    initialize : function(){
    	this.model = new MY_BOX_MODEL();
      this._id = this.model.get('id');
    },
    render: function(){
    	var self = this;
    	self.baseText = $('#temp_my_box').html();
      self.post_template = $('#post_template').html();

    	var template = Mustache.render(self.baseText, self.model.toJSON());
    	$(self.el).collapse('show').empty().html(template);

      var i = 1;
      $("#post1").empty();
      $("#post2").empty();
      $("#post3").empty();
      _.each(self.model.get('posts'), function(each){
        $('#post' + i).append(Mustache.render(self.post_template, {post : each}));
        i++;
        if (i == 4){
          i = 1;
        }
      });

      $(".timeago").timeago();
    },

    edit_thought : function(){
      $('#edit_thought').hide();
      var _html = $('#thoughts').html().replace(/\<br\>/g, "\n");
      var editor = $("#editor_template").html();
      $('#thoughts').html(editor);
      $('#thoughts textarea').html(_html);
    },

    commit_thought : function(){
      $('#edit_thought').show();
      var _html = $("#thoughts_ta").val().replace(/\n/g, "<br>");
      $("#thoughts").empty().html(_html);
      this.model.set('thoughts', _html);
    },

    comment_on_thought : function(){
      var self = this;

      var newItem = {
        name : 'me', 
        id : self._id,
        comment : $('#thought_comment').val(),
        time : Helpers.getISOTime()
      };

      var temp = Mustache.render($("#comments_template").html(), newItem);
      console.log(newItem);
      console.log(temp);
      $("#thought_comments_wrapper").append(temp);

      this.model.get('thought_comments').push(newItem);
    }


  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new MyBoxView;
});