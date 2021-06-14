// https://developer.wordpress.org/rest-api/
define(["libFetch"],function(xhrFetch){

	var fn = {
		getTitle: function(){
			return this["p"]["title"]["rendered"];
		},
		getBody: function(){
			return this["p"]["content"]["rendered"];
		}
	};

	function Post(p){
		this.p = p;
	}
	
	Post.prototype = fn;

	function getPosts(endpoint){
		var xhr = xhrFetch.fetch(endpoint,"json");
		return xhr.then( function(jsonResp){
			var jsonRet = [];
			for(var i =0; i<jsonResp.length; i++){
				jsonRet.push(new Post(jsonResp[i]));
			}
			return jsonRet;
		})
		.then( function(posts){
			var htmlRet = [];
			
			for(var i = 0; i<posts.length; i++){
				htmlRet.push("<div class='post'><h2>"+posts[i].getTitle()+"</h2><p class='post-title'>"+posts[i].getBody()+"</p></div>");
			}
			
			return htmlRet;
		})
		.then( function(renderArray){
			return renderArray;
		});
	}
	
	
	return {
		getPosts: getPosts
	};
});