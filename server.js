var socket,
  nko = require('nko'),
  express = require('express'),
  creationix = require('creationix'),
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  server = express.createServer(
//    express.logger(),
    proxyHandler,
    express.bodyParser(),
    express.cookieParser(),
    express.session({ key: 'skey', secret: '1ts-s3cr3t!'}),
    creationix.static("/", __dirname + '/public', "index.html")
  ),
  io = require('socket.io').listen(server);

//record deploy
export NODE_ENV=production
nko('II/wSAPh+H5/zPP2');

server.listen(80);

server.all('*', function(req, res) {
  res.writeHead(200);
  res.end('I AM LOCALNODE!');
});

// need to associate a socket with a subdomain
io.sockets.on('connection', function (sock) {
  debugger;
  socket = sock;
});


function proxyHandler(req, res, next) {
  var host = req.headers.host;
  if (host.split('.').length <= 2) return next();

  console.log('headers');
  socket.emit('headers', {
    url: req.url,
    method: req.method,
    headers: req.headers,
  });
  
  socket.on('data', function(chunk) {
    console.log(chunk);
    socket.emit('data', chunk);
  });
  
  socket.on('end', function() {
    console.log('end');
    socket.emit('end', chunk);
  });
  
  socket.on('response', function(data) {
    res.writeHead(data.statusCode, data.headers);
    res.end(data.content);
  });
}


/*

INITIAL
1. tie socket to url
2. connect to browser proxy => FULL CIRCUIT!

WebSockets
3. Communicate connection & upgrade
4. pipe 1 to the other

PAGES
SIGNUP
5. Create Username & Password
6. Create configurable Iframe
 - Dynamically create iframe on the fly
 - 

*/
