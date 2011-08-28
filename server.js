var subdomToSocket = {},
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
    function(req, res, next) {
      if (req.url !== "/localnode.html") {
        return next();
      }
      res.setHeader("Content-Disposition", "attachment; filename=localnode.html");
      return next();
    },
    express.static(__dirname + '/public')
  ),
  io = require('socket.io').listen(server),

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

var subdomRE = /([^.]+)\..+\..+/;
function getSubDom(host) {
  var m = subdomRE.exec(host);
  if (m) {
    return m[1];
  }
}

// todo: have setup send a token which we can then use
// to test if an existing tab's socket is still live
// for a given subdomain.
//  this would let us prompt for them to reload the tab
//  if node crashes/restarts.
io.sockets.on('connection', function (socket) {
  socket.on('available', function(data, ret) {
      ret(subdomToSocket[data.subdomain] === undefined);
  });

  socket.on('setup', function(data, ret) {
    socket.subdomain = data.subdomain;
    if (undefined !== subdomToSocket[socket.subdomain]) {
      ret(false);
      return;
    }
    subdomToSocket[socket.subdomain] = socket;
    ret(true);
  });

  socket.on('disconnect', function () {
    delete subdomToSocket[socket.subdomain];
  });

  socket.on('response', function(data) {
    var contentType = data.headers['content-type'] || 'application/octet-stream',
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
  debugger;
  var host = req.headers.host,
    token = Math.random(),
    socket,
    subdom = getSubDom(host);

  socket = subdomToSocket[subdom];
  if (subdom && !socket) {
    data = "<body>Please <a href='http://localno.de/'>configure the subdomain</a> first.</body>";
    res.writeHead(200, {
      'Content-Length': data.length,
      'Content-Type': 'text/html',
    });
    res.end(data);
    return;
  }
  if (socket === undefined) return next();

  pendingResponses[token] = res;
  // TODO: delete response on timeout

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