//See https://github.com/posabsolute/jQuery-Validation-Engine (for validation)
var ajaxSubdomain = {
    "url": "ajaxValidateSubdomain",
    "extraDataDynamic": ['#subdomain-input'],
    "alertText": "* This Subdomain is already taken",
    "alertTextOk": "All good!",
    "alertTextLoad": "* Validating, please wait"
};

$("#signup-form, #subdomain-form").validationEngine();
var $body = $('body');

//Make the background stay nice ;-) 
function AdjustBG(){
    if ($body.width() > 1600) {
        $body.css('background-size','100%');
    } else {
        $body.css('background-size','');
    }
}
AdjustBG();
$(window).resize(AdjustBG);

//$("input, textarea").placeholder();

$("#server-address").text($("#localhost-input").val());
setProxyURL();

$("#localhost-input").keyup(function(e){
   $("#server-address").text($(this).val());
   setProxyURL();
});

function setProxyURL() {
   var d = "http://proxy.localno.de/"+$("#subdomain-input").val()+ ($("#localhost-input").val() == "http://127.0.0.1" ? '' : "?url="+encodeURIComponent($("#localhost-input").val()));
   $("#proxy-address").text(d); 
   $("#proxy-start").attr("href",d);
}

$("#subdomain-input").keyup(function(e){
   setProxyURL();
});


//$("#example-config").fancybox();
$("#example-config").click(function(e) {
  $(this).attr('href', 'http://localno.de/localnode.html?'+encodeURIComponent($('#host-input').val()));
});
$("#test-config").click(function(e){
    $.fancybox.showActivity();
    $.ajax({
      url: ($("#localhost-input").val()+"/localnode.html"),
      cache: false,
      timeout: 5000,
      success: function(html){
        //$.fancybox.hideActivity();
        $.fancybox({content:"<div style='padding: 20px; background-color:green; color: white;'>Dude, It works!</div>"});
      },
      error: function(jqXHR, textStatus, errorThrown){
         //$.fancybox.hideActivity();
         $.fancybox({content:"<div style='padding: 20px; background-color:red; color: white;'>Something is not quite right :-/</div>"});
      }
    });
    return false;
});
		
$("#howitworks-id").fancybox();



$(function() {
  window.request = function(msg, options, cb) {
    var host = options.host || '127.0.0.1';
    var s = new FlashSocket({
        on_data: function(data) {
            console.log(data.length);
            console.log(data);
            document.getElementById('datapanel').value += atob(data);
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
        },
        on_connect: function() {
            console.log('s1 connect');
            s.write(msg);
        }
    });
    s.connect('localdevno.de', 80);
    console.log(s);
  };
//  request('GET /MellonHelmet.jpg\n\n', function(data) {
//    console.log(data);
//  });
  
  
  var host = '127.0.0.1';
  var subdomain = 'crabdude';

  $('#proxyframe').attr('src', host);

  var socket = io.connect('http://localno.de'),
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
        JSON.stringify(pendingRequests[data.token]), host);
    }
  });

  window.addEventListener("message", function(e) {
    console.log('proxy message received', e);
    if (e.origin !== host) {
      return; // unauthorized
    }

    var data = JSON.parse(e.data),
        response = data.response;
    response.token = data.token;
    socket.emit('response', response);

  });

  console.log("You're all set!");
  return false;
});
