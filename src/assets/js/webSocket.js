//        .==.        .==.
//       //`^\\      //^`\\
//      // ^ ^\(\__/)/^ ^^\\
//	   //^ ^^ ^/6  6\ ^^ ^ \\
//	  //^ ^^ ^/( .. )\^ ^ ^ \\ 
//	 // ^^ ^/\| v""v |/\^ ^ ^\\
//	// ^^/\/ /  `~~`  \ \/\^ ^\\
//	-------------------------------------
///
$.extend({
	webSocket : function(setting){
		var url = '';
		if (window.location.protocol == 'https:') {
			url = 'wss://' + window.location.host;
        } else {
        	url = 'ws://' + window.location.host;
        }
		
		if(typeof setting == 'string'){
			url += setting;
			setting = {"url":url}
		}else{
			url += setting.url;
		}
		var options = $.extend({},$.webSocket.Chat.socketFunction,setting);
		return $.webSocket.Chat.connect(url,options);
	},
})

$.extend($.webSocket,{
	send : function(message){
		if($.webSocket.Chat.socket){
			$.webSocket.Chat.socket.send(message);
		}
	},
	Chat : {
		socket : null,
		socketFunction : {
			onopen : function(){
				console.log('Info: WebSocket connection opened.');
			},
			onclose : function(){
				console.log('Info: WebSocket closed.');
			},
			onmessage : function(message){
				console.log(message.data);
			}
		},
		connect : function(host,options){
			var socket = null;
			if ('WebSocket' in window) {
				socket = new WebSocket(host);
            } else if ('MozWebSocket' in window) {
            	socket = new MozWebSocket(host);
            } else {
                console.log('Error: WebSocket is not supported by this browser.');
                return;
            }
			socket.onopen = options.onopen;
			socket.onclose = options.onclose;
			socket.onmessage = options.onmessage;
			return socket;
		}
		
	},
	
});
