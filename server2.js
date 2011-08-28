var socket,
  _ = require('underscore'),
  express = require('express'),
  creationix = require('creationix'),
  http = require('http'),
  fs = require('fs'),
  net = require('net'),
  url = require('url'),
  server = express.createServer(
    function(req, res, next) {
      console.log(req.url);
      return next();
    },
    express.static(__dirname + '/public'),
//    creationix.static("/", __dirname + '/public', "index.html"),
    proxyHandler
  );

_.mixin(require('underscore.string'));

server.listen(80);
function proxyHandler(req, res) {
  console.log('HERE! HERE! HERE! HERE! HERE! HERE! ',req.url);
  res.end();
}

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
