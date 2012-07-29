define ([
],
function(){
	var MyBoxModel = Backbone.Model.extend({
		defaults : {
			//For testing purpose
			name : "danny",
			id : "cookies!",
			uuid : "",
			server : '168.192.0.0',
			news : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
			status : "Carpe Diem!",
			profile_pic : "/img/profile.jpg",
			public_key : '',
			posts : [
				{pid: "klsldkajfkasdf",  //post id for indexing
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
			//Set a global
			window.forfuna = {};

			self.set('posts', []);
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
				self.set('public_key', ret.public_key);
				if (ret.uuid == undefined || ret.uuid == ''){
					ret.uuid = Helpers.getRandomString(3);
				}
				self.set('uuid', ret.uuid);	
				window.forfuna.profile = self
			});

			$.post('/get_posts', function(ret){
				ret = JSON.parse(ret);
				self.set('posts', []);
				_.each(ret, function(each){
					if (each.comments == ""){
						each.comments = [];
					} else {
						each.comments = JSON.parse(each.comments);
					}
					self.get('posts').push(each);				
				});
			});

			//FOR DEBUG
			window.printModel = function(){
				console.log(self.toJSON());
			};
		},

		saveProfile : function(){
			var self = this;
			$.post('/save_profile', self.toJSON(), function(ret){
				if (ret == 'err'){
					//TODO : GLOBAL ERR HANLDER
					return;
				}
				window.location.href = '#mybox';
				return;
			});
		},

		savePost : function(newItem){
			$.post('/save_post', newItem, function(ret){
				if (ret == 'err'){
					//TODO : Global ERR HANDLER
					return;
				}
				return;
			});
		},

		saveComment : function(data){
			$.post('/save_comments', data, function(ret){
				if (ret == 'err'){
					//TODO : Global ERR HANDLER
					return;
				}
				return;
			});
		},

		saveNews : function(data){
			$.post('/set_news', data, function(ret){
				if (ret == 'err'){
					//TODO : Global ERR HANDLER
					return;
				}
				return;
			});
			this.syncProfile();
		},

		syncProfile : function(){
			var self = this;
			var data = {
				name : self.get('name'),
				id : self.get('id'),
				uuid : self.get('uuid'),
				news : self.get('news'),
				status : self.get('status')
			};
			//TODO : This case of error, will there be another chance
			//to sync it later?
			$.post('/push_profile', data);
		}
	});
	return MyBoxModel;
});