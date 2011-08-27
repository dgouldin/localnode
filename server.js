var socket,
  http = require('http'),
  fs = require('fs'),
  server = http.createServer(handler),
  io = require('socket.io').listen(server);
  
server.listen(80);

//function handler (req, res) {
//  console.log('headers');
//  socket.emit('headers', {
//    url: req.url,
//    method: req.method,
//    headers: req.headers,
//  });
//  
//  socket.on('data', function(chunk) {
//    console.log(chunk);
//    socket.emit('data', chunk);
//  });
//  
//  socket.on('end', function() {
//    console.log('end');
//    socket.emit('end', chunk);
//  });
//  
//  socket.on('response', function(data) {
//    res.writeHead(data.statusCode, data.headers);
//    res.end(data.content);
//  });
//}

function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });  
}


// need to associate a socket with a subdomain
io.sockets.on('connection', function (sock) {
  debugger;
  socket = sock;
});
