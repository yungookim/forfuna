define([
  'views/home',
  'views/my_box'
], function(HomeView, MyBoxView, MyBoxModel){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      "mybox" : "showMyBox",
      "home" : "showHome",
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

    defaultAction: function(){
      setTimeout(function(){
        window.location.href="#home";        
      }, 1000)
    }
  });

  var init = function(){
    var app_router = new AppRouter;

    var txt = ['my_box', 'home'];
    _.each(txt, function(each){
      Helpers.getText(each, function(ret){
        if (!ret){
          Helpers.err('err : ' + txt + ' does not exist');
          return;
        }
      });
    });
    //Should make this synchronous
    Backbone.history.start();
  };

  return {
    initialize: init
  };
});
