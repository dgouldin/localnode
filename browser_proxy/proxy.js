$(document).ready(function() {
  var socket = io.connect('http://localhost:80'), // TODO: real server address here
      pendingRequests = {}, //TODO: send chunks via postMessage as we receive them
      iframe = $('iframe').get(0);

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
      pendingRequests[data.token].request.body += data.chunk;
    }
  });
  socket.on('end', function (data) {
    console.log('end message received');
    if (pendingRequests[data.token]) {
      iframe.contentWindow.postMessage(
        JSON.stringify(pendingRequests[data.token]), TARGET_ORIGIN);
    }
  });

  window.addEventListener("message", function(e) {
    console.log('proxy message received', e);
    if (e.origin !== TARGET_ORIGIN) {
      return; // unauthorized
    }

    var data = JSON.parse(e.data),
        response = data.response;
    response.token = data.token;
    socket.emit('response', response);

  });
});
