define ([
],
function(){
	var MyBoxModel = Backbone.Model.extend({
		defaults : {
			name : "danny",
			id : "cookies!",
			server : '168.192.0.0',
			thoughts : "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
			thought_comments : [
				{name : 'friend', id : 'key master', comment : "Neque porro quisquam est qui", time : "2011-12-17T09:24:17Z"}
			],
			status : "Carpe Diem!",
			posts : [
				{name : 'me', id : 'cookies!', post : 'm in eros purus. Curabitur eleifend vulputate tempus. Donec tempus est quis sem blandit sit amet auctor ipsum tempor. Donec vel nunc diam, vel vestibulum leo. Nullam quis gravida eros. Vestibulum dapibus aliquet nunc, ut adipiscing tortor tristique eu. Ut in arcu urna.', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'I LOVE THIS!', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'm in eros purus. Curabitur eleifend vulputate tempus. Donec tempus est quis sem blandit sit amet auctor ipsum tempor. Donec vel nunc diam, vel vestibulum leo. Nullam quis gravida eros. Vestibulum dapibus aliquet nunc, ut adipiscing tortor tristique eu. Ut in arcu urna.', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'I LOVE THIS!', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'm in eros purus. Curabitur eleifend vulputate tempus. Donec tempus est quis sem blandit sit amet auctor ipsum tempor. Donec vel nunc diam, vel vestibulum leo. Nullam quis gravida eros. Vestibulum dapibus aliquet nunc, ut adipiscing tortor tristique eu. Ut in arcu urna.', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'I LOVE THIS!', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'm in eros purus. Curabitur eleifend vulputate tempus. Donec tempus est quis sem blandit sit amet auctor ipsum tempor. Donec vel nunc diam, vel vestibulum leo. Nullam quis gravida eros. Vestibulum dapibus aliquet nunc, ut adipiscing tortor tristique eu. Ut in arcu urna.', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'I LOVE THIS!', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'm in eros purus. Curabitur eleifend vulputate tempus. Donec tempus est quis sem blandit sit amet auctor ipsum tempor. Donec vel nunc diam, vel vestibulum leo. Nullam quis gravida eros. Vestibulum dapibus aliquet nunc, ut adipiscing tortor tristique eu. Ut in arcu urna.', time : '2012-5-17T09:24:17Z'},
				{name : 'me', id : 'cookies!', post : 'I LOVE THIS!', time : '2012-5-17T09:24:17Z'}
			]
		},
		initialize : function () {
		}
	});
	return MyBoxModel;
});