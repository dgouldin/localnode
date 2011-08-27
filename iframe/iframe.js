$(document).ready(function() {
  window.addEventListener("message", function(e) {
    console.log('iframe message received', e);
    if (e.origin !== TARGET_ORIGIN) {
      return; // unauthorized
    }

    var sourceWindow = e.source,
        data = JSON.parse(e.data),
        request = data.request,
        client = new XMLHttpRequest();

    console.log('request received', request);
    client.open(request.method, request.url);
    $.each(request.headers, function(k, v) {
      client.setRequestHeader(k, v);
    });
    client.onload = function(e) {
      console.log(this);
      var response = {
        token: request.token,
        statusCode: this.status,
        headers: {}, // TODO: figure out where headers are
        content: this.response
      };
      sourceWindow.postMessage(JSON.stringify({
        response: response
      }), TARGET_ORIGIN);
    }
    client.send(request.body);
  }, false);
});

