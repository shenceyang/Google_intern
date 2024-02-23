var http = require("http");
var url = require("url");
 
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;  // deprecated

    /* -> new way:
    const fullUrl = new URL(request.url, `http://${request.headers.host}`);
    const pathname = fullUrl.pathname;
    */

    console.log("Request for " + pathname + " received.");
 
    route(pathname);
 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started at http:localhost:8888");
}
 
exports.start = start;