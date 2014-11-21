/*
	Usage:
	node makeFilesFile.js %target path%
*/


/*
	Startup
*/
var dir = require('node-dir');
var args = process.argv.splice(2);

/*
	Main logic
*/

var path = args[0];

dir.readFiles(path,
	{
    exclude: /\.ai/,
		excludeDir: /\.git/
	},
    function(err, content, filename, next) {
        if (err) throw err;
        //console.log('filename:', filename);

        console.log(filename);
        
			  if (err) throw err;
			
			
		
        next();
    },
    function(err, files){
        if (err) throw err;
        
        connection.end();
    }
);