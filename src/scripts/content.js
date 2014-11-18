$(document).ready(function(){
	$('.ui.accordion').accordion();
	$('.ui.sidebar').sidebar('show');

	init();
	
});

function init() {
	var dir_callback = function(data) {
		data.data.forEach(function(file){
			console.log(file);
			getdata(file.path, file_callback)
		});
	};

	var file_callback = function(data) {
		var d = data.data.content.replace('\n','');
		var raw_blob = Base64.decode(d);
		raw_blob = raw_blob.split(/\}\)/);

		// TODO account for uses of }) later in the document.. for whatever reason :P
		var blob_meta = eval(raw_blob[0] + "})");
		var blob_data = markdown.toHTML(raw_blob[1]);
		console.log(raw_blob);
		console.log(blob_meta);
		console.log(blob_data);
	}
	getdata("src/content/archive/2014/11",dir_callback);
}

function getdata(url, callback) {
	$.ajax({	
		dataType: "jsonp",
		url:"https://api.github.com/repos/paulbrzeski/paulbrzeski.github.io/contents/" + url,
		success: function(data){
			callback(data);
		}
	});
}