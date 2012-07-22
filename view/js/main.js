requirejs.config({
    //By default load any module IDs from js
    baseUrl : 'js'
});

// Start the main app logic.
requirejs([
    'router'
    ], 
	function(Router) {
   		Router.initialize();
	}
);

//Global helpers

//Requirejs's text module doesn't play well with appjs. Rewrite text module.
var Helpers = {
	//Load in template and leave it on the index.html as a template script
	getText : function(name, next){
		$.ajax({
			type: 'GET',
			url : '/getText',
			data : {fn : name},
			dataType : 'html'			
		}).done(function(text){
			if(!text) {
				next();
				return;
			}

			if (typeof text == 'object'){
				window.ASDF = text;
				// text = text[0];
				// console.log(text);
			}
			var tmp = $('<script type="text/template" id="temp_' + name + '"></script>').html(text);
			$('body').append(tmp);
			next('ok');
		});
	},

	activeTab : function(ele){
		$("li.active").removeClass('active');
		$(ele).parent().addClass('active');
	},

	err : function(msg){
		console.log(msg);
	}
}