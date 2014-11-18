$(document).ready(function(){
	$('.ui.accordion').accordion();
	$('.ui.sidebar').sidebar('show');
	$.ajax(
		{	
			dataType: "jsonp",
			url:"https://api.github.com/repos/paulbrzeski/Langenium/contents/",
			success: function(data){
				console.log(data)
			}
			
		});	
});
