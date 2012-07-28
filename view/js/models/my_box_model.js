define ([
],
function(){
	var MyBoxModel = Backbone.Model.extend({
		defaults : {
			name : "danny",
			id : "cookies!",
			uuid : "",
			server : '168.192.0.0',
			news : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
			status : "Carpe Diem!",
			profile_pic : "/img/profile.jpg",
			posts : [
				{pid: "klsldkajfkasdf", 
				name : 'me', id : 'cookies!', 
				post : 'm in eros purus. Curabitur eleifend vulputate.', 
				time : '2012-5-17T09:24:17Z', 
				comments : [{cid : "asdfa", name : 'friend', id : 'aa', comment : 'blah blah blah blah blah blah blah blah blah blah ', time : '2012-5-14T09:24:17Z'}]
			},
				{pid: "asdfasdfasdf", name : 'me', 
				id : 'cookies!', post : 'I LOVE THIS!', 
				time : '2012-5-17T09:24:17Z', comments : ""},
			]
		},
		initialize : function () {
			var self = this;
			$.post('/get_profile', function(ret){
				if (ret == "err"){
					//TODO : GLOBAL ERR FUNCTION HERE
				}
				ret = JSON.parse(ret);
				
				self.set('name', ret.name);
				self.set('id', ret.id);
				self.set('server', ret.server);
				self.set('news', ret.news);
				self.set('status', ret.status);
				self.set('profile_pic', ret.profile_pic);
				self.set('posts', ret.posts);

				window.forfuna = {
					profile : self
				}

			});
		},

		saveProfile : function(){
			var self = this;
			self.set('uuid', Helpers.getGUID());
			$.post('/save_profile', {data : self.toJSON()}, function(ret){
				if (ret == 'err'){
					//TODO : GLOBAL ERR HANLDER
					return;
				}
				window.location.href = '#home';
				return;
			});
		}
	});
	return MyBoxModel;
});