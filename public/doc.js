var Doc=(function(){
	//attach to events here
	var _flickr = function(query,callback){
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20flickr.photos.search%20where%20text%3D%22' + query + '%22%20and%20api_key%3D%2241386f9cfb34101b940afa34f6bfba2f%22%20limit%2010&diagnostics=true';
		$.ajax({
			url: url,
			dataType: 'jsonp'
		}).done(callback);
	}

	return {
	  render: null,
	  flickr: _flickr
	};
})()