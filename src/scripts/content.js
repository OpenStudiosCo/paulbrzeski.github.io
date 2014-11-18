$(document).ready(function(){
	$('.ui.accordion').accordion();
	$('.ui.sidebar').sidebar('show');

	init();
	
});

function init() {
	$.ajax({	
		dataType: "jsonp",
		url:"https://api.github.com/repos/paulbrzeski/paulbrzeski.github.io/contents/src/content/archive/2014/11/1-1.blob",
		success: function(data){
			var d = data.data.content.replace('\n','');
			var raw_blob = Base64.decode(d);
			raw_blob = raw_blob.split(/^[^\}\)]+-[^\}\)]+$/);

			console.log(raw_blob)
			var blob_meta = eval(raw_blob[0]);
			var blob_data = markdown(raw_blob[1])
			
		}
	});	
}