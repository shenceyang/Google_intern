const http = require('http');
const fs = require('fs');
var url = require("url");
const path = './music.mp3';

http.createServer(function(request, response) {
   
    var pathname = url.parse(request.url).pathname;  

    if (pathname === '/play') {
        response.writeHead(200, {'Content-Type': 'audio/mpeg'});   
        
        var rs = fs.createReadStream(path);

        rs.on('data', function(data) {
            response.write(data);
        });

        rs.on('end', function() {
            response.end();
        });

        rs.on('error', function(err) {
            console.log(err);
            response.end();
        });
    }
    else{
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("go to /play to play the music");
        response.end();
    }

}).listen(8081,()=>{
    console.log('Server running at http://localhost:8081/');
}); 
