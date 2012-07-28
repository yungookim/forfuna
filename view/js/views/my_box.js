define([
	'models/my_box_model'
], function(MY_BOX_MODEL){
  var MyBoxView = Backbone.View.extend({
    el: $('#container'),
    post_sequence : 1,
    events : {
      'click #edit_news' : 'edit_news',
      'click #commit' : 'commit_news'
    },
    initialize : function(){
    	this.model = new MY_BOX_MODEL();
    },
    render: function(){
    	var self = this;
    	self.baseText = $('#my_box_template_base').html();
      self.post_template = $('#post_template').html();

    	var template = Mustache.render(self.baseText, self.model.toJSON());
    	$(self.el).collapse('show').empty().html(template);
      self.post_sequence = 0;
      $("#post1").empty();
      $("#post2").empty();
      $("#post3").empty();
      _.each(self.model.get('posts'), function(each){
        $('#post' + (1)).prepend(Mustache.render(self.post_template, {post : each}));
        // $('#post' + (self.post_sequence%4)).prepend(Mustache.render(self.post_template, {post : each}));
        // self.post_sequence++;
      });

      $(".timeago").timeago();
      $(".collapse").collapse('show');

      //Register key listeners
      $(".post-comment").focus().on({keydown : function(e){
        if(e.which == 13) {
          self.comment_on_post(e);
        }
      }});
      $("#commit_post").focus().on({keydown : function(e){
        if(e.which == 13) {
          self.commit_post(e);
        }
      }});
    },

    edit_news : function(){
      $('#edit_news').hide();
      var _html = $('#news').html().replace(/\<br\>/g, "\n");
      var editor = $("#editor_template").html();
      $('#news').html(editor);
      $('#news textarea').html(_html);
    },

    commit_news : function(){
      $('#edit_news').show();
      var _html = $("#news_ta").val().replace(/\n/g, "<br>");
      $("#news").empty().html(_html);
      this.model.set('news', _html);
      this.model.saveNews({news:_html});
    },

    commit_post : function(){
      var self = this;
      var newItem = {
        pid : Helpers.getGUID(),
        name :'me',
        id : self.model.get('id'),
        post : $('#commit_post').val(),
        time : Helpers.getISOTime(),
        comments : []
      };
      var temp = Mustache.render(self.post_template, {post : newItem});
      $('#post' + (self.post_sequence%4)).prepend(temp);
      $('#commit_post').val('');
      $(".collapse[data-post-id='" + newItem.pid +  "']").collapse('show');
      $(".collapse[data-post-id='" + newItem.pid +  "']").find('.timeago').timeago();
      self.model.get('posts').push(newItem);
      self.model.savePost(newItem);
      //Register key listeners for comment input for the new post.
      $(".post-comment[data-post-id='" + newItem.pid +  "']").focus().on({keydown : function(e){
        if(e.which == 13) {
          self.comment_on_post(e);
        }
      }}); 
    },

    comment_on_post : function(e){
      var self = this;
      var pid = $(e.target).attr('data-post-id');
      var newItem = {
        cid : Helpers.getGUID(),
        name : 'me',
        id : self.model.get('id'),
        comment : $("input[data-post-id='" + pid + "']").val(),
        time : Helpers.getISOTime()
      };
      var _html = $("#post_comment_template").html();
      var temp = Mustache.render(_html, newItem);
      $(".post_comments[data-post-id='" + pid + "']").append(temp);
      $(".post_comments[data-post-id='" + pid + "']").find('.timeago').timeago();
      $("input[data-post-id='" + pid + "']").val('');

      _.each(self.model.get('posts'), function(each){
        if (each.pid == pid){
          //In case the comments is not initalized to an array type
          if (each.comments == ""){
            each.comments = [];
          }
          each.comments.push(newItem);
          var data = {
            pid : pid,
            comments : JSON.stringify(each.comments)
          };
          self.model.saveComment(data);
          return;
        }
      });
    }
  });
  // Our module now returns an instantiated view
  // Sometimes you might return an un-instantiated view e.g. return mainTemplate
  return new MyBoxView;
});