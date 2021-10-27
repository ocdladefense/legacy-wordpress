// https://developer.wordpress.org/rest-api/
define(["libFetch"],function(xhrFetch){

	var fn = {
		getTitle: function(){
			return this["p"]["title"]["rendered"];
		},
		getBody: function(){
			return this["p"]["content"]["rendered"];
		},
		getTags: function() {
			return this["p"]["tags"];
		},
		hasTag: function(tag) {
			let tags = this.getTags();
			
			
			return tags.includes(tag);
		}
	};

	function Post(p){
		this.p = p;
	}
	
	Post.prototype = fn;
	
	
	function getTags(endpoint) {
	
		var xhr = xhrFetch.fetch(endpoint,"json");
		return xhr.then( function(jsonResp){
			return jsonResp;
		});
	}
	
	
	function getPosts(endpoint, tagId){
		var xhr = xhrFetch.fetch(endpoint,"json");
		return xhr.then( function(jsonResp){
			var jsonRet = [];
			console.log(jsonResp);
			for(var i =0; i<jsonResp.length; i++){
				jsonRet.push(new Post(jsonResp[i]));
			}
			return jsonRet;
		})
		.then( function(posts){
			var htmlRet = [];
			
			for(var i = 0; i<posts.length; i++){
				let thePost = posts[i];
				if(!thePost.hasTag(tagId)) continue;
				htmlRet.push("<div class='post'><h2>"+posts[i].getTitle()+"</h2><p class='post-title'>"+posts[i].getBody()+"</p></div>");
			}
			
			return htmlRet;
		})
		.then( function(renderArray){
			return renderArray;
		});
	}
	
	
	return {
		getPosts: getPosts,
		getTags: getTags
	};
});