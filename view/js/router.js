define([
  'views/home',
  'views/my_box',
  'views/profile',
  'views/friend_box',
  'collections/friend_list'
], function(HomeView, MyBoxView, ProfileView, FriendBoxView, FriendCollection){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      "mybox" : "showMyBox",
      "home" : "showHome",
      "profile" : "showProfile",
      "newFriend" : "showNewFriend",
      // Default
      "*actions": 'defaultAction'
    },

    showMyBox : function(){
      //Activate tab
      Helpers.activeTab("[href='#mybox']");
      MyBoxView.render();
    },

    showHome : function(){
      //Activate tab
      Helpers.activeTab("[href='#home']");
      HomeView.render();
    },

    showProfile : function(){
      Helpers.activeTab("[href='#profile']");
      ProfileView.render();
    },

    showNewFriend : function(){
      //Don't do anything. Helpers will take care of it
    },

    defaultAction: function(){
      setTimeout(function(){
        window.location.href="#home";        
      }, 1000)
    }
  });

  var init = function(){
    //Load up templates
    var txt = ['my_box', 'home', 'profile', 'friend_box'];
    _.each(txt, function(each){
      Helpers.getText(each, function(ret){
        if (!ret){
          Helpers.err('err : ' + txt + ' does not exist');
          return;
        }
      });
    });
    var app_router = new AppRouter;
    Backbone.history.start();
    //Initalize friend collection
    window.forfuna.friend_collection = new FriendCollection();
    //Add friend_box_view to global so adding new friend can be done
    //in any views
    window.forfuna.new_frined_box_view = FriendBoxView;


    //Add action listener to the friend search bar
    $("#friend_search").focus().on({keydown : function(e){
      if(e.which == 13) {
        var fid = $("#friend_search").val();
        Helpers.get_friend(fid);
      }
    }});
  };

  return {
    initialize: init
  };
});
