$(document).ready(function(){
	var callback = function(data) {
		// Bizarre odd way of getting around cross domain scripting?
	};
	$.ajax(
		{	
			dataType: "jsonp",
			url:"https://api.github.com/repos/paulbrzeski/Langenium/contents/",
			success: function(data){
				console.log(data)
			}
			
		});	
});
