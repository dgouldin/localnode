var socket,
  _ = require('underscore'),
  nko = require('nko'),
  express = require('express'),
  http = require('http'),
  fs = require('fs'),
  url = require('url'),
  pendingResponses = {};
  server = express.createServer(
//    express.logger(),
    proxyHandler,
    express.bodyParser(),
    express.cookieParser(),
    express.session({ key: 'skey', secret: '1ts-s3cr3t!'}),
    express.static(__dirname + '/public')
  ),
  io = require('socket.io').listen(server);

_.mixin(require('underscore.string'));
  
process.env['NODE_ENV'] = 'production';
//record deploy
nko('II/wSAPh+H5/zPP2', function(err, res) {
  if (err) throw err;
  res.on('data', function(d) { console.log(d.toString()); });
});

server.get('/localnode.html', function(req, res) {
  fs.readFile(__dirname + '/public/localnode.tpl', function(err, data) {
    var content = (''+data).replace('TARGET_HOST', req.query.host);
    console.log(content);
    res.writeHead(200, {
      'Content-Length': data.length,
      'Content-Type': 'application/octet-stream'
    });
    res.end(content);
  });
});
server.listen(80);

server.all('*', function(req, res) {
  res.writeHead(200);
  res.end('I AM LOCALNODE!');
});

// need to associate a socket with a subdomain
io.sockets.on('connection', function (sock) {
  socket = sock;
  socket.on('response', function(data) {
    var contentType = data.headers['content-type'],
        buffer = new Buffer(data.content, 'base64'),
        res;

    // set text mimetypes to utf-8 charset
    if(contentType.indexOf('text') === 0 && contentType.indexOf('charset') === -1) {
      contentType += '; charset=utf-8';
      data.headers['content-type'] = contentType;
    }

    data.headers['content-length'] = buffer.length;
    console.log('socket.io response received');

    res = pendingResponses[data.token];
    res.writeHead(data.status, data.headers);
    res.end(buffer);

    delete pendingResponses[data.token];
  });
});


function proxyHandler(req, res, next) {
  var host = req.headers.host,
    token = Math.random();

  pendingResponses[token] = res;
  // TODO: delete response on timeout
  if (host.split('.').length <= 2) return next();

  console.log('headers');
  socket.emit('headers', {
    token: token,
    url: req.url,
    method: req.method,
    headers: req.headers
  });
  
  req.on('data', function(chunk) {
    console.log(chunk);
    socket.emit('data', {
      token: token,
      chunk: '' + chunk
    });
  });
  
  req.on('end', function() {
    console.log('end');
    socket.emit('end', {
      token: token
    });
  });
  
}


/*

net.createServer(function(socket) {
  socket.write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
  socket.write("<!DOCTYPE cross-domain-policy SYSTEM \"http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd\">\n");
  socket.write("<cross-domain-policy>\n");
  socket.write("<site-control permitted-cross-domain-policies=\"all\"/>\n");
  socket.write('<allow-access-from domain="*" to-ports="*" secure="false" />\n');
  socket.write("</cross-domain-policy>\n");
  socket.end();
  console.log("Wrote policy file.");
}).listen(843);

*/