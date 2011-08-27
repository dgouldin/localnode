$(document).ready(function() {
  var socket = io.connect('http://localhost:80'), // TODO: real server address here
      pendingRequests = {}; //TODO: send chunks via postMessage as we receive them
  socket.on('connection', function () {
    console.log('socket.io connected!');
  });
  socket.on('headers', function(data) {
    console.log('headers message received');
    pendingRequests[data.token] = {
      token: data.token,
      request: {
        url: data.url,
        method: data.method,
        headers: data.headers,
        body: ''
      }
    };
  });
  socket.on('data', function(data) {
    console.log('data message received');
    if (pendingRequests[data.token]) {
      pendingRequests[data.token].request.body += data.data.chunk;
    }
  });
  socket.on('end', function (data) {
    console.log('end message received');
    if (pendingRequests[data.token]) {
      iframe.contentWindow.postMessage(JSON.stringify(data), TARGET_ORIGIN);
    }
  });

  window.addEventListener("message", function(e) {
    console.log('proxy message received', e);
    if (e.origin !== TARGET_ORIGIN) {
      return; // unauthorized
    }
    socket.emit('response', JSON.parse(e.data));

  });
});
