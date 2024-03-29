function arrayBufferBase64(raw, mimetype) {
  var base64 = '';
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var bytes = new Uint8Array(raw);
  var byteLength = bytes.byteLength;
  var byteRemainder = byteLength % 3;
  var mainLength = byteLength - byteRemainder;
  var a, b, c, d;
  var chunk;

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
    d = chunk & 63; // 63 = 2^6 - 1
    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }
  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength];
    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2;
    // Set the 4 least significant bits to zero
    b = (chunk & 3) << 4 // 3 = 2^2 - 1;
    base64 += encodings[a] + encodings[b] + '==';
  }
  else if (byteRemainder == 2) {
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) ;
    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048) >> 12; // 258048 = (2^6 - 1) << 12
    c = (chunk & 4032) >> 6; // 4032 = (2^6 - 1) << 6
    base64 += encodings[a] + encodings[b] + encodings[c] + '=';
  }
  return base64;
}

function parseHeaders(responseHeadersString) {
  // taken from jQuery
  var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
      responseHeaders = {};
  while((match = rheaders.exec(responseHeadersString))) {
    responseHeaders[match[1].toLowerCase()] = match[2];
  }
  return responseHeaders;
}

window.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

$(function() {
  var host = 'http://localno.de';
  top.postMessage('', host);
  
  window.addEventListener("message", function(e) {
    console.log('iframe message received', e);
    if (e.origin !== host) {
      return; // unauthorized
    }

    var sourceWindow = e.source,
        data = JSON.parse(e.data),
        token = data.token,
        request = data.request;
    
    doXHR();
    
    function doXHR() {
      var xhr = new XMLHttpRequest();

      console.log('request received', request);
      xhr.open(request.method, request.url);
      xhr.responseType = 'arraybuffer';
      request.headers['cache-control'] = 'no-cache';
      $.each(request.headers, function(k, v) {
        xhr.setRequestHeader(k, v);
      });
      xhr.onload = function(e) {
        var status = this.status,
            headers = parseHeaders(this.getAllResponseHeaders()),
            contentType = headers['content-type'] || 'text/plain',
            content, response;

        console.log(this.response);
        var response = {
          status: status,
          headers: headers,
          content: arrayBufferBase64(this.response, contentType),
        };
        console.log('response.content', response.content);

        sourceWindow.postMessage(JSON.stringify({
          token: token,
          response: response
        }), host);
      };
      xhr.send(request.body); 
    }

    function doSocket(msg, options, cb) {
      var res = '',
        s = new FlashSocket({
          on_data: function(data) {
              console.log(data.length);
              console.log(data);
              res += atob(data);
          },
          on_io_error: function(msg) {
              console.log("IO ERROR: "+msg);
          },
          on_security_error: function(msg) {
              console.log("SECURITY ERROR: "+msg);
          },
          on_close: function(msg) {
              console.log(msg);
              console.log("Connection closed.");
              sourceWindow.postMessage(JSON.stringify({
                token: token,
                response: res
              }), host);
          },
          on_connect: function() {
              console.log('s1 connect');
              s.write(msg);
          }
      });
      s.connect(request.url, request.port);
      console.log(s);
    }
  }, false);
  
//  request('GET /MellonHelmet.jpg\n\n', function(data) {
//    console.log(data);
//  });
});

