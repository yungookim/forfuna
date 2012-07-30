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

var Helpers = {
	//Requirejs's text module doesn't play well with appjs. Rewrite a simple text module.
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

	getRandomString : function(length){
		var chars = "ABCDEFGHIJKLMNOPQRSTUVWYZ123456780";
		var string_length = length;
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
		}
		return randomstring;
	},

	get_new_friend : function(fid){
		$.post('/get_new_friend', {id : fid}, function(ret){
			if (ret == 'err'){
				//TODO GLOBAL ERR HANDLER
				return;
			}
			var fprofile = JSON.parse(ret);
			fprofile = JSON.parse(fprofile[fid]);

			var newFriendView = window.forfuna.new_frined_box_view;
			newFriendView.initModel(fprofile);
			newFriendView.render();
			window.href="#newFriend";
		});
	},

	err : function(msg){
		console.log(msg);
	}
}