$(function() {
  var $proxyframe;
  
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
    $proxyframe = $('#proxyframe');
    
    var int = setInterval(function() {
      $proxyframe.attr('src', 'http://'+$('#host-input').val()+'/localnode.html');
    }, 1000);
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

  var int, keyupHandle;
  
  int = setInterval(function() {
    $proxyframe.attr('src', 'http://'+$('#host-input').val()+'/localnode.html');
  }, 1000);
  
  function onIframeLoad() {
    console.log('SUCCESS!');
    clearInterval(int);

    function checkSubdomain() {
      socket.emit('available', {
        subdomain: $('#subdomain-input').val()
      }, function(isAvailable) {
        if (isAvailable) {
          $('#subdomain-status').removeClass('unavailable').addClass('available');
          $('#subdomain-submit').removeAttr('disabled');
        } else {
          $('#subdomain-status').removeClass('available').addClass('unavailable');
          $('#subdomain-submit').attr('disabled', 'disabled');
        }
      });
    }
    $('#subdomain-input').bind('keyup', function() {
      clearTimeout(keyupHandle);
      keyupHandle = setTimeout(checkSubdomain, 200);
    });

    $('#subdomain-submit').click(function() {
      socket.emit('setup', {
        subdomain: $('#subdomain-input').val()
      });
    });
  }
  
  var subdomain,
    socket = io.connect('http://localno.de'),
    pendingRequests = {}; //TODO: send chunks via postMessage as we receive them

  socket.on('headers', function(data) {
    console.log('headers message received');
    if (data.method) {
      pendingRequests[data.token] = {
        token: data.token,
        request: {
          url: data.url,
          method: data.method,
          headers: data.headers,
          body: ''
        }
      };
    } else {
      pendingRequests[data.token] = {
        token: data.token,
        request: data.request,
        url: data.url,
        port: data.port
      };
    }
    
  });
  
  socket.on('data', function(data) {
    console.log('data message received');
    if (pendingRequests[data.token]) {
      if (pendingRequests[data.token].method) {
        pendingRequests[data.token].request.body += data.chunk;
      } else {
        pendingRequests[data.token].request += data.chunk;
      }
    }
  });
  socket.on('end', function (data) {
    console.log('end message received');
    if (pendingRequests[data.token]) {
      iframe.contentWindow.postMessage(
          JSON.stringify(pendingRequests[data.token]), host);
    }
  });

  window.addEventListener("message", function firstMessage() {
    alert("Connected!");
    
    onIframeLoad();
    window.removeEventListener('message', firstMessage);
    window.addEventListener("message", onProxyMessage);
  });
  
  function onProxyMessage(e) {
    console.log('proxy message received', e);
    
    if (e.origin !== host) {
      return; // unauthorized
    }

    var data = JSON.parse(e.data),
        response = data.response;
    response.token = data.token;
    socket.emit('response', response);

  }

  console.log("You're all set!");
  return false;
});
