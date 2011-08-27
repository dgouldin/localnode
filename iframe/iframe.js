window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

$(document).ready(function() {
  function parseHeaders(responseHeadersString) {
    // taken from jQuery
    var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        responseHeaders = {};
    while((match = rheaders.exec(responseHeadersString))) {
      responseHeaders[match[1].toLowerCase()] = match[2];
    }
    return responseHeaders;
  }

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
      console.log(this, e);
      var builder = new BlobBuilder(),
          reader = new FileReader(),
          status = this.status,
          headers = parseHeaders(this.getAllResponseHeaders()),
          contentType = headers['content-type'] || 'text/plain',
          isText = contentType.indexOf('text') === 0,
          blob, content, response;

      function sendResponse(result) {
        var response = {
          token: request.token,
          status: status,
          headers: headers,
          content: result.content,
          dataUri: result.dataUri
        };

        sourceWindow.postMessage(JSON.stringify({
          response: response
        }), TARGET_ORIGIN);
      }

      if (isText) {
        sendResponse({content: this.responseText});
      } else {
        reader.onload = function(e) {
          sendResponse({dataUri: e.target.result});
        }
        builder.append(this.response);
        blob = builder.getBlob(contentType);
        reader.readAsDataURL(blob);
      }
    }
    client.send(request.body);
  }, false);
});

