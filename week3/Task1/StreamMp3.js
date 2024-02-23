const http = require('http');
const fs = require('fs');
const path = './music.mp3';

http.createServer(function(request, response) {
   
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

}).listen(8081,()=>{
    console.log('Server running at http://localhost:8081/');
}); 
