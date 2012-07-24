define ([
],
function(){
	var MyBoxModel = Backbone.Model.extend({
		defaults : {
			name : "danny",
			id : "cookies!",
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
		}
	});
	return MyBoxModel;
});