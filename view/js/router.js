define([
  'views/home',
  'views/my_box',
  'views/profile'
], function(HomeView, MyBoxView, ProfileView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      "mybox" : "showMyBox",
      "home" : "showHome",
      "profile" : "showProfile",
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

    defaultAction: function(){
      setTimeout(function(){
        window.location.href="#home";        
      }, 1000)
    }
  });

  var init = function(){
    //Load up templates
    var txt = ['my_box', 'home', 'profile'];
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
