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

	getISOTime : function(){
		var d = new Date();
		function pad(n){return n<10 ? '0'+n : n}
		return d.getUTCFullYear()+'-'
		      + pad(d.getUTCMonth()+1)+'-'
		      + pad(d.getUTCDate())+'T'
		      + pad(d.getUTCHours())+':'
		      + pad(d.getUTCMinutes())+':'
		      + pad(d.getUTCSeconds())+'Z';
	},

	getGUID : function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	},

	err : function(msg){
		console.log(msg);
	}
}